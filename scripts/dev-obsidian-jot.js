const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const prod = process.argv[2] === "production";
const PLUGIN_DIR =
	"/Users/kitsch/Documents/obsdian/kitsch/kitsch/.obsidian/plugins/obsidian-jot";
const OUTFILE = "main.js";

const ROOT = path.resolve(__dirname, "..");

function copyIfExists(filename) {
	const src = path.join(ROOT, filename);
	const dest = path.join(PLUGIN_DIR, filename);
	if (!fs.existsSync(src)) return;
	fs.copyFileSync(src, dest);
	console.info(`[dev:obsidian-jot] copied ${src} -> ${dest}`);
}

const copyToObsidianPlugin = {
	name: "copy-to-obsidian-jot",
	setup(build) {
		build.onEnd((result) => {
			if (result.errors.length > 0) return;
			const src = path.resolve(OUTFILE);
			const dest = path.join(PLUGIN_DIR, OUTFILE);
			fs.mkdirSync(PLUGIN_DIR, { recursive: true });
			fs.copyFileSync(src, dest);
			console.info(`[dev:obsidian-jot] copied ${src} -> ${dest}`);
			// main.js 不含样式；只拷 JS 会导致快速记录区布局/隐藏区全部失效
			copyIfExists("styles.css");
			copyIfExists("manifest.json");
		});
	},
};

async function main() {
	const ctx = await esbuild.context({
		entryPoints: ["src/main.ts"],
		bundle: true,
		external: ["obsidian", "electron"],
		format: "cjs",
		target: "es2018",
		logLevel: "info",
		sourcemap: prod ? false : "inline",
		outfile: OUTFILE,
		plugins: [copyToObsidianPlugin],
	});

	if (prod) {
		await ctx.rebuild();
		await ctx.dispose();
		process.exit(0);
	} else {
		await ctx.watch();
	}
}

main().catch(() => process.exit(1));
