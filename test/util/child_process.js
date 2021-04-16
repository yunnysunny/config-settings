const key = process.argv[2];
const type = process.argv[3];
let obj = process.argv[4];
if (type === 'json') {
    obj = JSON.parse(obj);
}
const {schemaInvalid} =  require('../mocha/config');
var config = {type, configObject: obj, consulAddr: process.env.CONSUL_SERVER};
const {JsonConfig} = require('../..');
config.schema = {[key]: schemaInvalid[key]};
new JsonConfig(config);

// switch (key) {
// case 'varNotExist':
//     settings.getValue('varNotExist');
//     break;
// case 'dirNotExist':
//     settings.getValue('dirNotExist');
//     break;
// case 'notInt':
//     settings.getValue('notInt');
//     break;
// case 'fileNotExist':
//     settings.getValue('fileNotExist');
//     break;
// case 'xxurl':
//     settings.getValue('xxurl');
//     break;
// case 'url':
//     settings.getValue('url');
//     break;
// default:
//     // eslint-disable-next-line no-console
//     console.error('not support test key', key);
//     break;
// }