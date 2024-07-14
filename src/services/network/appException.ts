export interface API_ERROR_TYPES {}

export class AppException extends Error {
  constructor(apiError: any) {
    super();
    if (apiError === "NETWORK") {
      this.name = "NETWORK_ERROR";
      this.message = "NETWORK";
      this.stack = "No stack trace available";
    } else {
      this.name = apiError?.response?.data?.error?.code || "Unknow error code";
      this.message =
        apiError?.response?.data?.error?.message || "Unknow error message";
      this.stack = apiError?.stack || "Unknow stack trace";
    }
  }

  toString() {
    return this.message;
  }
}
