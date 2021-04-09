const fs = require('fs');
const path = require('path');
const slogger = require('node-slogger');
/**
 * @function CustomParseFunction
 * 
 * @param {Object} option
 * @param {String} option.key the key
 * @param {*} option.value the value you want to validated
 * @param {SchemaElement} option.schemaElement the element of schema.
 * @returns {ElementParsedResult} the validate result.
 */

/**
 * @function AfterParseFunction
 * 
 * @param {String} key
 * @param {*} newValue
 * @param {Boolean} isFromWatch
 */

/**
 * @function WatchFunction
 * 
 * @param {Error|String} error
 * @param {String} key
 * @param {*} newValue
 */

/**
 * @typedef SchemaElement
 * 
 * If the value of `required` or `type` is an Array, 
 * the second value of the array is the error message that describe the error reason, 
 * it can be a string or an object,
 * and the first value is normal value as used without array.
 * 
 * @property {Boolean|Array} [required=false] indicate whether the current field necessary
 * @property {Number|JSON|Date|String|Object} type declare the current field's type, 
 * it can be `Number` `JSON` `String` `Parser.TYPE_FILE` `Parser.TYPE_DIRECTORY` `Parser.TYPE_URL` or an Object with properties. see
 * @property {CustomParseFunction=} custom the custom validate function
 * @property {Object=} options the extended options used to check validate.
 * @property {AfterParseFunction=} afterParse the function to do after parse.
 * @property {WatchFunction=} watch the function used in consul watch callback
 */

/**
 * @typedef Schema
 * @example 
 * ```javascript
 * {
 *   numberFiled : {
 *     required:true,
 *     type : Number,
 *     options: {
 *      gte: 10,
 *      lte: 1
 *     },
 *     afterParse: function(value) {}
 *   }
 * }
 * ```
 * @example
 * ```javascript
 * {
 *  dateField:{
 *      required:[true,'the dateField can not be empty']
 *      type:[Date,'the dataField must be a Date']
 *  }
 * }
 * ```
 * @example
 * ```javascript
 * {
 *   objectField: {
 *      type: {
 *          field1: {type: [Number, 'field must be a Number']},
 *          field2: {type: String, required: true}
 *      }
 *  }
 * }
 * ```
 * @property {SchemaElement} filedName
 */

/**
 * @typedef ElementParsedResult
 * 
 * @property {String|Error} [error=null] when the value is invalid, the error is not empty.
 * @property {*} value when the value is valid, return the value , it may be transfromed to the type you want.
 * @property {Boolean} changed whether the value is changed, it may be true when the key changed from consul.
 */

/**
 * The class of Validator
 * 
 */
