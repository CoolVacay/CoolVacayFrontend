export class FetchError extends Error {
  constructor(
    public error?: string,
    public status?: number,
  ) {
    super(error);
    this.status = status;
    this.name = "FetchError";
  }
}

export interface ErrorInterface {
  error: string;
  message: string;
}
