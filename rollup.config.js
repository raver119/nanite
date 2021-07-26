import typescript from 'rollup-plugin-typescript3';

const sourceMap = false

export default {
    input: [
        'src/index.ts',
    ],
    output: [
        {
            dir: './',
            format: 'esm',
            sourcemap: sourceMap
        },
    ],
    plugins: [
        typescript({declaration: true, sourceMap: sourceMap, declarationDir: './', rootDir: 'src/'})
    ]
}