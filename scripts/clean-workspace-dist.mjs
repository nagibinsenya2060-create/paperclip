/**
 * Удаляет только dist в workspace-пакетах (packages/, server/, ui/, cli/).
 * Не трогает node_modules. Запуск: pnpm clean:workspace-dist
 */
import { readdirSync, rmSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const allowedRoots = ["packages", "server", "ui", "cli"].map((r) => path.join(root, r));

function isUnderAllowedRoot(absPath) {
  const n = path.normalize(absPath);
  return allowedRoots.some((pre) => n === pre || n.startsWith(pre + path.sep));
}

/** @param {string} dir */
function collectDistDirs(dir, out) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.name === "node_modules") continue;
    if (!e.isDirectory()) continue;
    if (e.name === "dist") {
      if (isUnderAllowedRoot(p)) out.push(p);
      continue;
    }
    collectDistDirs(p, out);
  }
}

const toRemove = [];
for (const ar of allowedRoots) {
  try {
    if (statSync(ar).isDirectory()) collectDistDirs(ar, toRemove);
  } catch {
    /* skip */
  }
}

toRemove.sort((a, b) => b.length - a.length);
for (const p of toRemove) {
  rmSync(p, { recursive: true, force: true });
  console.log(`removed ${path.relative(root, p)}`);
}
if (toRemove.length === 0) {
  console.log("no workspace dist directories found");
}
