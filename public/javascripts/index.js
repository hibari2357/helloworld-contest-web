const app = new Vue({
  el: '#performance-graph-wrapper',
  data: {
    username: 'someone',
    perfs: [],
  },
  methods: {
    getUserPerfs: function() {
      console.log(this.username);
       axios
        .get(`http://localhost:3000/api/users/${this.username}`)
        .then((res) => {
          this.perfs = res.data;
        });
    },
  },
});
