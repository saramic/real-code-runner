module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", "prettier", "plugin:prettier/recommended", "plugin:jest/recommended"],
  globals: {
    "describe": false,
    "document": false,
    "expect": false,
    "it": false,
    "beforeEach": false,
    "afterEach": false,
    "context": false,
    "localStorage": false,
    "window": false,
    "jest": false,
    "fail": false,
  },
  plugins: ["prettier", "jest"],
  rules: {
    "prettier/prettier": "error",
    "jest/no-large-snapshots": "error",
    "react/prop-types": "off",
  },
  settings: {
    react: {
      version: '16.8.1',
    },
    'import/resolver': {
      node: {
        paths: ["./app/javascript/"]
      }
    }
  },
};
