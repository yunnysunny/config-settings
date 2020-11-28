const slogger = require('node-slogger');
const path = require('path');
const fs = require('fs');

/**
 * The item from configure object. It can be a format of ordinary string , such as `field`; also can be a nested string, such as `fieldParent.filedSub.fieldSubSub` in Json mode or `fieldParent/filedSub/fieldSubSub` in consul mode.
 * @typedef {String} KeyItem
 */

/**
 * @class AbstractConfig
 * @abstract
 */
class AbstractConfig {

    constructor(option) {
        this._usePromise = option.usePromise || false;
        this._promises = [];
    }
    _exitProcess(reason) {
        slogger.error(reason);
        if (!this._usePromise) {
            throw new Error(reason);
        }
        setTimeout(function() {
            throw new Error(reason);
        }, 0);
    }
    /**
     * Check if all loading has been finished.
     * 
     * @returns {Promise}
     */
    allLoaded() {
        if (!this._usePromise) {
            return Promise.resolve();
        }
        return new Promise(function(resolve, reject) {
            Promise.all(this._promises).then(function() {
                
                setImmediate(function() {
                    resolve();
                });
                
            }).catch(function(err) {
                slogger.error(err);
                reject(err);
            });
        });
    }
    _addToPromiseList(promise) {
        this._promises.push(promise);
    }
    /**
     * @abstract
     * @param {String} key 
     * @returns {any}
     */
    // eslint-disable-next-line no-unused-vars
    _loadVar(key) {
        throw new Error('not supported');
    }
    /**
     * Get value by key
     * 
     * @param {KeyItem} key 
     * @returns {String|Object|Promise}
     */
    loadVar(key) {
        if (!this._usePromise) {
            return this._loadVar(key);
        }
        const promise = this._loadVar(key);
        this._addToPromiseList(promise);
        return promise;

    }
    _checkNecessaryVar(key, reply) {
        if (!reply) {
            return this._exitProcess('the value of ' + key + ' is necessary , but now is undefined');
        }
        return reply;
    }
    /**
     * Get value by key, the value must be exist, otherwise the process will exit.
     * 
     * @param {KeyItem} key
     * @returns {String|Object}
     */
    loadNecessaryVar(key) {
        if (!this._usePromise) {
            return this._checkNecessaryVar(key, this.loadVar(key));
        }
        const _this = this;
        const promise = this.loadVar(key).then(function(reply) {
            return _this._checkNecessaryVar(key, reply);
        });
        return promise;
    }
    _checkNecessaryType(key, reply, type) {
        if (typeof(reply) !== type) {
            return this._exitProcess('the value of ' + key + ' is a necessary ' + type + ', but get ' + reply);
        }
        return reply;
    }
    /**
     * Get string value by key, the value must be exist, otherwise the process will exit.
     * 
     * @param {KeyItem} key
     * @returns {String}
     */
    loadNecessaryString(key) {
        if (!this._usePromise) {
            return this._checkNecessaryType(key, this._loadVar(key), 'string');
        }
        const _this = this;
        const promise = this.loadVar(key).then(function(reply) {
            return _this._checkNecessaryType(key, reply, 'string');
        });

        return promise;
    }
    _checkNecessaryInt(key, num) {
        if (isNaN(num)) {
            this._exitProcess('the value of ' +key+' is a necessary int ,but get ' + num);
            return;
        }
        return num;
    }
    /**
     * Get integer value by key, the value must be exist, otherwise the process will exit.
     * 
     * @param {KeyItem} key
     * @returns {Integer}
     */
    loadNecessaryInt(key) {
        if (!this._usePromise) {
            return this._checkNecessaryInt(key, Number(this.loadVar(key)));
        }
        const _this = this;
        return this.loadVar(key).then(function(num) {
            num = Number(num);
            return _this._checkNecessaryInt(key, num);
        });
    }
    _checkNecessaryObject(key, obj) {
        if (!obj || typeof (obj) != 'object') {
            return this._exitProcess('the value of ' +key+' is a necessary object ,but get '+ obj);
        }
        return obj;
    }
    /**
     * Get object value by key, the value must be exist, otherwise the process will exit.
     * 
     * @param {KeyItem} key
     * @returns {Promise | Object}
     */
    loadNecessaryObject(key) {
        if (!this._usePromise) {
            return this._checkNecessaryObject(key, this.loadVar(key));
        }
        const _this = this;
        const promise = this.loadVar(key).then(function(obj) {
            return _this._checkNecessaryObject(key, obj);
        });
        return promise;
    }
    _checkNecessaryFile(key, filePath, onlyCheckDirectory) {
        if (!filePath) {
            return this._exitProcess('empty file path for ' + key);
        }
        if (!onlyCheckDirectory) {
            if (!fs.existsSync(filePath)) {
                return this._exitProcess('the value of ' +key+' is a necessary file ,but not exists in '+ filePath);
            }
        } else {
            var dirname = path.dirname(filePath);
            if (!fs.lstatSync(dirname).isDirectory()) {
                return this._exitProcess('the path '+dirname + ' must exist and be a directory');
            }
        }

        return filePath;
    }
    /**
     * Get file path by key, the value must be exist, otherwise the process will exit.
     * 
     * @param {KeyItem} key
     * @param {Boolean} [onlyCheckDirectory=false] If set true, only check whether the directory that the file saved is exist.
     * @returns {Promise | String}
     */
    loadNecessaryFile(key,onlyCheckDirectory) {
        if (!this._usePromise) {
            return this._checkNecessaryFile(key, this.loadVar(key), onlyCheckDirectory);
        }
        const _this = this;
        return this.loadVar(key).then(function(filePath) {
            return _this._checkNecessaryFile(key, filePath, onlyCheckDirectory);
        });
    }
    _checkNecessaryDirectory(key, filepath, endWithSeparator) {
        if (!filepath) {
            return this._exitProcess('empty directory for ' + key);
        }
        if (!fs.lstatSync(filepath).isDirectory()) {
            return this._exitProcess('the path '+filepath + ' must be a directory');
        }
        if (endWithSeparator && !filepath.endWith(path.sep)) {
            return this._exitProcess('the path '+filepath + ' must be end with a separator');
        }
        return filepath;
    }
    /**
     * Get directory path by key, the value must be exist, otherwise the process will exit.
     * 
     * @param {KeyItem} key
     * @param {Boolean} [endWithSeparator=false] If set ture, the key must be end with `/`(Linux) or `\`(Windows).
     * @returns {Promise | String}
     */
    loadNecessaryDirectory(key,endWithSeparator) {
        if (!this._usePromise) {
            return this._checkNecessaryDirectory(key, this.loadNecessaryFile(key), endWithSeparator);
        }
        const _this = this;
        return this.loadNecessaryFile(key).then(function(filepath) {
            return _this._checkNecessaryDirectory(key, filepath, endWithSeparator);
        });
    }
    _checkNecessaryUrl(key, url, endWithSeparator) {
        if (!url) {
            return this._exitProcess('empty url for ' + key);
        }
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return this._exitProcess('invalid url:' + url);
        }
        if (endWithSeparator && !url.endsWith('/')) {
            this._exitProcess('the url['+url+'] must be end with /');
            return false;
        }
        if (!endWithSeparator && url.endsWith('/')) {
            return this._exitProcess('the url['+url+'] must not be end with /');
        }
        return url;
    }
    /**
     * Get URL by key, the value must be exist, otherwise the process will exit.
     * 
     * @param {KeyItem} key
     * @param {Boolean} [endWithSeparator=false] If set ture, the key must be end with `/`.
     * @returns {Promise | String}
     */
    loadNecessaryUrl(key,endWithSeparator) {
        if (!this._usePromise) {
            return this._checkNecessaryUrl(key, this.loadNecessaryString(key), endWithSeparator);
        }
        const _this = this;
        return this.loadNecessaryString(key).then(function(url) {
            return _this._checkNecessaryUrl(key, url, endWithSeparator);
        });
    }
}

module.exports = AbstractConfig;