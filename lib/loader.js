const consul = require('consul');
const fs = require('fs');
const {host, port, savePath, keys, pathPrefix='', timeout, retryLimit, consulOption} = process.env;
let consulOptionObj = {};
try {
    consulOptionObj = JSON.parse(consulOption);
} catch (e) {
    // eslint-disable-next-line no-console
    console.error('the object of consul option is invalid', e);
}
const _consul = consul({host, port, promisify: true, ...consulOptionObj});

const fileds = keys.split(',');
const retryLimitNumber = Number(retryLimit) || 0;
function toLoad(count) {
    const reqs = fileds.map(function(field) {
        return _consul.kv.get({
            key: pathPrefix + field, timeout: Number(timeout)
        }).then(function(result) {
            if (!result) {
                return undefined;
            }
            return result.Value;
        }).catch(function(e) {
            // eslint-disable-next-line no-console
            console.error(`load key ${field} error`, e);
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
        count++;
        if (retryLimitNumber > 0 && count >= retryLimitNumber) {
            return process.exit(1);
        }
        toLoad(count);
    });
}

toLoad(0);


