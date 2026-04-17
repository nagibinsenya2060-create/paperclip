import { chmodSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

if (process.platform === "win32") {
  process.exit(0);
}
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
chmodSync(path.join(root, "dist", "index.js"), 0o755);
