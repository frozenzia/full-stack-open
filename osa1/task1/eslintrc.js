module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
        "jest": true,
    },
    "rules": {
        "react/jsx-filename-extension": 0, //allow .js filenames
        "no-use-before-define": 0, //e.g. can have component 1st, styles 2nd
        "indent": ["error", 4], //4-space indents
        "react/jsx-indent": [true, 4], //4-space indents
        "react/jsx-indent-props": [true, 4], //4-space indents
        "no-unused-expressions": ["error", { "allowTernary": true }],
        "no-plusplus":["error", { "allowForLoopAfterthoughts": true }],
        "no-underscore-dangle": 0, //allow _named methods, etc...
    }
};
