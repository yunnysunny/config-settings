var chai = require('chai');
var expect = chai.expect;
// var sinon  = require('sinon');
var fse = require('fs-extra');
const {JsonConfig} = require('../../');
const configObject = require('../config.json');
const forkChild = require('../util/mocha_util').forkChild('json', configObject);
const {schema} = require('./config');
process.env.DELAY_TIME_BEFORE_EXIT = 1000;

var config = {configObject, schema};
describe('basic test:',function() {
    it('succeeds if load necessary var ok', function (done) {
        var settings = new JsonConfig(config);

        var varstr = settings.getValue('var');
        expect(varstr).to.be.exist;
        expect(settings.params).to.have.property('var');
        done();
    });

    it('fail if can not load necessray var ',function(done) {
        forkChild('varNotExist', done);
    });

    it('success if load necessary directory ok',function() {
        var settings = new JsonConfig(config);
        fse.ensureDirSync(configObject.dir);
        var filepath = settings.getValue('dir');
        expect(filepath).to.be.exist;
    });

    it('fail if can not load necessary directory',function(done) {
        forkChild('dirNotExist', done);
    });

    it('success if can load necessary integer',function() {
        var settings = new JsonConfig(config);

        var value = settings.getValue('int');
        expect(value).to.be.a('number');
    });

    it('fail if can not load necessary integer',function(done) {
        forkChild('notInt', done);
    });

    it('success if load necessary file',function() {
        var settings = new JsonConfig(config);
        fse.ensureFileSync(configObject.file);
        var filepath = settings.getValue('file');
        expect(filepath).to.be.exist;
    });



    it('fail if can not load necessary file',function(done) {
        forkChild('fileNotExist', done);
    });

    it('success if load necessary url',function() {
        var settings = new JsonConfig(config);
        var url = settings.getValue('url');
        expect(url).to.be.exist;
    });

    it('fail if can not load necessary url',function(done) {
        forkChild('xxurl', done);
    });

    it('fail if the loaded url not end with /',function(done) {
        forkChild('url', done);
    });

    it('custom parse', function(done) {
        const newConfig = {...config};
        const SUFFIX = '_SUFFIX';
        newConfig.schema = Object.assign({},schema, {
            'object': {
                type: {
                    'key1': {type:String, required: true,}
                },
                custom: function({value}) {
                    value.key1 = value.key1 + SUFFIX;
                    return {error: null, value};
                }
            }
        });
        var settings = new JsonConfig(newConfig);
        const obj = settings.getValue('object');
        expect(obj.key1).to.be.equal(configObject.object.key1 + SUFFIX);
        done();
    });

    it('sub custom parse', function(done) {
        const newConfig = {...config};
        const SUFFIX = '_SUFFIX_SUB';
        newConfig.schema = Object.assign({},schema, {
            'object': {
                type: {
                    'key1': {
                        type:String, 
                        required: true, 
                        custom: function({value}) {
                            value = value + SUFFIX;
                            return {error: null, value};
                        }
                    }
                },
            }
        });
        var settings = new JsonConfig(newConfig);
        const obj = settings.getValue('object');
        expect(obj.key1).to.be.equal(configObject.object.key1 + SUFFIX);
        done();
    });

    it('sub after parse', function(done) {
        const newConfig = {...config};
        newConfig.schema = Object.assign({},schema, {
            'object': {
                type: {
                    'key1': {
                        type:String, 
                        required: true, 
                    }
                },
                afterParse: function(value) {
                    expect(value.key1).to.be.equal(configObject.object.key1);
                    done();
                }
            }
        });
        new JsonConfig(newConfig);
    });

    it('preferred value', function(done) {
        const newConfig = {...config};
        const GIVEN_VALUE = 'ABC';
        newConfig.schema = Object.assign({},schema, {
            'keyx': {
                type:String, 
                required: true, 
                preferred: GIVEN_VALUE,
                afterParse: function(value) {
                    expect(value).to.be.equal(GIVEN_VALUE);
                    done();
                }
            }
        });
        new JsonConfig(newConfig);
    });

    it('preferred function value', function(done) {
        const newConfig = {...config};
        const GIVEN_VALUE = '123';
        newConfig.schema = Object.assign({},schema, {
            'keyy': {
                type:String, 
                required: true, 
                preferred: function() {
                    return GIVEN_VALUE;
                },
                afterParse: function(value) {
                    expect(value).to.be.equal(GIVEN_VALUE);
                    done();
                }
            }
        });
        new JsonConfig(newConfig);
    });

});







