import request from "supertest";
import { app } from "@/app";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { prisma } from "@/lib/prisma";

describe("Register E2E,", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to register", async () => {
    const response = await request(app.server).post("/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(201);
  });
});
