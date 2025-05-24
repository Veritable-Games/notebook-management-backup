module.exports = {
  extends: ["react-app", "react-app/jest"],
  overrides: [
    {
      files: ["**/*.js", "**/*.jsx"],
      rules: {
        // Disable source map warnings
        "no-unused-expressions": "off",
        "no-unused-vars": "warn",
        "import/no-webpack-loader-syntax": "off",
      },
    },
  ],
  ignorePatterns: ["node_modules/**/*", "build/**/*"],
};
