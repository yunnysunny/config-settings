# config-setttings

[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]

[npm-url]: https://npmjs.org/package/config-settings
[travis-image]: https://img.shields.io/travis/yunnysunny/config-settings.svg?style=flat-square
[travis-url]: https://travis-ci.org/yunnysunny/config-settings
[david-image]: https://img.shields.io/david/yunnysunny/config-settings.svg?style=flat-square
[david-url]: https://david-dm.org/yunnysunny/config-settings
[node-image]: https://img.shields.io/badge/node.js-%3E=_6-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/

[![NPM](https://nodei.co/npm/config-settings.png?downloads=true)](https://nodei.co/npm/node-config-settings/)  

## install

npm install config-settings --save

## Usage

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
var config = require('../config.json');
var settings = require('config-settings').init(config);

var varstr = settings.loadNecessaryVar('var');//get xxxx
var integer = settings.loadNecessaryVar('integer');//get 111

```

**Attention**

When call the function start with `loadNecessary` failed, the process will exit with code 2.

## API

See the document of [api](doc/api.md)

## License

[MIT](LICENSE)