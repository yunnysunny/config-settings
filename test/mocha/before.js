const consul = require('consul');
const configObject = require('../config.json');
const CONSUL_SERVER = process.env.CONSUL_SERVER;
const CONSUL_PATH_PREFIX = exports.CONSUL_PATH_PREFIX = 'tmp/';

const [host, port] = CONSUL_SERVER.split(':');
if (!host || !port) {
    throw new Error('invalid consul address ' + CONSUL_SERVER);
}
const _consul = consul({host, port, promisify: true});
const promises = [];
for (var key in configObject) {
    let value = configObject[key];
    if (typeof (value) === 'object') {
        value = JSON.stringify(value);
    } else {
        value = value + '';
    }
    promises.push(_consul.kv.set(CONSUL_PATH_PREFIX + key,  value));
}

before(function(done) {
    Promise.all(promises).then(function() {
        done();
    });
});

exports.writeKV = function(key, value, callback = function() {}) {
    _consul.kv.set(CONSUL_PATH_PREFIX + key,  value).then(callback);
};