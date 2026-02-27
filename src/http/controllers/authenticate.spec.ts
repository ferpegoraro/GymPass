import request from "supertest";
import { app } from "@/app";
import { describe, expect, it, beforeAll, afterAll, beforeEach } from "vitest";
import { prisma } from "@/lib/prisma";

describe("Authenticate E2E,", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it("should be able to authenticate", async () => {
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456",
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "john.doe@example.com",
      password: "123456",
    });

    expect(authResponse.statusCode).toBe(200);
    expect(authResponse.body).toHaveProperty("token");
  });
});
