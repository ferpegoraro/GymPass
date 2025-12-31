import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-repository";
import { describe, it, expect } from "vitest";
import { compare } from "bcryptjs";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Authenticate Use Case", () => {
  it("should be able to authenticate an user", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "Jhon Doe",
      email: "john.doe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "john.doe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate an user with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    expect(() => {
      return sut.execute({
        email: "john.doe@example.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate an user with wrong password", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "Jhon Doe",
      email: "john.doe@example.com",
      password_hash: await hash("123456", 6),
    });

    expect(() => {
      return sut.execute({
        email: "john.doe@example.com",
        password: "654321",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
