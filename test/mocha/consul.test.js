var chai = require('chai');
var expect = chai.expect;
var sinon  = require('sinon');
var fse = require('fs-extra');
const forkChild = require('../util/mocha_util').forkChild('consul');

const configObject = require('../config.json');
const {CONSUL_PATH_PREFIX} = require('./before');
var config = {type: 'consul', consulAddr: process.env.CONSUL_SERVER, pathPrefix: CONSUL_PATH_PREFIX};
// process.env.DELAY_TIME_BEFORE_EXIT = 1000;


describe('basic test:',function() {
    before(function() {
        sinon.stub(process, 'exit');
    });
    after(function() {
        sinon.restore();
    });

    it('succeeds if load necessary var ok',async function () {
        var settings = require('../..').getInstance(config);
        var varstr = await settings.loadNecessaryVar('var');
        expect(varstr).to.be.exist;
    });

    it('succeeds if load necessary object ok',async function () {
        var settings = require('../..').getInstance(config);

        var varstr = await settings.loadNecessaryObject('object');
        expect(varstr).to.be.exist;
    });

    it('fail if can not load necessray var ',function(done) {
        forkChild('varNotExist', done);
    });

    it('success if load necessary directory ok',async function () {
        var settings = require('../..').getInstance(config);
        fse.ensureDirSync(configObject.dir);
        var filepath = await settings.loadNecessaryDirectory('dir');
        expect(filepath).to.be.exist;
    });

    it('fail if can not load necessary directory',function(done) {
        forkChild('dirNotExist', done);
    });

    it('success if can load necessary integer',async function() {
        var settings = require('../..').getInstance(config);

        var value = await settings.loadNecessaryInt('int');
        expect(value).to.be.a('number');
    });

    it('fail if can not load necessary integer',function(done) {
        forkChild('notInt', done);
    });

    it('success if load necessary file',async function() {
        var settings = require('../..').getInstance(config);
        fse.ensureFileSync(configObject.file);
        var filepath = await settings.loadNecessaryFile('file');
        expect(filepath).to.be.exist;
    });



    it('fail if can not load necessary file',function(done) {
        forkChild('fileNotExist', done);
    });

    it('success if load necessary url',async function() {
        var settings = require('../..').getInstance(config);
        var url = await settings.loadNecessaryUrl('url');
        expect(url).to.be.exist;
    });

    it('fail if can not load necessary url',function(done) {
        forkChild('xxurl', done);
    });

    it('fail if the loaded url not end with /',function(done) {
        forkChild('url', done);
    });
    it('success when all loaded', function(done) {
        var settings = require('../..').getInstance(config);
        settings.loadNecessaryVar('var');
        settings.loadNecessaryObject('object');
        settings.allLoaded().then(function() {
            done();
        });
    });
});







