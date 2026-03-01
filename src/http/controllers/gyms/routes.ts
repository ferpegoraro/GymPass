import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { nearby } from "./nearby";
import { search } from "./search";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt());

  app.get("/gyms/nearby", nearby);
  app.get("/gyms/search", search);

  app.post("/gyms", { onRequest: [verifyUserRole("ADMIN")] }, create);
}
