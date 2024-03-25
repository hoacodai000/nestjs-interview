"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseData = exports.FailureData = exports.FailureStatus = exports.ResponseStatus = void 0;
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus["SUCCESS"] = "SUCCESS";
    ResponseStatus["FAILURE"] = "FAILURE";
})(ResponseStatus || (exports.ResponseStatus = ResponseStatus = {}));
var FailureStatus;
(function (FailureStatus) {
    FailureStatus["REFUSE"] = "REFUSE";
    FailureStatus["SERVICE_NOT_FOUND"] = "SERVICE_NOT_FOUND";
    FailureStatus["EXCEPTION"] = "EXCEPTION";
    FailureStatus["INVALID_SESSION"] = "INVALID_SESSION";
})(FailureStatus || (exports.FailureStatus = FailureStatus = {}));
class FailureData {
    constructor(errorcode, message) {
        this.errorcode = errorcode;
        this.message = message;
    }
    getErrorcode() {
        return this.errorcode;
    }
    setErrorcode(errorcode) {
        this.errorcode = errorcode;
    }
    getMessage() {
        return this.message;
    }
    setMessage(message) {
        this.message = message;
    }
    static getRefuseData(message) {
        return new FailureData(FailureStatus.REFUSE, message);
    }
    static getPageNotFoundData(message) {
        return new FailureData(FailureStatus.SERVICE_NOT_FOUND, message);
    }
    static getExceptionData(message) {
        return new FailureData(FailureStatus.EXCEPTION, message);
    }
    static getInvalidSessionData(message) {
        return new FailureData(FailureStatus.INVALID_SESSION, message);
    }
}
exports.FailureData = FailureData;
class ResponseData {
    toString() {
        return "ResponseData [status=" + this.status + ", data=" + this.data + "]";
    }
    constructor(status, data) {
        this.data = null;
        this.setStatus(status);
        this.setData(data);
    }
    getData() {
        return this.data;
    }
    setData(data) {
        this.data = data;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    static getSuccessData(data) {
        return new ResponseData(ResponseStatus.SUCCESS, data);
    }
    static getFailureData(data) {
        return new ResponseData(ResponseStatus.FAILURE, data);
    }
}
exports.ResponseData = ResponseData;
//# sourceMappingURL=response.js.map