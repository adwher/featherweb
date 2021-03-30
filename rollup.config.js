import esbuild from "rollup-plugin-esbuild"
import resolve from "@rollup/plugin-node-resolve"
import common from "@rollup/plugin-commonjs"

const IS_PRODUCTION = !process.env.ROLLUP_WATCH

export default {
    input: "./src/main.ts",

    output: {
        name: "featherweb",
        file: "./dist/featherweb.js",
        format: "iife",
    },

    plugins: [
        resolve({
            browser: true,
        }),

        common(),

        esbuild({
            minify: IS_PRODUCTION,
            target: "es2015",
            sourceMap: true
        })
    ]
}