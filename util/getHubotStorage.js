const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
  console.log('Error' + err);
});

client.get('hubot:storage', (err, rep) => {
  console.log(JSON.parse(rep));
});

client.quit();
