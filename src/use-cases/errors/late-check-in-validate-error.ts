export class LateCheckInValidateError extends Error {
  constructor() {
    super("Check-in cannot be validated after 20 minutes of its creation");
  }
}
