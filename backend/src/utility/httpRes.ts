const httpResponse = {
  // 2xx - Success
  OK: {
    status: "OK",
    status_code: 200,
    message: "Permintaan berhasil diproses",
  },
  CREATED: {
    status: "Created",
    status_code: 201,
    message: "Sumber daya berhasil dibuat",
  },
  ACCEPTED: {
    status: "Accepted",
    status_code: 202,
    message: "Permintaan diterima untuk diproses",
  },
  NO_CONTENT: {
    status: "No Content",
    status_code: 204,
    message: "Tidak ada konten untuk ditampilkan",
  },

  // 4xx - Client Errors
  BAD_REQUEST: {
    status: "Bad Request",
    status_code: 400,
    message: "Permintaan tidak valid",
  },
  UNAUTHORIZED: {
    status: "Unauthorized",
    status_code: 401,
    message: "Autentikasi diperlukan",
  },
  PAYMENT_REQUIRED: {
    status: "Payment Required",
    status_code: 402,
    message: "Pembayaran diperlukan",
  },
  FORBIDDEN: {
    status: "Forbidden",
    status_code: 403,
    message: "Akses dilarang",
  },
  NOT_FOUND: {
    status: "Not Found",
    status_code: 404,
    message: "Sumber daya tidak ditemukan",
  },
  METHOD_NOT_ALLOWED: {
    status: "Method Not Allowed",
    status_code: 405,
    message: "Metode tidak diizinkan",
  },
  CONFLICT: {
    status: "Conflict",
    status_code: 409,
    message: "Terjadi konflik data",
  },
  UNPROCESSABLE_ENTITY: {
    status: "Unprocessable Entity",
    status_code: 422,
    message: "Data tidak dapat diproses",
  },
  TOO_MANY_REQUESTS: {
    status: "Too Many Requests",
    status_code: 429,
    message: "Terlalu banyak permintaan",
  },

  // 5xx - Server Errors
  INTERNAL_SERVER_ERROR: {
    status: "Internal Server Error",
    status_code: 500,
    message: "Kesalahan pada server",
  },
  NOT_IMPLEMENTED: {
    status: "Not Implemented",
    status_code: 501,
    message: "Fitur belum tersedia",
  },
  BAD_GATEWAY: {
    status: "Bad Gateway",
    status_code: 502,
    message: "Gateway bermasalah",
  },
  SERVICE_UNAVAILABLE: {
    status: "Service Unavailable",
    status_code: 503,
    message: "Layanan tidak tersedia",
  },
  GATEWAY_TIMEOUT: {
    status: "Gateway Timeout",
    status_code: 504,
    message: "Gateway tidak merespons tepat waktu",
  },
};

export default httpResponse;
