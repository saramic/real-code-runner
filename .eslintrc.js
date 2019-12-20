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
    "camelcase": "off",                             // allow camelcase for variables that come from ruby APIs
    "react/forbid-prop-types": "off",               // allow generic prop types like `object`, `array`, `any`
    "jsx-a11y/label-has-associated-control": "off", // TODO rm (4) A form label must be associated with a control
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
