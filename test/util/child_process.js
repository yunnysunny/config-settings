const key = process.argv[2];
const type = process.argv[3];
let obj = process.argv[4];
if (type === 'json') {
    obj = JSON.parse(obj);
}
var config = {type, configObject: obj, consulAddr: process.env.CONSUL_SERVER};

var settings = require('../..').getInstance(config);


switch (key) {
case 'varNotExist':
    settings.loadNecessaryVar('varNotExist');
    break;
case 'dirNotExist':
    settings.loadNecessaryDirectory('dirNotExist');
    break;
case 'notInt':
    settings.loadNecessaryInt('notInt');
    break;
case 'fileNotExist':
    settings.loadNecessaryFile('fileNotExist');
    break;
case 'xxurl':
    settings.loadNecessaryUrl('xxurl');
    break;
case 'url':
    settings.loadNecessaryUrl('url',true);
    break;
default:
    // eslint-disable-next-line no-console
    console.error('not support test key', key);
    break;
}