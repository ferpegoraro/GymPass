import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createUser = await usersRepository.create({
      name: "Jhon Doe",
      email: "john.doe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createUser.id,
    });

    await expect(user.name).toEqual("Jhon Doe");
  });

  it("should not be able to get a user profile with wrong ID", async () => {
    expect(() => {
      return sut.execute({
        userId: "non-existent-id",
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
