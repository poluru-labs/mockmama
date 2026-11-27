import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { AppConfigService } from "../src/config/app-config.service";
import * as path from "node:path";

describe("Mock API (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AppConfigService)
      .useValue({
        mockRoot: path.resolve(__dirname, "..", "..", "mock"),
        apiPrefix: "api/v1",
        port: 0,
      })
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /health", () => {
    return request(app.getHttpServer()).get("/health").expect(200).expect(({ body }) => {
      expect(body.status).toBe("ok");
    });
  });

  it("GET /api/v1 lists datasets", () => {
    return request(app.getHttpServer()).get("/api/v1").expect(200).expect(({ body }) => {
      expect(Array.isArray(body.data)).toBe(true);
      expect(body.data.some((d: { id: string }) => d.id === "ai-course-creator")).toBe(true);
    });
  });

  it("GET /api/v1/ai-course-creator/activity", () => {
    return request(app.getHttpServer())
      .get("/api/v1/ai-course-creator/activity")
      .expect(200)
      .expect(({ body }) => {
        expect(body.meta.resource).toBe("activity");
        expect(body.data.length).toBeGreaterThan(0);
      });
  });

  it("GET /api/v1/ai-course-creator/activity/act_001", () => {
    return request(app.getHttpServer())
      .get("/api/v1/ai-course-creator/activity/act_001")
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.id).toBe("act_001");
      });
  });

  it("POST then DELETE item (in-memory)", async () => {
    const created = await request(app.getHttpServer())
      .post("/api/v1/ai-course-creator/activity")
      .send({
        id: "act_mock_e2e",
        actorId: "user_ld_001",
        verb: "tested",
        objectType: "activity",
        objectId: "act_mock_e2e",
        occurredAt: new Date().toISOString(),
      })
      .expect(201);

    expect(created.body.data.id).toBe("act_mock_e2e");

    await request(app.getHttpServer())
      .delete("/api/v1/ai-course-creator/activity/act_mock_e2e")
      .expect(200);

    await request(app.getHttpServer())
      .get("/api/v1/ai-course-creator/activity/act_mock_e2e")
      .expect(404);
  });
});