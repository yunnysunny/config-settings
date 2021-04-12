const { spawnSync } = require('child_process');
/**
 * 
 * @param {Object} option
 * @param {String} option.consulAddr The consul address, in the format of `ip:port`.
 * @param {String} option.pathPrefix The prefix of consul key element.
 * @param {String} option.savePath The full path name of the generated config file.
 * @param {Array.<String>} option.keys The consul keys' name. 
 * @param {Number} [option.timeoutMs=5000] The timeout milliseconds for consul request. 
 * @param {Number} [option.retryLimit=0] The retry times before getting data from consul failed. The default is `0`, which means no limit.
 * @param {ConsulOption} [option.consulOption={}] The consul option used to init a consul client.
 */
exports.getConfigFromConsulSync = function (option) {
    const consulAddr = option.consulAddr;
    const [host, port] = consulAddr.split(':');
    if (!host || !port) {
        throw new Error('invalid consul address ' + consulAddr);
    }
    return spawnSync('node', ['loader.js'], {
        env: {
            ...process.env,
            host,
            port,
            savePath: option.savePath,
            pathPrefix: option.pathPrefix,
            keys: option.keys,
            timeout: option.timeout,
            consulOption: JSON.stringify(option.consulOption)
        },
        cwd: __dirname,
    });
};

function deepCopy(data) {
    if (typeof data !== 'object' || data === null) {
        throw new TypeError('The parameter you wanna copy is not an object');
    }
    let newData = {};
    const dataKeys = Object.keys(data);
    dataKeys.forEach(value => {
        const currentDataValue = data[value];
        // basic data and function ,copy directly
        if (typeof currentDataValue !== 'object' || currentDataValue === null) {
            newData[value] = currentDataValue;
        } else if (Array.isArray(currentDataValue)) {
            // copy array deeply
            newData[value] = [...currentDataValue];
        } else if (currentDataValue instanceof Set) {
            // copy set deeply
            newData[value] = new Set([...currentDataValue]);
        } else if (currentDataValue instanceof Map) {
            // copy map deeply
            newData[value] = new Map([...currentDataValue]);
        } else {
            // copy ordinary object directly
            newData[value] = deepCopy(currentDataValue);
        }
    });
    return newData;
}

exports.deepCopy = deepCopy;
