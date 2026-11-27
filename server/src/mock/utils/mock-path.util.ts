import * as fs from "node:fs";
import * as path from "node:path";
import { BadRequestException, NotFoundException } from "@nestjs/common";

const SEGMENT = /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/;

export type MockRouteRef = {
  dataset: string;
  resource: string;
  id?: string;
};

/** Parse `/api/v1/ai-course-creator/activity` or `.../activity/act_001`. */
export function parseMockPath(relativePath: string): MockRouteRef {
  const trimmed = relativePath.replace(/^\/+/, "").replace(/\/+$/, "");
  if (!trimmed) {
    throw new BadRequestException("Missing dataset and resource path");
  }

  const parts = trimmed.split("/").filter(Boolean);
  for (const part of parts) {
    if (part === ".." || part === "." || !SEGMENT.test(part)) {
      throw new BadRequestException(`Invalid path segment: ${part}`);
    }
  }

  if (parts.length < 2) {
    throw new BadRequestException(
      "Expected /api/v1/{dataset}/.../{resource} or /api/v1/{dataset}/{resource}/{id}",
    );
  }

  const id = parts.length >= 3 ? parts.pop() : undefined;
  const resource = parts.pop()!;
  const dataset = parts.join("/");

  return { dataset, resource, id };
}

export function resolveMockFile(mockRoot: string, dataset: string, resource: string): string {
  const baseName = resource.endsWith(".json") ? resource : `${resource}.json`;
  const resolved = path.resolve(mockRoot, dataset, baseName);
  const rootResolved = path.resolve(mockRoot);

  if (!resolved.startsWith(rootResolved + path.sep) && resolved !== rootResolved) {
    throw new BadRequestException("Path escapes mock root");
  }

  if (!fs.existsSync(resolved)) {
    throw new NotFoundException(`Mock file not found: ${dataset}/${baseName}`);
  }

  return resolved;
}

export function listDatasets(mockRoot: string): string[] {
  const results: string[] = [];

  function walk(relative: string) {
    const abs = path.join(mockRoot, relative);
    if (!fs.existsSync(abs)) {
      return;
    }
    const entries = fs.readdirSync(abs, { withFileTypes: true });
    const hasJson = entries.some((e) => e.isFile() && e.name.endsWith(".json"));
    if (hasJson && relative) {
      results.push(relative.replace(/\\/g, "/"));
    }
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith(".")) {
        walk(path.join(relative, entry.name));
      }
    }
  }

  walk("");
  return results.sort();
}

export function listResources(mockRoot: string, dataset: string): string[] {
  const dir = path.resolve(mockRoot, dataset);
  const rootResolved = path.resolve(mockRoot);
  if (!dir.startsWith(rootResolved + path.sep)) {
    throw new BadRequestException("Invalid dataset path");
  }
  if (!fs.existsSync(dir)) {
    throw new NotFoundException(`Dataset not found: ${dataset}`);
  }
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".json") && name !== "manifest.json")
    .map((name) => name.replace(/\.json$/, ""))
    .sort();
}