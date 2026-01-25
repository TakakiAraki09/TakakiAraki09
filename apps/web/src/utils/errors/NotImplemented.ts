export class NotImplementedError extends Error {
  constructor(message?: string) {
    super(`This feature is not implemented yet. ${message ?? ""}`);
    this.name = "NotImplementedError";
  }
}
