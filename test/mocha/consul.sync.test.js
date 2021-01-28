var chai = require('chai');
var expect = chai.expect;
const {ConsulSyncConfig} = require('../..');
const configObject = require('../config.json');
const {CONSUL_PATH_PREFIX} = require('./before');
const consulAddr = process.env.CONSUL_SERVER;
const pathPrefix = CONSUL_PATH_PREFIX;

const keys = Object.keys(configObject).join(',');

describe('sync consul config test',function() {
    it('get config from consul sync', function() {
        const config = ({consulAddr,pathPrefix,  keys});

        const settings = new ConsulSyncConfig(config);
        var varstr = settings.loadNecessaryVar('var');
        expect(varstr).to.be.exist;
        const int = settings.loadNecessaryInt('int');
        expect(int).to.be.equal(configObject.int);
    });
});