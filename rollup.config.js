import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDeps from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

const { LERNA_ROOT_PATH } = process.env

export default [
  {
    input: [
      './src/index.ts',
    ],
    output: [
      // ESM
      {
        format: 'esm',
        sourcemap: true,
        dir: 'lib',
        preserveModules: true,
        entryFileNames: '[name].esm.js',
      },
      // CommonJS96+
      {
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
        dir: 'lib',
        preserveModules: true,
      },
    ],
    plugins: [
      peerDeps(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: `${LERNA_ROOT_PATH}/tsconfig.json`,
        declaration: true,
        declarationDir: "lib",
      }),
      postcss(),
      terser(),
    ],
  }
];