import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { AppConfigService } from "../config/app-config.service";
import { ApiItemResponse, ApiListResponse } from "../common/types/api-response";
import { findCollectionKey } from "./utils/collection.util";
import { listResources } from "./utils/mock-path.util";
import { MockStoreService } from "./mock-store.service";

@Injectable()
export class MockService {
  constructor(
    private readonly store: MockStoreService,
    private readonly config: AppConfigService,
  ) {}

  listResources(dataset: string): { data: string[]; meta: { dataset: string; total: number } } {
    const data = listResources(this.config.mockRoot, dataset);
    return { data, meta: { dataset, total: data.length } };
  }

  getDataset(dataset: string, resource: string, id?: string): ApiListResponse<unknown> | ApiItemResponse<unknown> {
    const doc = this.store.readFull(dataset, resource);
    const collectionKey = findCollectionKey(doc);

    if (id) {
      if (!collectionKey) {
        throw new BadRequestException("This resource is a document, not a collection");
      }
      try {
        const item = this.store.readOne(dataset, resource, id);
        return { data: item, meta: { dataset, resource } };
      } catch (e) {
        if (e instanceof NotFoundException) {
          throw e;
        }
        throw new BadRequestException(String(e));
      }
    }

    if (collectionKey) {
      const { items } = this.store.readCollection(dataset, resource);
      return {
        data: items,
        meta: { dataset, resource, total: items.length, collectionKey },
      };
    }

    return {
      data: doc,
      meta: { dataset, resource, total: 1 },
    };
  }

  create(dataset: string, resource: string, body: Record<string, unknown>): ApiItemResponse<unknown> {
    try {
      const data = this.store.create(dataset, resource, body);
      return { data, meta: { dataset, resource } };
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      if (message.includes("already exists")) {
        throw new ConflictException(message);
      }
      if (message.includes("non-collection")) {
        throw new BadRequestException(message);
      }
      throw new BadRequestException(message);
    }
  }

  replace(
    dataset: string,
    resource: string,
    id: string,
    body: Record<string, unknown>,
  ): ApiItemResponse<unknown> {
    try {
      const data = this.store.replace(dataset, resource, id, body);
      return { data, meta: { dataset, resource } };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new BadRequestException(e instanceof Error ? e.message : String(e));
    }
  }

  patch(
    dataset: string,
    resource: string,
    id: string,
    body: Record<string, unknown>,
  ): ApiItemResponse<unknown> {
    try {
      const data = this.store.patch(dataset, resource, id, body);
      return { data, meta: { dataset, resource } };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new BadRequestException(e instanceof Error ? e.message : String(e));
    }
  }

  remove(dataset: string, resource: string, id: string): { data: { id: string; deleted: true }; meta: { dataset: string; resource: string } } {
    try {
      this.store.delete(dataset, resource, id);
      return { data: { id, deleted: true }, meta: { dataset, resource } };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new BadRequestException(e instanceof Error ? e.message : String(e));
    }
  }

  resetResource(dataset: string, resource: string): { data: { reset: true }; meta: { dataset: string; resource: string } } {
    this.store.reset(dataset, resource);
    return { data: { reset: true }, meta: { dataset, resource } };
  }
}