import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import * as fs from "node:fs";
import { AppConfigService } from "../config/app-config.service";
import {
  assertHasId,
  findById,
  findCollectionKey,
  getCollection,
  JsonDocument,
} from "./utils/collection.util";
import { resolveMockFile } from "./utils/mock-path.util";

@Injectable()
export class MockStoreService {
  private readonly overlays = new Map<string, JsonDocument>();

  constructor(private readonly config: AppConfigService) {}

  fileKey(dataset: string, resource: string): string {
    return resolveMockFile(this.config.mockRoot, dataset, resource);
  }

  private loadDocument(filePath: string): JsonDocument {
    if (this.overlays.has(filePath)) {
      return structuredClone(this.overlays.get(filePath)!);
    }
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw) as JsonDocument;
  }

  private persist(filePath: string, doc: JsonDocument): void {
    this.overlays.set(filePath, structuredClone(doc));
  }

  reset(dataset: string, resource: string): void {
    const filePath = this.fileKey(dataset, resource);
    this.overlays.delete(filePath);
  }

  readFull(dataset: string, resource: string): JsonDocument {
    const filePath = this.fileKey(dataset, resource);
    return this.loadDocument(filePath);
  }

  readCollection(dataset: string, resource: string): { key: string; items: unknown[] } {
    const filePath = this.fileKey(dataset, resource);
    const doc = this.loadDocument(filePath);
    const key = findCollectionKey(doc);
    if (!key) {
      return { key: "", items: [] };
    }
    return { key, items: getCollection(doc) };
  }

  readOne(dataset: string, resource: string, id: string): Record<string, unknown> {
    const { items } = this.readCollection(dataset, resource);
    if (items.length === 0) {
      throw new BadRequestException("This resource is a document, not a collection");
    }
    return findById(items, id);
  }

  create(dataset: string, resource: string, body: Record<string, unknown>): Record<string, unknown> {
    const filePath = this.fileKey(dataset, resource);
    const doc = this.loadDocument(filePath);
    const key = findCollectionKey(doc);
    if (!key) {
      throw new BadRequestException("Cannot POST to a non-collection resource");
    }
    const items = getCollection(doc);
    const id = assertHasId(body);
    if (items.some((i) => typeof i === "object" && i && "id" in i && String((i as { id: unknown }).id) === id)) {
      throw new ConflictException(`Record already exists: ${id}`);
    }
    items.push(body);
    doc[key] = items;
    this.persist(filePath, doc);
    return body;
  }

  replace(dataset: string, resource: string, id: string, body: Record<string, unknown>): Record<string, unknown> {
    const filePath = this.fileKey(dataset, resource);
    const doc = this.loadDocument(filePath);
    const key = findCollectionKey(doc);
    if (!key) {
      throw new BadRequestException("Cannot PUT a non-collection resource");
    }
    const items = getCollection(doc);
    const index = items.findIndex(
      (i) => typeof i === "object" && i && "id" in i && String((i as { id: unknown }).id) === id,
    );
    if (index < 0) {
      findById(items, id);
    }
    const next = { ...body, id };
    items[index] = next;
    doc[key] = items;
    this.persist(filePath, doc);
    return next as Record<string, unknown>;
  }

  patch(dataset: string, resource: string, id: string, body: Record<string, unknown>): Record<string, unknown> {
    const existing = this.readOne(dataset, resource, id);
    return this.replace(dataset, resource, id, { ...existing, ...body, id });
  }

  delete(dataset: string, resource: string, id: string): void {
    const filePath = this.fileKey(dataset, resource);
    const doc = this.loadDocument(filePath);
    const key = findCollectionKey(doc);
    if (!key) {
      throw new BadRequestException("Cannot DELETE a non-collection resource");
    }
    const items = getCollection(doc);
    const next = items.filter(
      (i) => !(typeof i === "object" && i && "id" in i && String((i as { id: unknown }).id) === id),
    );
    if (next.length === items.length) {
      findById(items, id);
    }
    doc[key] = next;
    this.persist(filePath, doc);
  }
}