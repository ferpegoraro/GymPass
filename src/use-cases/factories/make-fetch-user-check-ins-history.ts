import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";
import { FetchUserCheckInshistoryUseCase } from "../fetch-user-check-ins-history";

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInRepository();
  const useCase = new FetchUserCheckInshistoryUseCase(checkInsRepository);

  return useCase;
}
