import { cpSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
cpSync(path.join(root, "src", "migrations"), path.join(root, "dist", "migrations"), {
  recursive: true,
});
