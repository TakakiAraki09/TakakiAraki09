export class UnreachableError extends Error {
  constructor(message?: never) {
    super(`This code should be unreachable. ${message ?? ""}`);
    this.name = "UnreachableError";
  }
}
