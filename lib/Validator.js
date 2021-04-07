const fs = require('fs');
const path = require('path');
/**
 * @function CustomValidateFunction
 * 
 * @param {*} value the value you want to validated
 * @param {ValidateElement} validateElement the element of validator
 * @returns {*} the validate result, when none error, you can return `false` `undefined` `null` or anything can transform to false, 
 * when the value is not suitable, you can return a string or an object.
 */

/**
 * @typedef ValidateElement
 * 
 * If the value of `required` or `type` is an Array, 
 * the second value of the array is the error message that describe the error reason, 
 * it can be a string or an object,
 * and the first value is normal value as used without array.
 * 
 * @property {Boolean|Array} required indicate whether the current field necessary
 * @property {Number|JSON|Date|Array} type declare the current field's type.
 * @property {FuncCustomValidateFunctiontion} custom the custom validate function
 * @property {Object} options the extended options used to check validate.
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
 *     }
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
 *      field1: {type: [Number, 'field must be a Number']}
 *  }
 * }
 * ```
 * @property {ValidateElement} filedName
 */

/**
 * The class of Validator
 * 
 * @class Validator
 */
class Validator {
    /**
     * Creates an instance of Validator.
     * @param {Schema} schema 
     * @memberof Validator
     */
    constructor({schema}) {
        this.schemaKeys = Object.keys(schema);
        this.expectedErrorMsg = {};
    }
    _isEmptyValue(value) {
        return typeof(value) === 'undefined' || value === '' || value === null;
    }
    _validateItem({validateElement, key, params}) {
        let value = params[key];
        if (this._isEmptyValue(value)) {
            const required = validateElement.required;
            if ((Array.isArray(required) && required[0]))  {
                return required[1];
            } else if (required) {
                return `${key} can't be empty`;
            }
        }
        let needType = validateElement.type;
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
                    return errMsg || `${key} must be a Number`;
                }
                const { lte, gte } = validateElement.options || {};
                if (!isNaN(lte) && value < lte) {
                    return errMsg || `${key} must be gte than ${lte}`;
                }
                if (!isNaN(gte) && value > gte) {
                    return errMsg || `${key} must be lte than ${gte}`;
                }
                params[key] = value;
                break;
            }

            case Date:
                value = new Date(value);
                if (isNaN(value.getTime())) {
                    return errMsg || `${key} must be a Date`;
                }
                params[key] = value;
                break;

            case JSON:
                try {
                    value = JSON.parse(value);
                } catch (e) {
                    return errMsg || `${key} must be a JSON string`;
                }
                params[key] = value;
                break;
            case Validator.TYPE_FILE: {
                const {onlyCheckDirectory} = validateElement.options || {};

                if (!onlyCheckDirectory) {
                    if (!fs.existsSync(value)) {
                        return errMsg || 'the value of ' + key + ' is a necessary file ,but not exists in ' + value;
                    }
                } else {
                    var dirname = path.dirname(value);
                    if (!fs.lstatSync(dirname).isDirectory()) {
                        return errMsg || 'the path ' + dirname + ' must exist and be a directory';
                    }
                }
                break;
            }
                
            case Validator.TYPE_DIRECTORY: {
                const {endWithSeparator} = validateElement.options || {};
                if (!fs.lstatSync(value).isDirectory()) {
                    return errMsg || ('the path '+ value + ' must be a directory');
                }
                if (endWithSeparator && !value.endWith(path.sep)) {
                    return errMsg || ('the path '+ value + ' must be end with a separator');
                }

                break;
            }
                
            case Validator.TYPE_URL: {
                const {endWithSeparator} = validateElement.options || {};
                if (!value.startsWith('http://') && !value.startsWith('https://')) {
                    return errMsg || ('invalid url:' + value);
                }
                if (endWithSeparator && !value.endsWith('/')) {
                    return errMsg || ('the url['+value+'] must be end with /');
                }
                if (!endWithSeparator && value.endsWith('/')) {
                    return errMsg || ('the url['+value+'] must not be end with /');
                } 
                break;
            }
            default:
                if (typeof (needType) === 'object') {
                    for (const sub in value) {
                        const result = this._validateItem({
                            validateElement: validateElement[key][sub], 
                            key: sub, 
                            params: params[key][sub]
                        });
                        if (result) {
                            return result;
                        }
                    }
                }
                break;
            }
        }
    }
    /**
     * To do a validation.
     * 
     * @param {Object} params 
     * @returns {null|String}
     * @memberof Validator
     */
    doValidate(params) {
        for (const key of this.schemaKeys) {
            const validateElement = this.schema[key];
            let value = params[key];

            const customValidator = validateElement.custom;
            if (customValidator) {
                const result = customValidator(value, validateElement);
                return result;
            }
            this._validateItem({validateElement, key, params});
        }//end of for
        return null;
    }
}
Validator.TYPE_FILE = 'File';
Validator.TYPE_DIRECTORY = 'Directory';
Validator.TYPE_URL = 'Url';
module.exports = Validator;
