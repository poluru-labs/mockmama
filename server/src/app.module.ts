import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/config.module";
import { HealthModule } from "./health/health.module";
import { CatalogModule } from "./catalog/catalog.module";
import { MockModule } from "./mock/mock.module";

@Module({
  imports: [ConfigModule, HealthModule, CatalogModule, MockModule],
})
export class AppModule {}