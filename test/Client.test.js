const http = require('http');
const fetch = require('node-fetch');
const server = require('../src/server');
const client = require('../src/client');

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

test('client test', async() => {
  //server side namespace
  const httpServer = await (async() => {
    const app = server('/events');
    app.on('api-call', (params) => { params.bar = 'foo'; });
    const httpServer = http.createServer(app);
    httpServer.listen(3000);
    return httpServer;
  })();

  //client side namespace
  const results = await (async() => {
    const emit = client('http://localhost:3000/events', { fetch });

    //http event call
    const results = await emit('api-call', { foo: 'bar'});

    httpServer.close();

    return results;
  })();

  expect(results instanceof Array).toBe(true);
  expect(results[0].foo).toBe('bar')
  expect(results[0].bar).toBe('foo')
});
