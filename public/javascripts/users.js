const app = new Vue({
  el: '#userlist-wrapper',
  data: {
    users: [],
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/users')
      .then((res) => {
        this.users = res.data;
    });
  },
});
