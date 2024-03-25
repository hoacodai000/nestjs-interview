export enum ResponseStatus {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export enum FailureStatus {
  REFUSE = 'REFUSE',
  SERVICE_NOT_FOUND = 'SERVICE_NOT_FOUND',
  EXCEPTION = 'EXCEPTION',
  INVALID_SESSION = 'INVALID_SESSION',
}

export class FailureData {
  private errorcode!: string;
  private message!: string;

  constructor(errorcode: string, message: string) {
    this.errorcode = errorcode;
    this.message = message;
  }

  getErrorcode(): string {
    return this.errorcode;
  }

  setErrorcode(errorcode: string): void {
    this.errorcode = errorcode;
  }

  getMessage(): string {
    return this.message;
  }

  setMessage(message: string): void {
    this.message = message;
  }

  static getRefuseData(message: string): FailureData {
    return new FailureData(FailureStatus.REFUSE, message);
  }

  static getPageNotFoundData(message: string): FailureData {
    return new FailureData(FailureStatus.SERVICE_NOT_FOUND, message);
  }

  static getExceptionData(message: string): FailureData {
    return new FailureData(FailureStatus.EXCEPTION, message);
  }

  static getInvalidSessionData(message: string): FailureData {
    return new FailureData(FailureStatus.INVALID_SESSION, message);
  }
}


export class ResponseData<T> {
  private status!: string;
  private data: T | null = null;

  public toString(): string {
    return "ResponseData [status=" + this.status + ", data=" + this.data + "]";
  }

  constructor(status: string, data: T) {
    this.setStatus(status);
    this.setData(data);
  }

  public getData(): T | null {
    return this.data;
  }

  public setData(data: T | null): void {
    this.data = data;
  }

  public getStatus(): string {
    return this.status;
  }

  public setStatus(status: string): void {
    this.status = status;
  }

  static getSuccessData<T>(data: T): ResponseData<T> {
    return new ResponseData<T>(ResponseStatus.SUCCESS, data);
  }

  static getFailureData(data: FailureData): ResponseData<FailureData> {
    return new ResponseData(ResponseStatus.FAILURE, data);
  }
}