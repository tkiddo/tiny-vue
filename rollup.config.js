import pkgInfo from './package.json';

import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/index.ts',
  plugins: [resolve(), typescript()],
  output: [
    {
      file: pkgInfo.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkgInfo.module,
      format: 'es',
      sourcemap: true
    }
  ]
};
