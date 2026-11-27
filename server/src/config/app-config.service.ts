import { Injectable } from "@nestjs/common";
import * as path from "node:path";

@Injectable()
export class AppConfigService {
  readonly mockRoot: string;
  readonly apiPrefix = "api/v1";
  readonly port: number;

  constructor() {
    const fromEnv = process.env.MOCK_ROOT;
    this.mockRoot = fromEnv
      ? path.resolve(fromEnv)
      : path.resolve(process.cwd(), "..", "mock");
    this.port = Number(process.env.PORT ?? 3000);
  }
}