import request from "supertest";
import { app } from "@/app";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Search gyms E2E,", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search gyms by distance", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Near Gym",
        description: "some description",
        phone: "1234567",
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Far Gym",
        description: "some description",
        phone: "1234567",
        latitude: -27.0610928,
        longitude: -49.5229501,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Near Gym",
      }),
    ]);
  });
});
