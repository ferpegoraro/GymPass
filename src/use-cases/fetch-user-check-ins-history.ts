import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface FetchUserCheckInshistoryUseCaseRequest {
  userId: string;
  page: number;
}

type FetchUserCheckInshistoryUseCaseResponse = {
  checkIns: CheckIn[];
};

export class FetchUserCheckInshistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInshistoryUseCaseRequest): Promise<FetchUserCheckInshistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    return {
      checkIns,
    };
  }
}
