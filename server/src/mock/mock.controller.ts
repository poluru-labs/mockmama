import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Put,
  Req,
  Res,
} from "@nestjs/common";
import { Request, Response } from "express";
import { parseMockPath } from "./utils/mock-path.util";
import { MockService } from "./mock.service";

@Controller("api/v1")
export class MockController {
  constructor(private readonly mockService: MockService) {}

  private relativePath(req: Request): string {
    const url = req.originalUrl.split("?")[0] ?? req.path;
    const marker = "/api/v1/";
    const idx = url.indexOf(marker);
    if (idx === -1) {
      return "";
    }
    return url.slice(idx + marker.length);
  }

  @Get("*path")
  get(@Req() req: Request, @Res() res: Response) {
    const relative = this.relativePath(req);
    if (!relative) {
      res.status(HttpStatus.NOT_FOUND).json({ error: { message: "Specify a dataset and resource" } });
      return;
    }
    const segments = relative.split("/").filter(Boolean);
    if (segments.length === 1) {
      const dataset = segments[0]!;
      const payload = this.mockService.listResources(dataset);
      res.status(HttpStatus.OK).json(payload);
      return;
    }

    const route = parseMockPath(relative);
    const payload = this.mockService.getDataset(route.dataset, route.resource, route.id);
    res.status(HttpStatus.OK).json(payload);
  }

  @Post("*path")
  @HttpCode(HttpStatus.CREATED)
  post(@Req() req: Request, @Body() body: Record<string, unknown>) {
    const route = parseMockPath(this.relativePath(req));
    if (route.id) {
      throw new BadRequestException("Use PUT/PATCH on item routes");
    }
    return this.mockService.create(route.dataset, route.resource, body);
  }

  @Put("*path")
  put(@Req() req: Request, @Body() body: Record<string, unknown>) {
    const route = parseMockPath(this.relativePath(req));
    if (!route.id) {
      throw new BadRequestException("PUT requires /{dataset}/{resource}/{id}");
    }
    return this.mockService.replace(route.dataset, route.resource, route.id, body);
  }

  @Patch("*path")
  patch(@Req() req: Request, @Body() body: Record<string, unknown>) {
    const route = parseMockPath(this.relativePath(req));
    if (!route.id) {
      throw new BadRequestException("PATCH requires /{dataset}/{resource}/{id}");
    }
    return this.mockService.patch(route.dataset, route.resource, route.id, body);
  }

  @Delete("*path")
  @HttpCode(HttpStatus.OK)
  delete(@Req() req: Request) {
    const route = parseMockPath(this.relativePath(req));
    if (route.id) {
      return this.mockService.remove(route.dataset, route.resource, route.id);
    }
    return this.mockService.resetResource(route.dataset, route.resource);
  }
}