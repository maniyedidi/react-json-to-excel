import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: './src/index.js',
  output: [
    { file: 'dist/index.js', format: 'cjs', exports: 'named' },
    { file: 'dist/index.es.js', format: 'es', exports: 'named' },
  ],
  external: [/^react($|\/)/, /^react-dom($|\/)/, 'file-saver', /^xlsx($|\/)/],
  plugins: [
    resolve({ extensions: ['.js', '.jsx'] }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx'],
      presets: [['@babel/preset-react', { runtime: 'automatic' }]],
    }),
    terser(),
  ],
};
