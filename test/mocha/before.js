const consul = require('consul');
const configObject = require('../config.json');
const CONSUL_SERVER = process.env.CONSUL_SERVER;

const [host, port] = CONSUL_SERVER.split(':');
if (!host || !port) {
    throw new Error('invalid consul address ' + CONSUL_SERVER);
}
const _consul = consul({host, port, promisify: true});
const promises = [];
for (var key in configObject) {
    promises.push(_consul.kv.set(key, configObject[key] + ''));
}

before(function(done) {
    Promise.all(promises).then(function() {
        done();
    });
});