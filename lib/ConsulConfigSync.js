const slogger = require('node-slogger');
const AbstractConfig = require('./AbstractConfig');
const {getConfigFromConsulSync} = require('./util');
/**
 * @extends AbstractConfig
 */
class ConsulConfigSync extends AbstractConfig {
    /**
     * @constructor
     * @param {Object} option
     * @param {String} option.consulAddr The consul address, in the format of `ip:port`.
     * @param {String} option.pathPrefix The prefix of consul key element.
     * @param {Array.<String>} option.keys The consul keys' name. 
     */
    constructor(option) {
        super(option);
        const {status, stdout, stderr} = getConfigFromConsulSync(option);
        if (status != 0) {
            throw new Error(stderr);
        }
        this._configObject = JSON.parse(stdout);
    }
    /**
     * @override
     * @private
     * @param {KeyItem} key 
     */
    _loadVar(key) {
        var value;
        if (key.indexOf('.') == -1) {
            value = this._configObject[key];
        } else {
            var keyArray = key.split('.');
            var keyStr = keyArray[0];
            value = this._configObject[keyStr];
            for(var i= 1,len=keyArray.length;i<len;i++) {
                if (!value && i < len-1) {
                    this._exitProcess('the var ['+keyStr + '] is empty.');
                    return undefined;
                }
                var keyNow = keyArray[i];
                keyStr += '.'+keyNow;
                value = value[keyNow];
            }
        }
        slogger.debug('load var ['+key+'],value:',value);
        return value;
    }

}

module.exports = ConsulConfigSync;