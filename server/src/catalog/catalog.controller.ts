import { Controller, Get } from "@nestjs/common";
import { CatalogService } from "./catalog.service";

@Controller()
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  @Get("api/v1")
  listDatasets() {
    return this.catalog.listDatasets();
  }
}