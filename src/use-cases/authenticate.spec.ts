import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { compare } from "bcryptjs";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate an user", async () => {
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
    expect(() => {
      return sut.execute({
        email: "john.doe@example.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate an user with wrong password", async () => {
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
