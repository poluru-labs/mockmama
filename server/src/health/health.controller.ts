import { Controller, Get } from "@nestjs/common";
import { AppConfigService } from "../config/app-config.service";

@Controller("health")
export class HealthController {
  constructor(private readonly config: AppConfigService) {}

  @Get()
  check() {
    return {
      status: "ok",
      mockRoot: this.config.mockRoot,
      uptimeSec: Math.floor(process.uptime()),
    };
  }
}