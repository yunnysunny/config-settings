// const slogger = require('node-slogger');
const JsonConfig = require('./JsonConfig');
const {getConfigFromConsulSync} = require('./util');
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
     * @param {Number} [option.retryLimit=0] The retry times before getting data from consul failed. The default is `0`, which means no limit.
     */
    constructor(option) {
        option.timeout = Number(option.timeout4RequestConsulMs) || 5000;
        const {status, stdout, stderr} = getConfigFromConsulSync(option);
        if (status != 0) {
            throw new Error(stderr);
        }
        option.configObject = JSON.parse(stdout);
        super(option);
    }
}

module.exports = ConsulConfigSync;