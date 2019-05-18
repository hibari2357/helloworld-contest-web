const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
  console.log('Error' + err);
});

client.get('hubot:storage', (err, rep) => {
  const data = JSON.parse(rep);
  const _private = data._private;
  const keys = Object.keys(_private);

  for (let i=0; i<keys.length; i++) {
    const user = JSON.parse(_private[keys[i]]);
    const history = user.history;

    const newHistory = [];
    const dateMap = {};
    for (let j=0; j<history.length; j++) {
      const date = history[j].date.substr(0, 10);
      dateMap[date] = history[j];
    }

    const date = Object.keys(dateMap);
    for (let j=0; j<date.length; j++) {
      newHistory.push(dateMap[date[j]]);
    }

    user.history = newHistory;
    _private[keys[i]] = JSON.stringify(user);
  }

  data._private = _private;
  console.log(data);
  client.set('hubot:storage', JSON.stringify(data), (err, rep) => {
    if (err) throw new Error;
    console.log(rep);
  });

  client.quit();
});
