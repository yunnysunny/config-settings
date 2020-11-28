/**
 * The module of config-settings
 * 
 * @module config-settings
 */
module.exports = {
    // baseConfig: require('./lib/base_config'),
    // consulConfig: require('./lib/consul_config')
    ConsulConfig: require('./lib/ConsulConfig'),
    JsonConfig: require('./lib/JsonConfig'),
    getInstance: function(option) {
        if (option.type === 'consul') {
            return new this.ConsulConfig(option);
        }
        return new this.JsonConfig(option);
    }
};