var chai = require('chai');
var expect = chai.expect;
var sinon  = require('sinon');
var assert = require('assert');
var fse = require('fs-extra');

var config = require('../config.json');
process.env.DELAY_TIME_BEFORE_EXIT = 1000;
var DELAY_TIME = 1000 + 100;
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

    it('fail if can nto load necessray var ',function(done) {
        var settings = require('../..').init(config);
        settings.loadNecessaryVar('varNotExist');
        setTimeout(function() {
            assert(process.exit.calledWith(2));
            done();
        },DELAY_TIME);
    });

    it('success if load necessary directory ok',function() {
        var settings = require('../..').init(config);
        fse.ensureDirSync(config.dir);
        var filepath = settings.loadNecessaryDirectory('dir');
        expect(filepath).to.be.exist;
    });

    it('fail if can not load necessary directory',function(done) {
        var settings = require('../..').init(config);

        settings.loadNecessaryDirectory('dirNotExist');
        setTimeout(function() {
            assert(process.exit.calledWith(2));
            done();
        },DELAY_TIME);
    });

    it('success if can load necessary integer',function() {
        var settings = require('../..').init(config);

        var value = settings.loadNecessaryInt('int');
        expect(value).to.be.a('number');
    });

    it('fail if can not load necessary integer',function(done) {
        var settings = require('../..').init(config);

        settings.loadNecessaryInt('notInt');
        setTimeout(function() {
            assert(process.exit.calledWith(2));
            done();
        },DELAY_TIME);
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

    it('fail if can not load necessary file',function(done) {
        var settings = require('../..').init(config);
        settings.loadNecessaryFile('fileNotExist');
        setTimeout(function() {
            assert(process.exit.calledWith(2));
            done();
        },DELAY_TIME);
    });

    it('success if load necessary url',function() {
        var settings = require('../..').init(config);
        var url = settings.loadNecessaryUrl('url');
        expect(url).to.be.exist;
    });

    it('fail if can not load necessary url',function(done) {
        var settings = require('../..').init(config);
        settings.loadNecessaryUrl('xxurl');
        setTimeout(function() {
            assert(process.exit.calledWith(2));
            done();
        },DELAY_TIME);
    });

    it('fail if the loaded url not end with /',function(done) {
        var settings = require('../..').init(config);
        settings.loadNecessaryUrl('url',true);
        setTimeout(function() {
            assert(process.exit.calledWith(2));
            done();
        },DELAY_TIME);
    });
});







