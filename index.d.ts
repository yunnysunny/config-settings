declare module "lib/Parser" {
    export = Parser;
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
     * @property {*} [preferred] when it not empty , it will be used instend of the value get from consul or json object.
     * @property {Boolean|Array} [required=false] indicate whether the current field necessary
     * @property {Number|JSON|Date|String|Object} type declare the current field's type,
     * it can be `Number` `JSON` `String` `Parser.TYPE_FILE` `Parser.TYPE_DIRECTORY` `Parser.TYPE_URL` or an Object with properties. see
     * @property {CustomParseFunction=} custom the custom validate function
     * @property {Object=} options the extended options used to check validate.
     * @property {AfterParseFunction=} afterParse the function to do after parse.
     * @property {WatchFunction=} watch the function used in consul watch callback
     * @property {Boolean=} [isWatchDisabled=false] whether disable watching the key's changes, default is false.
     */
    /**
     * @typedef {Object.<string, SchemaElement>} Schema
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
         * @param {Object} option
         * @param {Schema} option.schema
         */
        constructor({ schema }: {
            schema: Schema;
        });
        _schema: {
            [x: string]: SchemaElement;
        };
        _isEmptyValue(value: any): boolean;
        /**
         * @private
         * @param {Object} option
         * @param {SchemaElement} option.schemaElement
         * @param {String} option.key
         * @param {Object} option.params
         * @returns {ElementParsedResult}
         */
        private _validateItem;
        /**
         * Parse one config.
         * @param {Object} option
         * @param {String} option.key
         * @param {*} option.value
         * @param {Boolean} [option.isFromWatch=false]
         * @param {*} [option.oldValue] pass to when isFromWatch is true
         * @returns {ElementParsedResult}
         */
        doParseElement({ key, value, isFromWatch, oldValue }: {
            key: string;
            value: any;
            isFromWatch?: boolean;
            oldValue?: any;
        }): ElementParsedResult;
        /**
         * Parse all the config.
         *
         * @param {Object} params
         * @returns {{error:String, params: Object}}
         */
        doParse(params: any): {
            error: string;
            params: any;
        };
    }
    namespace Parser {
        export { TYPE_FILE, TYPE_DIRECTORY, TYPE_URL, SchemaElement, Schema, ElementParsedResult };
    }
    /**
     *
     * If the value of `required` or `type` is an Array,
     * the second value of the array is the error message that describe the error reason,
     * it can be a string or an object,
     * and the first value is normal value as used without array.
     */
    type SchemaElement = {
        /**
         * when it not empty , it will be used instend of the value get from consul or json object.
         */
        preferred?: any;
        /**
         * indicate whether the current field necessary
         */
        required?: boolean | any[];
        /**
         * declare the current field's type,
         * it can be `Number` `JSON` `String` `Parser.TYPE_FILE` `Parser.TYPE_DIRECTORY` `Parser.TYPE_URL` or an Object with properties. see
         */
        type: number | JSON | Date | string | any;
        /**
         * the custom validate function
         */
        custom?: any;
        /**
         * the extended options used to check validate.
         */
        options?: any | undefined;
        /**
         * the function to do after parse.
         */
        afterParse?: any;
        /**
         * the function used in consul watch callback
         */
        watch?: any;
        /**
         * whether disable watching the key's changes, default is false.
         */
        isWatchDisabled?: boolean | undefined;
    };
    type ElementParsedResult = {
        /**
         * when the value is invalid, the error is not empty.
         */
        error?: string | Error;
        /**
         * when the value is valid, return the value , it may be transfromed to the type you want.
         */
        value: any;
        /**
         * whether the value is changed, it may be true when the key changed from consul.
         */
        changed: boolean;
    };
    type Schema = {
        [x: string]: SchemaElement;
    };
    var TYPE_FILE: string;
    var TYPE_DIRECTORY: string;
    var TYPE_URL: string;
}
declare module "lib/util" {
    export function getConfigFromConsulSync(option: {
        consulAddr: string;
        pathPrefix: string;
        savePath: string;
        keys: Array<string>;
        timeoutMs?: number;
        retryLimit?: number;
        consulOption?: any;
    }): any;
    export function deepCopy(data: any): {};
}
declare module "lib/JsonConfig" {
    export = JsonConfig;
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
        constructor(option: {
            configObject: any;
            schema: any;
            waitTimeBeforeThrowErrorMs?: number;
        });
        _configObject: {};
        _validator: Parser;
        _waitTimeBeforeThrowErrorMs: number;
        _schema: any;
        _params: any;
        _exitProcess(reason: any): void;
        /**
         * Get the value via key name.
         * @param {String} key
         * @returns {*}
         */
        getValue(key: string): any;
        /**
         * Get All the value.
         */
        get params(): any;
    }
    import Parser = require("lib/Parser");
}
declare module "lib/ConsulConfigSync" {
    export = ConsulConfigSync;
    /**
     * @typedef  ConsulOption
     *
     * @property {Boolean} [secure=false]  enable HTTPS
     * @property {String[]} [ca]  array of strings or Buffers of trusted certificates in PEM format
     * @property {Object} [defaults] common method call options that will be included with every call
     * (ex: set default token)
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
         * @param {Schema} option.schema The schema object.
         * @param {Number} [option.waitTimeBeforeThrowErrorMs=0] The wait time before trigger error when the value returned is not expected.
         * The default value is `0`, but it will throw the error in async way even if you set the parameter to `0`.
         * @param {Number} [option.timeout4RequestConsulMs=5000] The timeout milliseconds for consul request.
         * @param {Number} [option.retryLimit=0] The retry times before getting data from consul failed.
         * The default is `0`, which means no limit.
         * @param {ConsulOption} [option.consulOption={}] The consul option used to init a consul client.
         */
        constructor(option: {
            consulAddr: string;
            pathPrefix: string;
            schema: any;
            waitTimeBeforeThrowErrorMs?: number;
            timeout4RequestConsulMs?: number;
            retryLimit?: number;
            consulOption?: ConsulOption;
        });
        _doWatchCallback({ schemaElement, error, key, value }: {
            schemaElement: any;
            error: any;
            key: any;
            value: any;
        }): void;
        _addWatches(option: any): void;
    }
    namespace ConsulConfigSync {
        export { ConsulOption };
    }
    import JsonConfig = require("lib/JsonConfig");
    type ConsulOption = {
        /**
         * enable HTTPS
         */
        secure?: boolean;
        /**
         * array of strings or Buffers of trusted certificates in PEM format
         */
        ca?: string[];
        /**
         * common method call options that will be included with every call
         * (ex: set default token)
         */
        defaults?: any;
    };
}
declare module "index" {
    export const JsonConfig: typeof import("lib/JsonConfig");
    export const ConsulSyncConfig: typeof import("lib/ConsulConfigSync");
    export const Parser: typeof import("lib/Parser");
    export const util: typeof import("lib/util");
    export function getInstance(option: any): import("lib/JsonConfig");
}
