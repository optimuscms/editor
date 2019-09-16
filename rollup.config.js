import sass from 'node-sass';
import cssnano from 'cssnano';
import pkg from './package.json';
import vue from 'rollup-plugin-vue';
import babel from 'rollup-plugin-babel';
import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';
import { eslint } from 'rollup-plugin-eslint';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';

const globals = {
    '@tinymce/tinymce-vue': 'Editor',
};

const external = [
    '@tinymce/tinymce-vue',
];

const plugins = [
    eslint({
        include: [
            '**/*.js',
            '**/*.vue',
        ],
    }),
    commonjs(),
    vue({
        compileTemplate: true,
    }),
    babel({
        extensions: ['.js', '.vue'],
    }),
];

export default [
    {
        input: 'src/index.js',
        output: [
            {
                file: pkg.main,
                name: 'Editor',
                format: 'umd',
                globals,
                exports: 'named',
            },
            {
                file: pkg.module,
                format: 'esm',
                globals,
                exports: 'named',
            },
        ],
        external,
        plugins,
    },
    {
        input: 'src/index.js',
        output: {
            file: 'dist/editor.min.js',
            name: 'Editor',
            format: 'umd',
            globals,
            exports: 'named',
            sourcemap: true,
        },
        external,
        plugins: [
            ...plugins,
            terser(),
        ],
    },
    {
        input: 'src/styles.scss',
        output: {
            file: 'dist/editor.min.css',
            format: 'es',
        },
        plugins: [
            postcss({
                extract: true,
                minimize: true,
                sourceMap: true,
                extensions: [ '.sass' ],
                plugins: [
                    cssnano(),
                    autoprefixer,
                ],
                preprocessor: (content, id) => new Promise(resolve => {
                    const result = sass.renderSync({ file: id });

                    resolve({
                        code: result.css.toString(),
                    });
                }),
            }),
        ],
    },
];
