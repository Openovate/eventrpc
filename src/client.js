const jsonrpc = require('jsonrpc-lite');
const shortid = require('shortid');

function createEmitter(endpoint, config = {}) {
  let id = config.id || 1;
  const key = config.key || shortid.generate();

  const fetchMethod = config.fetch || window.fetch;

  const fetchConfig = {
    method: config.method || 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: config.mode || 'cors', // no-cors, cors, *same-origin
    cache: config.cache || 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: config.credentials || 'same-origin', // include, *same-origin, omit
    headers: config.headers || {
      'Content-Type': 'application/json'
    },
    redirect: config.redirect || 'follow', // manual, *follow, error
    referrer: config.referrer || 'no-referrer', // no-referrer, *client
  };

  async function emit(event, ...args) {
    //clone the config so we can add a body
    const config = Object.assign({}, fetchConfig);
    //make a new RPC ID
    const rpcid = key ? (key + '-' + (id++)): id++;
    //populate the body
    config.body = JSON.stringify(jsonrpc.request(rpcid, event, args));
    //call it out
    const response = await fetchMethod(endpoint, config);
    //and fetch the results
    const payload = await response.json();

    if (payload.error) {
      throw new Error(payload.error.message || 'Unknown Server Error');
    }

    return payload.result;
  }

  return emit;
}

if (typeof window !== 'undefined') {
  window.eventrpc = createEmitter;
}

module.exports = createEmitter;
