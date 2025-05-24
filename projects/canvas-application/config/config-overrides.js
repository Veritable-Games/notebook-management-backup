// config-overrides.js
module.exports = function override(config, env) {
  // Disable source map warnings
  config.ignoreWarnings = [/Failed to parse source map/];

  // Add babel plugins for optional chaining and nullish coalescing
  config.module.rules.forEach(rule => {
    if (rule.oneOf) {
      rule.oneOf.forEach(oneOfRule => {
        if (oneOfRule.loader && oneOfRule.loader.includes('babel-loader')) {
          if (!oneOfRule.options.plugins) {
            oneOfRule.options.plugins = [];
          }
          
          // Add support for optional chaining and nullish coalescing
          oneOfRule.options.plugins.push('@babel/plugin-proposal-optional-chaining');
          oneOfRule.options.plugins.push('@babel/plugin-proposal-nullish-coalescing-operator');
        }
      });
    }
  });
  
  // Return the modified config
  return config;
};
