const consul = require('consul');
const JsonConfig = require('./JsonConfig');
const {getConfigFromConsulSync} = require('./util');
/**
 * @function WatchCallback
 * @param {Error} err
 * @param {String} data
 */
/**
 * @extends JsonConfig
 */
class ConsulConfigSync extends JsonConfig {
    /**
     * @constructor
     * @param {Object} option
     * @param {String} option.consulAddr The consul address, in the format of `ip:port`.
     * @param {String} option.pathPrefix The prefix of consul key element.
     * @param {Array.<String>} option.keys The consul keys' name. 
     * @param {Number} [option.timeout4RequestConsulMs=5000] The timeout milliseconds for consul request. 
     * @param {Number} [option.retryLimit=0] The retry times before getting data from consul failed. 
     * The default is `0`, which means no limit.
     * @param {Object.<String, WatchCallback>} [watchers] The map of wathcers, 
     * the key is consul key, the value is type of  WatchCallback
     */
    constructor(option) {
        if (!option.consulAddr) {
            throw new Error('consulAddr can not be empty!');
        }
        
        option.timeout = Number(option.timeout4RequestConsulMs) || 5000;
        const {status, stdout, stderr} = getConfigFromConsulSync(option);
        if (status != 0) {
            throw new Error(stderr);
        }
        option.configObject = JSON.parse(stdout);
        super(option);
        
        // if (option.watchers) {
        //     this._addWatches(option);
        // }
    }
    // _addWatches(option) {
    //     const consulAddrArray = option.consulAddr.split(':');
    //     const client = consul({host: consulAddrArray[0], port: consulAddrArray[1]});
    //     const watchers = option.watchers;
    //     for (const key in watchers) {
    //         const watch = client.watch({
    //             method: client.kv.get,
    //             options: {key},
    //         });
    //         watch.on('change', function(data) {
    //             watchers[key](null, data);
    //         });
    //         watch.on('error', function(err) {
    //             watchers[key](err);
    //         });
    //     }
    // }
}

module.exports = ConsulConfigSync;