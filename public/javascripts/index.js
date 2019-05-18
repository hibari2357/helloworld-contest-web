const app = new Vue({
  el: '#performance-wrapper',
  data: {
    username: 'someone',
    perfs: [],
    errorMessage: '',
  },
  methods: {
    getUserPerfs: function(cb) {
      axios
          .get(`http://localhost:3000/api/users/${this.username}`)
          .then((res) => {
            this.perfs = res.data;
            cb(this.perfs);
          });
    },
    showChart: function() {
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
        const chart = new Chart(ctx, {
          type: 'line',
          data: {
            // labels: [5,10, 15,20,25,30,35,40],
            datasets: [{
              label: `${this.username} の起床パフォーマンス`,
              borderColor: 'rgb(255, 99, 132)',
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
              }],
            },
          },

        });
      });
    },
  },
});
