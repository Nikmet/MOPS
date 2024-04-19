import { nodeResolve } from "@rollup/plugin-node-resolve";
import Scss from "rollup-plugin-scss";
import json from '@rollup/plugin-json'

export default {
    input: "src/app.js",
    output: {
        dir: "dist",
        format: "iife",
    },
    plugins: [Scss({ fileName: "bundle.css" }), nodeResolve(), json()],
};
