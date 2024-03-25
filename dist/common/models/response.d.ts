export declare enum ResponseStatus {
    SUCCESS = "SUCCESS",
    FAILURE = "FAILURE"
}
export declare enum FailureStatus {
    REFUSE = "REFUSE",
    SERVICE_NOT_FOUND = "SERVICE_NOT_FOUND",
    EXCEPTION = "EXCEPTION",
    INVALID_SESSION = "INVALID_SESSION"
}
export declare class FailureData {
    private errorcode;
    private message;
    constructor(errorcode: string, message: string);
    getErrorcode(): string;
    setErrorcode(errorcode: string): void;
    getMessage(): string;
    setMessage(message: string): void;
    static getRefuseData(message: string): FailureData;
    static getPageNotFoundData(message: string): FailureData;
    static getExceptionData(message: string): FailureData;
    static getInvalidSessionData(message: string): FailureData;
}
export declare class ResponseData<T> {
    private status;
    private data;
    toString(): string;
    constructor(status: string, data: T);
    getData(): T | null;
    setData(data: T | null): void;
    getStatus(): string;
    setStatus(status: string): void;
    static getSuccessData<T>(data: T): ResponseData<T>;
    static getFailureData(data: FailureData): ResponseData<FailureData>;
}
