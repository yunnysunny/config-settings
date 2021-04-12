var chai = require('chai');
const consul = require('consul');
const sinon = require('sinon');
var expect = chai.expect;
const {ConsulSyncConfig} = require('../..');
const configObject = require('../config.json');
const {CONSUL_PATH_PREFIX, writeKV} = require('./before');
const {schema} = require('./config');
const consulAddr = process.env.CONSUL_SERVER;
const pathPrefix = CONSUL_PATH_PREFIX;

// const keys = Object.keys(configObject).join(',');

describe('sync consul config test',function() {
    it('get config from consul sync', function() {
        const config = ({consulAddr,pathPrefix, schema});

        const settings = new ConsulSyncConfig(config);
        var varstr = settings.getValue('var');
        expect(varstr).to.be.exist;
        const int = settings.getValue('int');
        expect(int).to.be.equal(configObject.int);
        const obj = settings.getValue('object');
        expect(obj).to.be.an('object');
        expect(obj.key1).to.be.equal(configObject.object.key1);
    });

    it('should get empty value when not exist in consul', function() {
        const newSchema = Object.assign({}, schema);
        const emptyKey = 'aaaaa';
        newSchema[emptyKey] = {type:String};
        const config = ({consulAddr,pathPrefix, schema: newSchema});

        const settings = new ConsulSyncConfig(config);
        var varstr = settings.getValue(emptyKey);
        expect(varstr).to.be.undefined;
    });
    it('watch test', function(done) {
        const newSchema = {...schema};
        const KEY_NAME = 'for_watch_key';
        let settings;
        const newValue = '' + Math.random();
        /**
         * @function WatchFunction
         */
        function myWatch(error, key, value) {
            expect(key).to.be.equal(KEY_NAME);
            expect(value).to.be.equal(newValue);
            expect(settings.getValue(KEY_NAME)).to.be.equal(newValue);
            done();
        }
        newSchema[KEY_NAME] = {
            type: String,
            watch: myWatch
        };
        const config = ({consulAddr,pathPrefix, schema: newSchema});

        const keys = Object.keys(newSchema);
        const spy = sinon.spy(consul.Watch.prototype, 'on');
        settings = new ConsulSyncConfig(config);
        expect(spy.callCount).to.be.equal((keys.length) * 2);
        consul.Watch.prototype.on.restore();
        writeKV(KEY_NAME, newValue);
    });
    it('not call watch test', function() {
        const newSchema = {...schema};
        const KEY_NAME = 'watch_disabled_key';
        const spy = sinon.spy(consul.Watch.prototype, 'on');
        /**
         * @function WatchFunction
         */
        function myWatch() {
        }
        newSchema[KEY_NAME] = {
            type: String,
            watch: myWatch,
            isWatchDisabled: true
        };
        const keys = Object.keys(newSchema);
        const config = ({consulAddr,pathPrefix, schema: newSchema});

        new ConsulSyncConfig(config);
        expect(spy.callCount).to.be.equal((keys.length - 1) * 2);
        consul.Watch.prototype.on.restore();
    });
});