const redis = require('redis');
const client = redis.createClient();


client.on('error', (err) => {
  console.log('Error' + err);
});

const mockHistory = [
  {'date':'2019-02-05T10:32:28.221Z','performance':31.487958271744,'newRating':395.51997803776004},
  {'date':'2019-02-06T10:33:03.209Z','performance':51.313510196903067,'newRating':261.1264474691781},
  {'date':'2019-02-07T10:34:34.611Z','performance':91.14002859091204,'newRating':194.2504896679958},
  {'date':'2019-02-09T10:35:26.831Z','performance':10.967508099386524,'newRating':154.3777193892213},
  {'date':'2019-02-12T19:09:03.940Z','performance':400,'newRating':975.1115609354896},
  {'date':'2019-02-15T19:12:08.187Z','performance':200,'newRating':1554.9218858242068},
  {'date':'2019-02-18T19:14:34.883Z','performance':1000,'newRating':1984.2348520145802},
  {'date':'2019-02-20T19:47:25.175Z','performance':300,'newRating':2313.2966491835396},
  {'date':'2019-02-21T19:49:59.293Z','performance':2000,'newRating':2572.2629501110605},
  {'date':'2019-02-22T19:53:48.815Z','performance':1000,'newRating':2780.330437273279},
  {'date':'2019-02-23T19:58:05.645Z','performance':3000,'newRating':2950.302534054605},
  {'date':'2019-02-24T01:42:18.962Z','performance':1000.2744768905403,'newRating':2634.9383956487804},
  {'date':'2019-02-26T01:42:28.844Z','performance':598.2744768905403,'newRating':2370.859140702226}
];

const mockHistoryLong = require('./data');


client.get('hubot:storage', (err, rep) => {
  const data = JSON.parse(rep);
  const _private = data._private;

  const mock = {
    name: 'mock',
    history: mockHistoryLong,
  };
  _private.mock = JSON.stringify(mock);

  data._private = _private;
  client.set('hubot:storage', JSON.stringify(data), (err, rep) => {
    if (err) throw new Error;
    console.log(rep);
  });

  client.quit();
});
