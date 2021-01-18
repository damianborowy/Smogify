module.exports = function override(config, env) {
    if (!config.plugins) {
        config.plugins = [];
    }

    config.optimization = {
        splitChunks: {
            chunks: "all",
        },
    };

    return config;
};
