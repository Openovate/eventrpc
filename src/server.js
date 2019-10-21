const fs = require('fs');
const { resolve } = require('path');
const jsonrpc = require('jsonrpc-lite');
const { EventEmitter } = require('@openovate/jsm');

const defaultNext = (e) => { if(e) throw e };

function createMiddleware(path = '/') {
  function Middleware(req, res, next) {
    next = next || defaultNext;
    if (req.url === '/eventrpc/eventrpc.js') {
      res.setHeader('Content-Type', 'text/javascript');
      fs.createReadStream(resolve(__dirname, '../dist/client.js')).pipe(res);
      return;
    }

    if (req.url !== path) {
      return next();
    }

    const chunks = [];
    req.on('data', function (data) {
      chunks.push(data)
    });

    req.on('end', async() => {
      //get payload
      let payload = JSON.parse(chunks.join(''));
      //if payload is not an object
      if (typeof payload !== 'object') {
        //we cannot process
        return next();
      }

      //if we dont know the rpc
      if (!payload.jsonrpc || !payload.method) {
        //let someone else handle it
        return next();
      }

      const method = payload.method;
      let args = payload.params || [];
      if (!Array.isArray(args)) {
        args = [args];
      }

      //placeholder for response
      let response = null;

      try {
        Middleware.emitter.emit(method, ...args);
        response = jsonrpc.success(payload.id, args)
      } catch(e) {
        response = jsonrpc.error(payload.id, e);
      }

      //send it off
      res.setHeader('Content-Type', 'text/json');
      res.write(JSON.stringify(response));
      res.end();

      return next();
    });
  }

  //local queue
  Middleware.emitter = new EventEmitter;
  Middleware.emit = Middleware.emitter.emit.bind(Middleware.emitter);
  Middleware.on = Middleware.emitter.on.bind(Middleware.emitter);
  Middleware.use = Middleware.emitter.use.bind(Middleware.emitter);

  return Middleware;
}

createMiddleware.EventEmitter = function() {
  return new EventEmitter;
};

module.exports = createMiddleware;
