var child_process = require('child_process');
const slogger = require('node-slogger');
const path = require('path');

exports.forkChild = function(type, obj) {
    if (type === 'json') {
        obj = JSON.stringify(obj);
    }
    return  function (key, done) {
        const child = child_process.fork(path.join(__dirname,'./child_process.js'),[key ,type, obj], {
            silent: true
        });
        let hasDone = false;
        child.stdout.setEncoding('utf8');
        child.stderr.on('data', function(data) {
            // eslint-disable-next-line no-console
            // console.error('error from child', data.toString());
        });
        child.stdout.on('data', function(data){
            slogger.trace('stdout child',data);
            if ((data).indexOf('ERROR') !== -1 && !hasDone) {
                hasDone = true;
                return done();
            } else if (data.indexOf('Uncaught Error') !== -1) {
                return;
            } else {
                if (!hasDone) {
                    return slogger.error('unexception error', data);
                }
            }
    
        });
    };
};
