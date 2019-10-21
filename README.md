# Event RPC

Emit server events via HTTP and JSON RPC

## Install

```bash
$ npm i --save @openovate/eventrpc
```

## Usage

To use Event RPC, you will need to configure both the server and client.

### Server

The following shows how to setup an HTTP server using Event RPC.


```js
const eventrpc = require('@openovate/eventrpc');

//setup eventrpc
const events = eventrpc('/events');
events.on('api-call', (params) => { params.bar = 'foo' });

//setup server
const server = http.createServer(events);
server.listen(3000);
```

You can also separate the event listener and use it as a middleware like the following.

```js
const eventrpc = require('@openovate/eventrpc');

//setup events
const emitter = eventrpc.EventEmitter();
emitter.on('api-call', (params) => { params.bar = 'foo' });

//setup eventrpc
const events = eventrpc('/events');
events.use(emitter);

//setup server
const server = http.createServer(events);
server.listen(3000);
```

It is possible to use Event RPC with Express like the following.

```js
const express = require('express');
const eventrpc = require('@openovate/eventrpc');

//setup eventrpc
const events = eventrpc('/events');
events.on('api-call', (params) => { params.bar = 'foo' });

//setup express
const app = express();
app.use(events);

//setup server
const server = http.createServer(app);
server.listen(3000);
```

### Client

The following shows how to quickly setup the client side.

```js
<script type="text/javascript" src="/eventrpc/eventrpc.js"></script>
<script type="text/javascript">
const emit = eventrpc('http://localhost:3000/events', { fetch });
//http event call
const results = await emit('api-call', { foo: 'bar'});
</script>
```

It is possible to `require` Event RPC using webpack like the following.

```js
const eventrpc = require('eventrpc');
```
