const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const prod = process.argv[2] === "production";

// Load .env file manually (no dotenv dependency)
const envPath = path.resolve(__dirname, "..", ".env");
let envVars = {};
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx > 0) {
        envVars[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
      }
    }
  });
}

const PLUGIN_DIR =
  envVars.OBSIDIAN_VAULT_PLUGIN_PATH ||
  process.env.OBSIDIAN_VAULT_PLUGIN_PATH ||
  (() => {
    console.error(
      "[dev:obsidian-minddump] ERROR: OBSIDIAN_VAULT_PLUGIN_PATH not set.\n" +
        "  Copy .env.example to .env and set the path to your vault's plugin directory."
    );
    process.exit(1);
  })();
const OUTFILE = "main.js";

const ROOT = path.resolve(__dirname, "..");

function copyIfExists(filename) {
	const src = path.join(ROOT, filename);
	const dest = path.join(PLUGIN_DIR, filename);
	if (!fs.existsSync(src)) return;
	fs.copyFileSync(src, dest);
	console.info(`[dev:obsidian-minddump] copied ${src} -> ${dest}`);
}

const copyToObsidianPlugin = {
	name: "copy-to-obsidian-minddump",
	setup(build) {
		build.onEnd((result) => {
			if (result.errors.length > 0) return;
			const src = path.resolve(OUTFILE);
			const dest = path.join(PLUGIN_DIR, OUTFILE);
			fs.mkdirSync(PLUGIN_DIR, { recursive: true });
			fs.copyFileSync(src, dest);
			console.info(`[dev:obsidian-minddump] copied ${src} -> ${dest}`);
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
		fs.mkdirSync(PLUGIN_DIR, { recursive: true });
		copyIfExists("styles.css");
		copyIfExists("manifest.json");
		const stylesPath = path.join(ROOT, "styles.css");
		if (fs.existsSync(stylesPath)) {
			let debounce;
			fs.watch(stylesPath, () => {
				clearTimeout(debounce);
				debounce = setTimeout(() => copyIfExists("styles.css"), 80);
			});
			console.info("[dev:obsidian-minddump] watching styles.css -> PLUGIN_DIR");
		}
		await ctx.watch();
	}
}

main().catch(() => process.exit(1));
