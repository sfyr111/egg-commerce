const { SUCCESS, ERROR } = require('./responseCode');

module.exports = class ServerResponse {
  constructor(status, msg, data) {
    this.status = status;
    this.msg = msg;
    this.data = data;
  }

  isSuccess() {
    return this.status === SUCCESS;
  }

  getStatus() {
    return this.status;
  }

  getData() {
    return this.data;
  }

  getMsg() {
    return this.msg;
  }

  static createBySuccess() {
    return new ServerResponse(SUCCESS);
  }

  static createBySuccessMsg(msg) {
    return new ServerResponse(SUCCESS, msg, null);
  }

  static createBySuccessData(data) {
    return new ServerResponse(SUCCESS, null, data);
  }

  static createBySuccessMsgAndData(msg, data) {
    return new ServerResponse(SUCCESS, msg, data);
  }

  static createByError() {
    return new ServerResponse(ERROR, 'error', null);
  }

  static createByErrorMsg(errorMsg) {
    return new ServerResponse(ERROR, errorMsg, null);
  }

  static createByErrorCodeMsg(errorCode, errorMsg) {
    return new ServerResponse(errorCode, errorMsg, null);
  }
};
