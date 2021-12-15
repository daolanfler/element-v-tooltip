import {defineConfig} from 'rollup'
import {babel} from '@rollup/plugin-babel'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import cjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import css from 'rollup-plugin-css-only'
import CleanCSS from 'clean-css'
// import {uglify} from 'rollup-plugin-uglify'
import fs from 'fs'

const config = require('./package.json')

const { name, version } = config
const file = type => `dist/${name}.${type}.js`

export { name, file }

export default defineConfig(

  {
    input: 'src/index.js',
    external: ['element-ui/lib/tooltip', 'vue'],
    plugins: [
      nodeResolve({
        mainFields: ['module', 'jsnext:main', 'main', 'browser'],
        extensions: ['.vue', '.js']
      }),
      vue({
        css: false
      }),
      css({
        output(style) {
          !fs.existsSync('dist') && fs.mkdirSync('dist')
          fs.writeFileSync(`dist/${name}.css`, new CleanCSS().minify(style).styles)
        }
      }),
      babel({
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue'],
        babelHelpers: 'bundled'
        
      }),
      cjs(),
      // uglify(),
      replace({
        VERSION: JSON.stringify(version),
        preventAssignment: true
      }),
    ],
    output: {
      exports: 'auto',
      name,
      file: file('umd'),
      format: 'umd'
    },
    watch: {
      include: 'src/**'
    }
  }
)