import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { ApiExceptionFilter } from "../common/filters/api-exception.filter";
import { MockController } from "./mock.controller";
import { MockService } from "./mock.service";
import { MockStoreService } from "./mock-store.service";

@Module({
  controllers: [MockController],
  providers: [
    MockStoreService,
    MockService,
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter,
    },
  ],
})
export class MockModule {}