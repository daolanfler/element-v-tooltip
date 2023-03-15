import { defineConfig } from "rollup";
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import vue from "rollup-plugin-vue";
import cjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import css from "rollup-plugin-css-only";
import CleanCSS from "clean-css";
import fs from "fs";
import config from "./package.json" assert { type: "json" };

const { name, version } = config;
const getOutputFilename = (type) => `dist/${name}.${type}.js`;

export { name, getOutputFilename };

export default defineConfig([
  {
    input: "src/index.js",
    external: ["element-ui/lib/tooltip", "vue"],
    plugins: [
      nodeResolve({
        mainFields: ["module", "jsnext:main", "main", "browser"],
        extensions: [".vue", ".js"],
      }),
      css({
        output(style) {
          !fs.existsSync("dist") && fs.mkdirSync("dist");
          fs.writeFileSync(
            `dist/${name}.css`,
            new CleanCSS().minify(style).styles
          );
        },
      }),
      vue({
        css: false,
      }),
      babel({
        exclude: "node_modules/**",
        extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".vue"],
        babelHelpers: "bundled",
      }),
      cjs(),
      replace({
        VERSION: JSON.stringify(version),
        preventAssignment: true,
      }),
    ],
    output: [
      {
        exports: "named",
        file: getOutputFilename("common"),
        format: "commonjs",
      },
      {
        exports: "named",
        file: getOutputFilename("esm"),
        format: "esm",
      },
    ],
    watch: {
      include: "src/**",
    },
  },
  {
    input: 'src/plugin.js',
    output: [
      {
        exports: "named",
        dir: 'dist',
        file: 'plugin.common.js',

        format: "commonjs",
      },
      {
        exports: "named",
        file: 'plugin.esm.js',
        dir: 'dist',
        format: "esm",
      },
    ],
  }
]);
