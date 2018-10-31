module.exports = {
    "env": {
        "browser": true,
        "amd": true,
        "node": true
    },
    "parser": "babel-eslint",
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"],
        "parserOptions": {
            "ecmaVersion": 6,
            "sourceType": "module",
            "ecmaFeatures": {
                "jsx": true
            }
        },
        "rules": {
            "indent": [
                "error",
                2
            ],
            "linebreak-style": [
                0
            ],
            "semi": [
                "error",
                "always"
            ],
            "no-console": 0
        }
    };