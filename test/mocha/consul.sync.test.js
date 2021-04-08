var chai = require('chai');
var expect = chai.expect;
const {ConsulSyncConfig} = require('../..');
const configObject = require('../config.json');
const {CONSUL_PATH_PREFIX} = require('./before');
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
});