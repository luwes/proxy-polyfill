/* eslint-env node */
/* eslint camelcase:0 */
const path = require('path');

import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import bundleSize from 'rollup-plugin-bundle-size';
import buble from 'rollup-plugin-buble';
import closure from 'rollup-plugin-closure-compiler-js';

const env = process.env.NODE_ENV;
const config = {
    input: 'src/index.js',
    plugins: [],
    watch: {
        clearScreen: false
    }
};

if (env === 'es' || env === 'cjs') {
    config.output = { format: env };
}

if (env === 'development' || env === 'production') {
    config.output = {
        format: 'umd',
        name: 'ProxyPolyfill'
    };
}

config.plugins.push(
    nodeResolve({
        jsnext: true
    }),
    commonjs(),
    buble()
);

if (env === 'production') {
    config.plugins.push(
        closure({
					// js: './src/*.js',
					// entry_point: './src/index.js',
					// js_output_file: './proxy.min.js',
					languageIn: 'ECMASCRIPT5_STRICT',
					languageOut: 'ECMASCRIPT5_STRICT',
					compilationLevel: 'SIMPLE',
					warningLevel: 'QUIET',
					// processCommonJsModules: true,
					processCommonJsModules: false,
					// outputWrapper: '(function(){%output%})()', // this prevents closure compiler from polluting the global scope
        })
    );
}

config.plugins.push(bundleSize());

export default config;
