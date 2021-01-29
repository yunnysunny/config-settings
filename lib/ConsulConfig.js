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
     * @param {Number} [option.timeoutMs=5000] The timeout milliseconds for consul request. 
     */
    constructor(option) {
        option.usePromise = true;
        super(option);
        const consulAddr = option.consulAddr;
        slogger.trace('using the consul address', consulAddr);
        const [host, port] = consulAddr.split(':');
        if (!host || !port) {
            throw new Error('invalid consul address ' + consulAddr);
        }
        this._consul = consul({host, port, promisify: true});
        this._pathPrefix = option.pathPrefix || '';
        this._timeout = Number(option.timeoutMs) || 5000;
    }
    /**
     * @override
     * @private
     * @param {KeyItem} key 
     */
    _loadVar(key) {
        const promise = this._consul.kv.get({
            key: this._pathPrefix + key, timeout: this._timeout
        });
        this._addToPromiseList(promise);
        const map = this._map;
        return promise.then(function(reply) {
            if (!reply || !reply.Value) {
                return undefined;
            }
            const value = reply.Value;
            slogger.debug('load var ['+key+'],value:', value);

            map.set(key, value);
            return value;
        }).catch(function(e) {
            slogger.error('load var ['+key+'] failed', e);
            return undefined;
        });
    }

}

module.exports = ConsulConfig;