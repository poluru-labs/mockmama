import { Injectable } from "@nestjs/common";
import * as fs from "node:fs";
import * as path from "node:path";
import { AppConfigService } from "../config/app-config.service";
import { listDatasets } from "../mock/utils/mock-path.util";

@Injectable()
export class CatalogService {
  constructor(private readonly config: AppConfigService) {}

  listDatasets(): { data: Array<{ id: string; manifestVersion?: string; resourceCount: number }> } {
    const ids = listDatasets(this.config.mockRoot);
    const data = ids.map((id) => {
      const manifestPath = path.join(this.config.mockRoot, id, "manifest.json");
      let manifestVersion: string | undefined;
      if (fs.existsSync(manifestPath)) {
        try {
          const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as { version?: string };
          manifestVersion = manifest.version;
        } catch {
          manifestVersion = undefined;
        }
      }
      const resourceCount = fs
        .readdirSync(path.join(this.config.mockRoot, id))
        .filter((name) => name.endsWith(".json")).length;
      return { id, manifestVersion, resourceCount };
    });
    return { data };
  }
}