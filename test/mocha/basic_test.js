var chai = require('chai');
var expect = chai.expect;
var sinon  = require('sinon');
var fse = require('fs-extra');

var config = require('../config.json');
process.env.DELAY_TIME_BEFORE_EXIT = 1000;
// var DELAY_TIME = 1000 + 100;
describe('basic test:',function() {
    before(function() {
        sinon.stub(process, 'exit');
    });
    after(function() {
        sinon.restore();
    });
    
    it('succeeds if load necessary var ok', function () {
        var settings = require('../..').init(config);

        var varstr = settings.loadNecessaryVar('var');
        expect(varstr).to.be.exist;
    });

    it('fail if can not load necessray var ',function() {
        var settings = require('../..').init(config);
        expect(function() {
            settings.loadNecessaryVar('varNotExist');
        }).to.throw(Error);
    });

    it('success if load necessary directory ok',function() {
        var settings = require('../..').init(config);
        fse.ensureDirSync(config.dir);
        var filepath = settings.loadNecessaryDirectory('dir');
        expect(filepath).to.be.exist;
    });

    it('fail if can not load necessary directory',function() {
        var settings = require('../..').init(config);
        expect(function() {
            settings.loadNecessaryDirectory('dirNotExist');
        }).to.throw(Error);
    });

    it('success if can load necessary integer',function() {
        var settings = require('../..').init(config);

        var value = settings.loadNecessaryInt('int');
        expect(value).to.be.a('number');
    });

    it('fail if can not load necessary integer',function() {
        var settings = require('../..').init(config);

        expect(function() {
            settings.loadNecessaryInt('notInt');
        }).to.throw(Error);
    });

    it('success if load necessary file',function() {
        var settings = require('../..').init(config);
        fse.ensureFileSync(config.file);
        var filepath = settings.loadNecessaryFile('file');
        expect(filepath).to.be.exist;
    });

    it('success if the file\'s directory exist',function() {
        var settings = require('../..').init(config);
        var filepath = settings.loadNecessaryFile('fileDirExist');
        expect(filepath).to.be.exist;
    });

    it('fail if can not load necessary file',function() {
        var settings = require('../..').init(config);

        expect(function() {
            settings.loadNecessaryFile('fileNotExist');
        }).to.throw(Error);
    });

    it('success if load necessary url',function() {
        var settings = require('../..').init(config);
        var url = settings.loadNecessaryUrl('url');
        expect(url).to.be.exist;
    });

    it('fail if can not load necessary url',function() {
        var settings = require('../..').init(config);
        
        expect(function() {
            settings.loadNecessaryUrl('xxurl');
        }).to.throw(Error);
    });

    it('fail if the loaded url not end with /',function() {
        var settings = require('../..').init(config);
        
        expect(function() {
            settings.loadNecessaryUrl('url',true);
        }).to.throw(Error);
    });
});







