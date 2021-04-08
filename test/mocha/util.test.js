var chai = require('chai');
const path = require('path');
var expect = chai.expect;
const {util, JsonConfig} = require('../..');
const configObject = require('../config.json');
const {CONSUL_PATH_PREFIX} = require('./before');
const {schema} = require('./config');
const consulAddr = process.env.CONSUL_SERVER;
const pathPrefix = CONSUL_PATH_PREFIX;

const keys = Object.keys(configObject).join(',');

describe('util test',function() {
    it('read config from consul  async', function() {
        const savePath = path.join(__dirname, './config.json');
        const {status} = util.getConfigFromConsulSync({consulAddr,pathPrefix, savePath, keys});

        expect(status).to.be.equal(0);
        const loadedConfig = require(savePath);
        const settings = new JsonConfig({configObject: loadedConfig, schema});
        var varstr = settings.getValue('var');
        expect(varstr).to.be.exist;
    });
});