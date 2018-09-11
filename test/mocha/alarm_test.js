// var chai = require('chai');
// var expect = chai.expect;
var sinon  = require('sinon');
var assert = require('assert');

var config = require('../config.json');
process.env.DELAY_TIME_BEFORE_EXIT = 1000;
var DELAY_TIME = 1000 + 100;

var alarm = {
    init:function(options) {
        options = options || {};
        this.sendToUrl = options.sendToUrl;
        return this;
    },
    sendAll: function() {
        //send alarm message to `sendToUrl`
    }
};

describe('alarm test:',function() {
    before(function() {
        sinon.stub(process, 'exit');
        sinon.stub(alarm,'sendAll');
    });
    after(function() {
        sinon.restore();
    });
    it('success if load necessary var failed and then send alram',function(done) {
        var settings = require('../..').init(config);
        settings.setAlarm(alarm.init({sendToUrl:settings.loadVar('url')}));

        settings.loadNecessaryVar('varNotExist');
        setTimeout(function() {
            assert(process.exit.calledWith(2));
            assert(alarm.sendAll.called);
            done();
        },DELAY_TIME);
    });

});