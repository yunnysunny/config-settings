const consul = require('consul');
const slogger = require('node-slogger');

const JsonConfig = require('./JsonConfig');
const {getConfigFromConsulSync} = require('./util');
/**
 * @typedef ConsulOption
 * 
 * @param {Boolean} [secure=false]  enable HTTPS
 * @param {String[]} [ca]  array of strings or Buffers of trusted certificates in PEM format
 * @param {Object} [defaults] common method call options that will be included with every call 
 * (ex: set default token)
 */
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
     * @param {Number} [option.timeout4RequestConsulMs=5000] The timeout milliseconds for consul request. 
     * @param {Number} [option.retryLimit=0] The retry times before getting data from consul failed. 
     * The default is `0`, which means no limit.
     * @param {ConsulOption} [option.consulOption={}] The consul option used to init a consul client.
     */
    constructor(option) {
        if (!option.consulAddr) {
            throw new Error('consulAddr can not be empty!');
        }
        option.keys = Object.keys(option.schema);
        option.timeout = Number(option.timeout4RequestConsulMs) || 5000;
        option.consulOption = option.consulOption || {};
        const {status, stdout, stderr} = getConfigFromConsulSync(option);
        if (status != 0) {
            throw new Error(stderr);
        }
        option.configObject = JSON.parse(stdout);
        super(option);
        // for ()

        this._addWatches(option);

    }
    _doWatchCallback({schemaElement, error, key, value}) {
        if (typeof (schemaElement.watch) === 'function') {
            schemaElement.watch(error, key, value);
        } else {
            if (error) {
                slogger.warn(`${key} watch failed`, error);
            } else {
                slogger.warn(`${key} has changed to ${value}, but have none watch callback function`);
            }
        }
    }
    _addWatches(option) {
        const consulAddrArray = option.consulAddr.split(':');
        const client = consul({
            host: consulAddrArray[0], port: consulAddrArray[1], ...option.consulOption
        });

        for (const key in option.schema) {
            const watch = client.watch({
                method: client.kv.get,
                options: {key: option.pathPrefix + key},
            });
            const _this = this;
            const schemaElement = option.schema[key];
            watch.on('change', function keyChangedOk(result) {
                result = result || {};
                const newValue = result.Value;
                const {error, value, changed} = _this._validator.doParseElement({
                    key, value: newValue, isFromWatch: true, oldValue: _this._params[key]
                });
                if (!changed) {
                    return;
                }
                if (!error) {
                    _this._params[key] = value;
                }
                _this._doWatchCallback({schemaElement, error, key, value});
            });
            watch.on('error', function keyChangedError(error) {
                _this._doWatchCallback({schemaElement, error, key});
            });
        }
    }
}

module.exports = ConsulConfigSync;