class Parser {
    /**
     * Creates an instance of Validator.
     * @param {Schema} schema 
     */
    constructor({schema}) {
        this._schema = schema;
    }
    _isEmptyValue(value) {
        return typeof(value) === 'undefined' || value === '' || value === null;
    }
    /**
     * @private
     * @param {Object} option
     * @param {SchemaElement} option.schemaElement
     * @param {String} option.key
     * @param {Object} option.params
     * @returns {ElementParsedResult}
     */
    _validateItem({schemaElement, key, value}) {

        if (this._isEmptyValue(value)) {
            const required = schemaElement.required;
            if ((Array.isArray(required) && required[0]))  {
                return {error: required[1]};
            } else if (required) {
                return {error: `${key} can't be empty`};
            } else {
                return {value};
            }
        }
        let needType = schemaElement.type;
        let errMsg = '';
        if (Array.isArray(needType)) {
            needType = needType[0];
            errMsg = needType[1];
        }
        if (needType && needType !== String) {
            switch(needType) {
            case Number: {
                value = Number(value);
                if (isNaN(value)) {
                    return {error: errMsg || `${key} must be a Number`};
                }
                const { lte, gte } = schemaElement.options || {};
                if (!isNaN(lte) && value < lte) {
                    return {error: errMsg || `${key} must be gte than ${lte}`};
                }
                if (!isNaN(gte) && value > gte) {
                    return {error: errMsg || `${key} must be lte than ${gte}`};
                }
                break;
            }

            case Date:
                value = new Date(value);
                if (isNaN(value.getTime())) {
                    return {error: errMsg || `${key} must be a Date`};
                }
                break;

            case JSON:
                try {
                    value = JSON.parse(value);
                } catch (e) {
                    return {error: errMsg || `${key} must be a JSON string`};
                }
                break;
            case Parser.TYPE_FILE: {
                const {onlyCheckDirectory} = schemaElement.options || {};

                if (!onlyCheckDirectory) {
                    if (!fs.existsSync(value)) {
                        return {
                            error: errMsg || 'the value of ' + key + ' is a necessary file ,but not exists in ' + value
                        };
                    }
                } else {
                    var dirname = path.dirname(value);
                    try {
                        if (!fs.lstatSync(dirname).isDirectory()) {
                            return {error: errMsg || 'the path ' + dirname + ' must exist and be a directory'};
                        }
                    } catch (e) {
                        return {error: e};
                    }
                    
                }
                break;
            }
                
            case Parser.TYPE_DIRECTORY: {
                const {endWithSeparator} = schemaElement.options || {};
                try {
                    if (!fs.lstatSync(value).isDirectory()) {
                        return {error: errMsg || ('the path '+ value + ' must be a directory')};
                    }
                } catch (e) {
                    return {error: e};
                }
                
                if (endWithSeparator && !value.endWith(path.sep)) {
                    return {error: errMsg || ('the path '+ value + ' must be end with a separator')};
                }

                break;
            }
                
            case Parser.TYPE_URL: {
                const {endWithSeparator} = schemaElement.options || {};
                if (!value.startsWith('http://') && !value.startsWith('https://')) {
                    return {error: errMsg || ('invalid url:' + value)};
                }
                if (endWithSeparator && !value.endsWith('/')) {
                    return {error: errMsg || ('the url['+value+'] must be end with /')};
                }
                if (!endWithSeparator && value.endsWith('/')) {
                    return {error: errMsg || ('the url['+value+'] must not be end with /')};
                }
                break;
            }
            default:
                if (typeof (needType) === 'object') {
                    if (typeof (value) === 'string') {
                        try {
                            value = JSON.parse(value);
                        } catch (e) {
                            return {error: errMsg || e};
                        }
                    }
                    for (const field in needType) {
                        const subSchemaElement = needType[field];
                        const option = {
                            schemaElement: subSchemaElement, 
                            key: field, 
                            value: value[field]
                        };
                        const validFun = (subSchemaElement.custom || this._validateItem).bind(this);
                        const {error, value: fieldValue} = validFun(option);
                        if (error) {
                            return {error};
                        }
                        value[field] = fieldValue;
                    }
                }
                break;
            }
        }
        return {value};
    }
    /**
     * Parse one config.
     * @param {Object} option
     * @param {String} option.key 
     * @param {*} option.value 
     * @param {Boolean} [option.isFromWatch=false]
     * @param {*} [option.oldValue] pass to when isFromWatch is true
     * @returns {ElementParsedResult}
     */
    doParseElement({key, value, isFromWatch=false, oldValue}) {
        let returnValue;
        let changed = true;
        const schemaElement = this._schema[key];
        const customValidator = schemaElement.custom;
        if (customValidator) {
            const {error, value: newValue} = customValidator.bind(this)({schemaElement, key, value});
            if (error) {
                return {error};
            }
            returnValue = newValue;
        } else {
            const {error, value: newValue} = this._validateItem({schemaElement, key, value});
            if (error) {
                return {error};
            }
            returnValue = newValue;
        }
        if (isFromWatch && JSON.stringify(oldValue) === JSON.stringify(returnValue)) {
            slogger.info(`the key of ${key} has none change.`);
            changed = false;
        }
        if (typeof (schemaElement.afterParse) === 'function') {
            if (!isFromWatch || changed) {
                schemaElement.afterParse(key, returnValue, isFromWatch);
            }
        }
        return {value: returnValue, changed};
    }
    /**
     * Parse all the config.
     * 
     * @param {Object} params 
     * @returns {{error:String, params: Object}}
     */
    doParse(params) {
        const newParams = {};
        // const schemaKeys = this._schema.keys();
        for (const key in this._schema) {
            const value = params[key];
            const {error, value: newValue} = this.doParseElement({key, value});
            if (error) {
                return {error};
            }
            newParams[key] = newValue;
        }
        return {params: newParams};
    }
}
Parser.TYPE_FILE = 'File';
Parser.TYPE_DIRECTORY = 'Directory';
Parser.TYPE_URL = 'Url';
module.exports = Parser;
