import { BadRequestException, NotFoundException } from "@nestjs/common";

export type JsonDocument = Record<string, unknown>;

export function findCollectionKey(doc: JsonDocument): string | undefined {
  for (const [key, value] of Object.entries(doc)) {
    if (Array.isArray(value)) {
      return key;
    }
  }
  return undefined;
}

export function getCollection(doc: JsonDocument): unknown[] {
  const key = findCollectionKey(doc);
  if (!key) {
    throw new BadRequestException("Resource is not a collection; use GET without mutating methods");
  }
  const value = doc[key];
  if (!Array.isArray(value)) {
    throw new BadRequestException(`Expected array at key "${key}"`);
  }
  return value as unknown[];
}

export function findById(items: unknown[], id: string): Record<string, unknown> {
  const match = items.find(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      "id" in item &&
      String((item as { id: unknown }).id) === id,
  );
  if (!match || typeof match !== "object" || match === null) {
    throw new NotFoundException(`Record not found: ${id}`);
  }
  return match as Record<string, unknown>;
}

export function assertHasId(body: Record<string, unknown>): string {
  const id = body.id;
  if (id === undefined || id === null || String(id).trim() === "") {
    throw new BadRequestException('POST body must include a string "id" field');
  }
  return String(id);
}