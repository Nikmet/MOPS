import { nodeResolve } from "@rollup/plugin-node-resolve";
import Scss from "rollup-plugin-scss";

export default {
    input: "src/app.js",
    output: {
        dir: "dist",
        format: "iife",
    },
    plugins: [Scss({ fileName: "bundle.css" }), nodeResolve()],
};
