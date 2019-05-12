const redis = require('redis');
const client = redis.createClient();

class User {
  constructor(name, rating){
    this.name = name;
    this.rating = rating;
  }
}

client.on('error', (err) => {
  console.log('Error' + err);
});

client.get('hubot:storage', (err, rep) => {
  let users = [];
  const userobj = JSON.parse(rep)._private;
  // console.log(userobj);
  const keys = Object.keys(userobj);
  console.log(keys);
  for (let i=0; i<keys.length; i++) {
    const name = keys[i];
    const user = userobj[name];
    const history = JSON.parse(user).history;
    const lastRating = Math.round(history[history.length-1].newRating);
    users.push(new User(name, lastRating));
  }

  console.log(users);

  client.quit();
});
