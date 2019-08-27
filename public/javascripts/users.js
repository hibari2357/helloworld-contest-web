const app = new Vue({
  el: '#userlist-wrapper',
  data: {
    users: [],
  },
  mounted() {
    axios
      .get('/api/users')
      .then((res) => {
        this.users = res.data;
    });
  },
});
