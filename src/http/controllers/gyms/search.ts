import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeSearchGymUseCase } from "@/use-cases/factories/make-search-gym-use-case";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = searchGymQuerySchema.parse(request.query);

  const searchGymUseCase = makeSearchGymUseCase();

  const { gyms } = await searchGymUseCase.execute({
    query,
    page,
  });

  return reply.status(200).send({ gyms });
}
