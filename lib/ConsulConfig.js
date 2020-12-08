const consul = require('consul');
const slogger = require('node-slogger');
const AbstractConfig = require('./AbstractConfig');
/**
 * @extends AbstractConfig
 */
class ConsulConfig extends AbstractConfig {
    /**
     * @constructor
     * @param {Object} option
     * @param {String} option.consulAddr The consul address, in the format of `ip:port`。
     * @param {String} option.pathPrefix The prefix of consul key element.
     */
    constructor(option) {
        option.usePromise = true;
        super(option);
        const consulAddr = option.consulAddr;
        const [host, port] = consulAddr.split(':');
        if (!host || !port) {
            throw new Error('invalid consul address ' + consulAddr);
        }
        this._consul = consul({host, port, promisify: true});
        this._pathPrefix = option.pathPrefix || '';
    }
    /**
     * @override
     * @private
     * @param {KeyItem} key 
     */
    _loadVar(key) {
        const promise = this._consul.kv.get(this._pathPrefix + key);
        this._addToPromiseList(promise);
        return promise.then(function(reply) {
            if (!reply || !reply.Value) {
                return undefined;
            }
            slogger.debug('load var ['+key+'],value:',reply.Value);
            return reply.Value;
        });
    }

}

module.exports = ConsulConfig;