var chai = require('chai');
var expect = chai.expect;
var sinon  = require('sinon');
var fse = require('fs-extra');

const configObject = require('../config.json');
const forkChild = require('../util/mocha_util').forkChild('json', configObject);
var config = {configObject};
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
        var settings = require('../..').getInstance(config);

        var varstr = settings.loadNecessaryVar('var');
        expect(varstr).to.be.exist;
        var varFromMap = settings.getAllConfig().get('var');
        expect(varFromMap).to.be.exist;
    });

    it('fail if can not load necessray var ',function(done) {
        forkChild('varNotExist', done);
    });

    it('success if load necessary directory ok',function() {
        var settings = require('../..').getInstance(config);
        fse.ensureDirSync(configObject.dir);
        var filepath = settings.loadNecessaryDirectory('dir');
        expect(filepath).to.be.exist;
    });

    it('fail if can not load necessary directory',function(done) {
        forkChild('dirNotExist', done);
    });

    it('success if can load necessary integer',function() {
        var settings = require('../..').getInstance(config);

        var value = settings.loadNecessaryInt('int');
        expect(value).to.be.a('number');
    });

    it('fail if can not load necessary integer',function(done) {
        forkChild('notInt', done);
    });

    it('success if load necessary file',function() {
        var settings = require('../..').getInstance(config);
        fse.ensureFileSync(configObject.file);
        var filepath = settings.loadNecessaryFile('file');
        expect(filepath).to.be.exist;
    });



    it('fail if can not load necessary file',function(done) {
        forkChild('fileNotExist', done);
    });

    it('success if load necessary url',function() {
        var settings = require('../..').getInstance(config);
        var url = settings.loadNecessaryUrl('url');
        expect(url).to.be.exist;
    });

    it('fail if can not load necessary url',function(done) {
        forkChild('xxurl', done);
    });

    it('fail if the loaded url not end with /',function(done) {
        forkChild('url', done);
    });
});







