const app = new Vue({
  el: '#performance-wrapper',
  data: {
    username: 'mock',
    perfs: [],
    errorMessage: '',
  },
  methods: {
    getUserPerfs(cb) {
      axios
          .get(`http://localhost:3000/api/users/${this.username}`)
          .then((res) => {
            this.perfs = res.data;
            cb(this.perfs);
          });
    },
    showChart() {
      this.getUserPerfs((perfs) => {
        // perfs
        // [
        //   {'date': '2019-02-05T19:58:05.645Z', 'performance': 1000},
        //   {'date': '2019-02-06T01:42:28.844Z', 'performance': 400},
        //   {'date': '2019-02-10T19:58:05.645Z', 'performance': 4000},
        //   {'date': '2019-02-26T01:42:28.844Z', 'performance': 598},
        // ];
        if (!perfs) {
          this.errorMessage = 'User not found';
          return;
        }
        this.errorMessage = '';

        const points = [];
        for (let i=0; i<perfs.length; i++) {
          const point = {};
          point.x = perfs[i].date;
          point.y = perfs[i].performance;
          points.push(point);
        }

        const ctx = document.getElementById('perfs-chart').getContext('2d');
        const drawBackground = (target) => {
          const xscale = target.scales['x-axis-0'];
          const yscale = target.scales['y-axis-0'];


          const left = xscale.left;

          // red
          const redTop = yscale.getPixelForValue(4000);
          const redHeight = yscale.getPixelForValue(2800) - redTop;
          ctx.fillStyle = '#FFB2B7';
          ctx.fillRect(left, redTop, xscale.width, redHeight);

          // grey
          const greyTop = yscale.getPixelForValue(400);
          const greyHeight = yscale.getPixelForValue(0) - greyTop;
          ctx.fillStyle = '#D9D9D9';
          ctx.fillRect(left, greyTop, xscale.width, greyHeight);

          // other colors
          const bgColors = ['#FFD8BC', '#EDECBF', '#B2BCFD', '#B2ECEC', '#B2D9B9', '#DAC5B5'];
          let perfBycolor = 2800;
          bgColors.forEach((color) => {
            const top = yscale.getPixelForValue(perfBycolor);
            const height = yscale.getPixelForValue(perfBycolor - 400) - top;
            ctx.fillStyle = color;
            ctx.fillRect(left, top, xscale.width, height);
            perfBycolor -= 400;
          });
        };

        const perfByTime = {
          '4000': '05:00',
          '3600': '05:20',
          '3200': '05:40',
          '2800': '06:00',
          '2400': '06:30',
          '2000': '07:00',
          '1600': '07:50',
          '1200': '08:50',
          '800': '10:00',
          '400': '12:00',
          '0': 'night',
        };

        const config = {
          plugins: [{
            beforeDraw: drawBackground,
          }],
          type: 'line',
          data: {
            // labels: [5,10, 15,20,25,30,35,40],
            datasets: [{
              label: `${this.username} のパフォーマンス`,
              radius: 2,
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 2,
              fill: false,
              lineTension: 0,
              data: points,
            }],
          },
          options: {
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  unit: 'day',
                },
                ticks: {
                  callback: (value, index) => {
                    return ((index % 4) == 0)? value : '';
                  },
                },
              }],
              yAxes: [
                {
                  ticks: {
                    callback: (value) => {
                      return perfByTime[value];
                    },
                    stepSize: 400,
                    position: 'left',
                  },
                },
              ],
            },
          },

        };

        const chart = new Chart(ctx, config);
      });
    },
  },
});
