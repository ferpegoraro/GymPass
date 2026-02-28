import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeValidateUseCase } from "@/use-cases/factories/make-validate-use-case";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateParamsSchema.parse(request.params);

  const validateCheckInUseCase = makeValidateUseCase();

  await validateCheckInUseCase.execute({
    checkInId,
  });

  return reply.status(204).send();
}
