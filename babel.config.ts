module.exports = function(api: any) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo","@babel/preset-typescript"],
    plugins: ["inline-dotenv","jest"],
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:jest/recommended"],
  }
};
