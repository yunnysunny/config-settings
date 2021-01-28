const consul = require('consul');
const fs = require('fs');
const {host, port, savePath, keys, pathPrefix=''} = process.env;
const _consul = consul({host, port, promisify: true});


const fileds = keys.split(',');

const reqs = fileds.map(function(field) {
    return _consul.kv.get(pathPrefix + field).then(function(result) {
        return result.Value;
    });
});

Promise.all(reqs).then(function(values) {
    const len = fileds.length;
    const result = {};
    for (var i = 0; i < len ; i++) {
        const key = fileds[i];
        const value = values[i];
        result[key] = value;
    }
    const outStr = JSON.stringify(result);
    if (savePath) {
        fs.writeFileSync(savePath, outStr);
    } else {
        // eslint-disable-next-line no-console
        console.log(outStr);
    }
    process.exit(0);
}).catch(function(e) {
    // eslint-disable-next-line no-console
    console.error('get config from consul error', e);
    process.exit(1);
});

