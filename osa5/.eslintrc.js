module.exports = {
    'env': {
        'commonjs': true,
        'es6': true,
        'node': true,
        'jest': true,
        'browser': true,
        'cypress/globals': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018,
        'ecmaFeatures': {
            'jsx': true
        },
        'sourceType': 'module',
    },
    'plugins': [ 'react', 'jest', 'cypress' ],
    'settings': {
        'react': {
            'version': 'detect',
        },
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'no-console': 0,
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 'off',
        'no-unused-vars': 'warn',
    }
}
