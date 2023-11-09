import fs from "node:fs";
import url from "node:url";
import path from "node:path";

import commonJs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import typeScript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { babel } from "@rollup/plugin-babel";

const ROOT_DIR = path.dirname(url.fileURLToPath(import.meta.url));

const pkg = JSON.parse(
  fs.readFileSync(path.resolve(ROOT_DIR, "package.json"), "UTF-8")
);
const name = pkg.name.replace(/^@.*\//, "");
const input = "src/index.ts";

const banner = `
/**
 * ${name}.js - ${pkg.version}
 *
 * @license ${pkg.license}
 */
`;

const plugins = [
  typeScript(),
  commonJs(),
  nodeResolve(),
  babel({
    extensions: [".ts"],
    babelHelpers: "bundled",
    configFile: path.resolve(ROOT_DIR, ".babelrc.js"),
  }),
];

const base = {
  input,
  output: [
    {
      name: "QuickMarquee",
      file: "dist/quick-marquee.js",
      format: "iife",
      banner,
    },
  ],
  plugins,
};

const minified = {
  input,
  output: [
    {
      name: "QuickMarquee",
      file: "dist/quick-marquee.min.js",
      format: "iife",
      banner,
    },
  ],
  plugins: [...plugins, terser()],
};

export default [base, minified];
