const httpResponse = {
  // 2xx - Success
  OK: {
    status: "OK",
    status_code: 200,
    message: "The request was successfully processed.",
  },
  CREATED: {
    status: "Created",
    status_code: 201,
    message: "The resource was successfully created.",
  },
  ACCEPTED: {
    status: "Accepted",
    status_code: 202,
    message: "The request has been accepted for processing.",
  },
  NO_CONTENT: {
    status: "No Content",
    status_code: 204,
    message: "The request was successful but there is no content to return.",
  },

  // 4xx - Client Errors
  BAD_REQUEST: {
    status: "Bad Request",
    status_code: 400,
    message: "The request is invalid or malformed.",
  },
  UNAUTHORIZED: {
    status: "Unauthorized",
    status_code: 401,
    message: "Authentication is required or has failed.",
  },
  PAYMENT_REQUIRED: {
    status: "Payment Required",
    status_code: 402,
    message: "Payment is required to proceed.",
  },
  FORBIDDEN: {
    status: "Forbidden",
    status_code: 403,
    message: "You do not have permission to access this resource.",
  },
  NOT_FOUND: {
    status: "Not Found",
    status_code: 404,
    message: "The requested resource could not be found.",
  },
  METHOD_NOT_ALLOWED: {
    status: "Method Not Allowed",
    status_code: 405,
    message: "The HTTP method is not allowed for this resource.",
  },
  CONFLICT: {
    status: "Conflict",
    status_code: 409,
    message: "A conflict occurred with the current state of the resource.",
  },
  UNPROCESSABLE_ENTITY: {
    status: "Unprocessable Entity",
    status_code: 422,
    message: "The request was well-formed but contains semantic errors.",
  },
  TOO_MANY_REQUESTS: {
    status: "Too Many Requests",
    status_code: 429,
    message: "You have sent too many requests in a given amount of time.",
  },

  // 5xx - Server Errors
  INTERNAL_SERVER_ERROR: {
    status: "Internal Server Error",
    status_code: 500,
    message: "An unexpected error occurred on the server.",
  },
  NOT_IMPLEMENTED: {
    status: "Not Implemented",
    status_code: 501,
    message: "The requested functionality is not supported by the server.",
  },
  BAD_GATEWAY: {
    status: "Bad Gateway",
    status_code: 502,
    message:
      "The server received an invalid response from the upstream server.",
  },
  SERVICE_UNAVAILABLE: {
    status: "Service Unavailable",
    status_code: 503,
    message: "The server is currently unable to handle the request.",
  },
  GATEWAY_TIMEOUT: {
    status: "Gateway Timeout",
    status_code: 504,
    message: "The upstream server failed to send a timely response.",
  },
};

export default httpResponse;
