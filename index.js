var slogger = require('node-slogger');
var fs = require('fs');
var path = require('path');
require('./string');
var DELAY_TIME_BEFORE_EXIT = Number(process.env.DELAY_TIME_BEFORE_EXIT) || 10000;

function exitProcess(reason,alarm) {
    slogger.error(reason);
    if (alarm) {
        alarm.sendAll(reason);
    }
    setTimeout(function() {
        process.exit(2);
    },DELAY_TIME_BEFORE_EXIT);

}

/**
 * The item from configure object. It can be a format of ordinary string , such as `field`; also can be a nested string, such as `fieldParent.filedSub.fieldSubSub`.
 * @typedef {String} KeyItem
 */

/**
 * The module of config-settings
 * 
 * @module config-settings
 */
module.exports = {
    /**
     * Init the config-settings
     * 
     * @param {Object} configObj The configure object.
     * @param {Object} options 
     * @param {Object=} options.alarm The alarm object, it should has the function of `sendAll`.
     * @returns {this}
     */
    init : function(configObj, options) {
        this.configObj = configObj;
        options = options || {};
        this.alarm = options.alarm;
        return this;
    },
    /**
     * Set the alarm object
     * 
     * @param {Object} alarm
     */
    setAlarm : function(alarm) {
        this.alarm = alarm;
    }, 
    /**
     * Get value by key
     * 
     * @param {KeyItem} key 
     * @returns {String|Object}
     */
    loadVar : function(key) {
        var value;
        if (key.indexOf('.') == -1) {
            value = this.configObj[key];
        } else {
            var keyArray = key.split('.');
            var keyStr = keyArray[0];
            value = this.configObj[keyStr];
            for(var i= 1,len=keyArray.length;i<len;i++) {
                if (!value && i < len-1) {
                    exitProcess('the var ['+keyStr + '] is empty.', this.alarm);
                    return undefined;
                }
                var keyNow = keyArray[i];
                keyStr += '.'+keyNow;
                value = value[keyNow];
            }
        }
        slogger.debug('load var ['+key+'],value:',value);
        return value;
    },
    /**
     * Get value by key, the value must be exist, otherwise the process will exit.
     * 
     * @param {KeyItem} key
     * @returns {String|Object}
     */
    loadNecessaryVar : function(key) {
        var value = this.loadVar(key);
        if (typeof(value) =='undefined') {
            exitProcess('the value of ' + key + ' is necessary , but now is undefined', this.alarm);
            return false;
        }
        return value;
    },
    /**
     * Get string value by key, the value must be exist, otherwise the process will exit.
     * 
     * @param {KeyItem} key
     * @returns {String}
     */
    loadNecessaryString : function(key) {
        var str = this.loadVar(key);
        if (typeof (str) != 'string') {
            exitProcess('the value of ' + key + ' is a necessary string, but get ' + str, this.alarm);
            return false;
        }
        return str;
    },
    /**
     * Get integer value by key, the value must be exist, otherwise the process will exit.
     * 
     * @param {KeyItem} key
     * @returns {Integer}
     */
    loadNecessaryInt : function(key) {
        var num = parseInt(this.loadVar(key));
        if (isNaN(num)) {
            exitProcess('the value of ' +key+' is a necessary int ,but get ' + num, this.alarm);
            return false;
        }
        return num;
    },
    /**
     * Get object value by key, the value must be exist, otherwise the process will exit.
     * 
     * @param {KeyItem} key
     * @returns {Object}
     */
    loadNecessaryObject : function(key) {
        var obj = this.loadVar(key);
        if (!obj || typeof (obj) != 'object') {
            exitProcess('the value of ' +key+' is a necessary object ,but get '+ obj, this.alarm);
            return false;
        }
        return obj;
    },
    /**
     * Get file path by key, the value must be exist, otherwise the process will exit.
     * 
     * @param {KeyItem} key
     * @param {Boolean} [onlyCheckDirectory=false] If set true, only check whether the directory that the file saved is exist.
     * @returns {String}
     */
    loadNecessaryFile : function(key,onlyCheckDirectory) {
        var filePath = this.loadVar(key);
        if (!filePath) {
            exitProcess('empty file path for ' + key, this.alarm);
            return false;
        }
        if (!onlyCheckDirectory) {
            if (!fs.existsSync(filePath)) {
                exitProcess('the value of ' +key+' is a necessary file ,but not exists in '+ filePath, this.alarm);
                return false;
            }
        } else {
            var dirname = path.dirname(filePath);
            if (!fs.lstatSync(dirname).isDirectory()) {
                exitProcess('the path '+dirname + ' must exist and be a directory', this.alarm);
                return false;
            }
        }

        return filePath;
    },
    /**
     * Get directory path by key, the value must be exist, otherwise the process will exit.
     * 
     * @param {KeyItem} key
     * @param {Boolean} [endWithSeparator=false] If set ture, the key must be end with `/`(Linux) or `\`(Windows).
     * @returns {String}
     */
    loadNecessaryDirectory : function(key,endWithSeparator) {
        var filepath = this.loadNecessaryFile(key);
        if (!filepath) {
            exitProcess('empty directory for ' + key, this.alarm);
            return false;
        }
        if (!fs.lstatSync(filepath).isDirectory()) {
            exitProcess('the path '+filepath + ' must be a directory', this.alarm);
            return false;
        }
        if (endWithSeparator && !filepath.endWith(path.sep)) {
            exitProcess('the path '+filepath + ' must be end with a separator', this.alarm);
            return false;
        }
        return filepath;
    },
    /**
     * Get URL by key, the value must be exist, otherwise the process will exit.
     * 
     * @param {KeyItem} key
     * @param {Boolean} [endWithSeparator=false] If set ture, the key must be end with `/`.
     * @returns {String}
     */
    loadNecessaryUrl : function(key,endWithSeparator) {
        var url = this.loadNecessaryString(key);
        if (!url) {
            exitProcess('empty url for ' + key, this.alarm);
            return false;
        }
        if (!url.startWith('http://') && !url.startWith('https://')) {
            exitProcess('invalid url:' + url, this.alarm);
            return false;
        }
        if (endWithSeparator && !url.endWith('/')) {
            exitProcess('the url['+url+'] must be end with /', this.alarm);
            return false;
        }
        if (!endWithSeparator && url.endWith('/')) {
            exitProcess('the url['+url+'] must not be end with /', this.alarm);
            return false;
        }
        return url;
    }
};