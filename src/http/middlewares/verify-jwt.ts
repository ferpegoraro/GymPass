import { FastifyRequest, FastifyReply } from "fastify";

export function verifyJwt() {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      return reply.status(401).send({
        message: "Unauthorized",
      });
    }
  };
}
