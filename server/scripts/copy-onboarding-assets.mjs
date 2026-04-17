import { cpSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dest = path.join(root, "dist", "onboarding-assets");
mkdirSync(dest, { recursive: true });
cpSync(path.join(root, "src", "onboarding-assets"), dest, { recursive: true });
