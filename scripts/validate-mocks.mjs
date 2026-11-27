#!/usr/bin/env node
/**
 * Validates all mock JSON under mock/ and optional manifest file references.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mockRoot = path.join(root, "mock");

let errors = 0;
let fileCount = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!entry.name.endsWith(".json")) {
      continue;
    }
    fileCount += 1;
    try {
      JSON.parse(fs.readFileSync(full, "utf8"));
    } catch (e) {
      errors += 1;
      console.error(`Invalid JSON: ${path.relative(root, full)} — ${e.message}`);
    }
  }
}

function validateManifests() {
  for (const entry of fs.readdirSync(mockRoot, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith(".")) {
      continue;
    }
    const manifestPath = path.join(mockRoot, entry.name, "manifest.json");
    if (!fs.existsSync(manifestPath)) {
      continue;
    }
    let manifest;
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    } catch {
      continue;
    }
    for (const file of manifest.files ?? []) {
      const rel = file.path;
      const target = path.join(mockRoot, entry.name, rel);
      if (!fs.existsSync(target)) {
        errors += 1;
        console.error(`Manifest reference missing: ${entry.name}/${rel}`);
      }
    }
  }
}

if (!fs.existsSync(mockRoot)) {
  console.error("mock/ directory not found");
  process.exit(1);
}

walk(mockRoot);
validateManifests();

if (errors > 0) {
  console.error(`validate-mocks failed: ${errors} error(s) in ${fileCount} JSON files`);
  process.exit(1);
}

console.log(`validate-mocks ok (${fileCount} JSON files)`);