const AbstractConfig = require('./AbstractConfig');
/**
 * @extends AbstractConfig
 */
class JsonConfig extends AbstractConfig {
    /**
     * @constructor
     * @param {Object} option
     * @param {Object} option.configObject The Json object.
     */
    constructor(option) {
        super(option);
        this._configObject = option.configObject;
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
        // slogger.debug('load var ['+key+'],value:',value);
        return value;
    }

}

module.exports = JsonConfig;