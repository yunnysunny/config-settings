const slogger = require('node-slogger');
const Parser = require('./Parser');
const {deepCopy} = require('./util');
// const AbstractConfig = require('./AbstractConfig');
/**
 * 
 */
class JsonConfig {
    /**
     * @constructor
     * @param {Object} option
     * @param {Object} option.configObject The Json object.
     * @param {Schema} option.schema The schema object.
     * @param {Number} [option.waitTimeBeforeThrowErrorMs=0] The wait time before trigger error when the value returned is not expected. 
     * The default value is `0`, but it will throw the error in async way even if you set the parameter to `0`.
     *
     */
    constructor(option) {
        // super(option);
        this._configObject = deepCopy(option.configObject);
        this._validator = new Parser({schema: option.schema});
        this._waitTimeBeforeThrowErrorMs = option.waitTimeBeforeThrowErrorMs || 0;
        const {error, params} = this._validator.doParse(this._configObject);
        if (error) {
            this._exitProcess(error);
            return;
        }
        this._schema = option.schema;
        this._params = params;
    }
    _exitProcess(reason) {
        slogger.error(reason);

        setTimeout(function() {
            throw new Error(reason);
        }, this._waitTimeBeforeThrowErrorMs);
    }
    /**
     * Get the value via key name.
     * @param {String} key 
     * @returns {*}
     */
    getValue(key) {
        const value = this._params[key];
        return value;
    }
    /**
     * Get All the value.
     */
    get params() {
        return this._params;
    }
}

module.exports = JsonConfig;