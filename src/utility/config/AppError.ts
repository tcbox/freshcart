import { STATUS_CODE } from "../constants/constants";

export class ApiError extends Error {
  STATUS_CODE: number;

  constructor(message: string, STATUS_CODE: number) {
    super(message);
    this.STATUS_CODE = STATUS_CODE;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
