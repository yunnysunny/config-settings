var config = {type: 'consul', consulAddr: process.env.CONSUL_SERVER};

var settings = require('../..').getInstance(config);

const key = process.argv[2];
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
    break;
}