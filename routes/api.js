const express = require('express');
const router = new express.Router();
const redis = require('redis');
const client = redis.createClient();

class User {
  constructor(name, rating) {
    this.name = name;
    this.rating = rating;
  }
}

client.on('error', (err) => {
  console.log('Error' + err);
});

const getUsers = (cb) => {
  client.get('hubot:storage', (err, rep) => {
    if (!rep) throw new Error(err);
    const users = [];
    const userobj = JSON.parse(rep)._private;
    const keys = Object.keys(userobj);
    for (let i=0; i<keys.length; i++) {
      const name = keys[i];
      const user = userobj[name];
      const history = JSON.parse(user).history;
      const lastRating = Math.round(history[history.length-1].newRating);
      const nameDisplayed = name.substr(0, 2) + '*'.repeat(name.length - 2);
      users.push(new User(nameDisplayed, lastRating));
    }
    console.log(users);
    cb(users);
  });
};

/* GET users listing. */
router.get('/users', (req, res, next) => {
  getUsers((users) => {
    res.json(users);
  });
});

module.exports = router;
