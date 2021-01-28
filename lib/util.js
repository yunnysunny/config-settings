const { spawnSync } = require('child_process');
/**
 * 
 * @param {Object} option
 * @param {String} option.consulAddr The consul address, in the format of `ip:port`.
 * @param {String} option.pathPrefix The prefix of consul key element.
 * @param {String} option.savePath The full path name of the generated config file.
 * @param {Array.<String>} option.keys The consul keys' name. 
 */
exports.getConfigFromConsulSync = function(option) {
    const consulAddr = option.consulAddr;
    const [host, port] = consulAddr.split(':');
    if (!host || !port) {
        throw new Error('invalid consul address ' + consulAddr);
    }
    return spawnSync('node', [ 'loader.js' ], {
        env: {
            ...process.env,
            host,
            port,
            savePath: option.savePath,
            pathPrefix: option.pathPrefix,
            keys: option.keys
        },
        cwd: __dirname,
    });
};