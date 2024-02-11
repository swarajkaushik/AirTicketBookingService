class AppError extends Error {
  constructor(name, explaination, statusCode, message) {
    super();
    this.name = name;
    this.message = message;
    this.explaination = explaination;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
