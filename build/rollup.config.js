import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import pkg from '../package.json'
export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'VueWow',
      globals: {
        vue: 'Vue'
      }
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  external: ['vue'],
  plugins: [
    vue(),
    babel({
      include: 'src/**',
      runtimeHelpers: true
    }),
    resolve({
      extensions: ['.js', '.vue']
    }),
    commonjs()
  ]
}
