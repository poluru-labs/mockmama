import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApiExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: "Internal server error" };

    const body =
      typeof message === "string"
        ? { error: { code: HttpStatus[status] ?? "ERROR", message } }
        : {
            error: {
              code: HttpStatus[status] ?? "ERROR",
              message:
                (message as { message?: string | string[] }).message ?? "Request failed",
              details: (message as { error?: string }).error,
            },
          };

    if (status >= 500) {
      this.logger.error(exception);
    }

    response.status(status).json({
      ...body,
      path: request.path,
      timestamp: new Date().toISOString(),
    });
  }
}