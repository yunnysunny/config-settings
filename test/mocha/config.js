const {Parser: {TYPE_DIRECTORY, TYPE_FILE, TYPE_URL}} = require('../../');

exports.schema = {
    'var': {type:String, required: true},
    'integer': {type:Number, required: true},
    'dir': {type:TYPE_DIRECTORY, required: true},
    
    'file': {type:TYPE_FILE, required: true},
    
    'int': {type:Number, required: true},
    
    'url':{type:TYPE_URL, required: true},
    'object': {
        type: {
            'key1': {type:String, required: true}
        }
    }
};

exports.schemaInvalid = {
    varNotExist: {type:String, required: true},
    'dirNotExist': {type:TYPE_DIRECTORY, required: true},
    'fileDirExist': {type:TYPE_FILE, required: true},
    'fileNotExist': {type:TYPE_FILE, required: true},
    'notInt': {type:Number},
    'url':{type:TYPE_URL, required: true, options: {endWithSeparator: true}},
    xxurl: {type:TYPE_URL, required: true, options: {endWithSeparator: true}}
};