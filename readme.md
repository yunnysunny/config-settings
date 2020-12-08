# config-setttings

[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![node version][node-image]][node-url]

[npm-url]: https://npmjs.org/package/config-settings
[travis-image]: https://img.shields.io/travis/yunnysunny/config-settings.svg?style=flat-square
[travis-url]: https://travis-ci.org/yunnysunny/config-settings
[coveralls-image]: https://img.shields.io/coveralls/yunnysunny/config-settings.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yunnysunny/config-settings?branch=master
[david-image]: https://img.shields.io/david/yunnysunny/config-settings.svg?style=flat-square
[david-url]: https://david-dm.org/yunnysunny/config-settings
[node-image]: https://img.shields.io/badge/node.js-%3E=_6-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/

[![NPM](https://nodei.co/npm/config-settings.png?downloads=true)](https://nodei.co/npm/node-config-settings/)  

## install

npm install config-settings --save

## Usage
### Use with JsonConfig
```json
{
    "var":"xxxx",
    "integer":111,
    "dir":"/var/xxx",
    "dirNotExist":"1234567890qwerty",
    "file":"/var/filename",
    "fileDirExist":"/var/filenotexist",
    "fileNotExist":"098987655oiouyuyt",
    "int":11,
    "notInt":"xx",
    "url":"http://baidu.com"
}
```

```javascript
const config = require('../config.json');
const {JsonConfig} = require('config-settings');
const jsonConfig = new JsonConfig(config);
var varstr = jsonConfig.loadNecessaryVar('var');//get xxxx
var integer = jsonConfig.loadNecessaryVar('integer');//get 111

```

### Use with ConsulConfig

```javascript
const {ConsulConfig} = require('config-settings');
const settings = new ConsulConfig({consulAddr:'127.0.0.1:8500'});

settings.loadNecessaryVar('var').then(function(value) {
    const varstr =  value;
});
settings.loadNecessaryVar('integer').then(function(value) {
    const integer =  value;
});
settings.allLoaded().then(function() {
    //all loading progress finished
}).catch(function() {

});
```

**Attention**

When call the function start with `loadNecessary` failed, the module will throw Error in asynchronous way.

## API

See the document of [api](doc/api.md)


## Test

You should set the environment variable of `CONSUL_SERVER` in format of `ip:port` before `npm run`.

## License

[MIT](LICENSE)