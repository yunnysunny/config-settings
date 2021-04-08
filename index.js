/**
 * The module of config-settings
 * 
 * @module config-settings
 */
module.exports = {
    // baseConfig: require('./lib/base_config'),
    // consulConfig: require('./lib/consul_config')
    JsonConfig: require('./lib/JsonConfig'),
    ConsulSyncConfig: require('./lib/ConsulConfigSync'),
    Parser: require('./lib/Parser'),
    util: require('./lib/util'),
    getInstance: function(option) {
        if (option.type === 'consul-sync') {
            return new this.ConsulSyncConfig(option);
        }
        return new this.JsonConfig(option);
    }
};