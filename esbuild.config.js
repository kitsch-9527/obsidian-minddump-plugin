const esbuild = require("esbuild");
const process = require("process");

const prod = process.argv[2] === "production";

esbuild.build({
    entryPoints: ["src/main.ts"],
    bundle: true,
    external: ["obsidian", "electron"],
    format: "cjs",
    target: "es2018",
    logLevel: "info",
    sourcemap: prod ? false : "inline",
    outfile: "main.js",
}).catch(() => process.exit(1));