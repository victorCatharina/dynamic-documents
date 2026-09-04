export interface ApiResponse<T> {
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface ApiErrorResponse {
  statusCode: number;
  code?: string;
  message: string | string[];
  errors?: {
    field?: string;
    code?: string;
    message?: string;
  }[];
  timestamp?: string;
  path?: string;
}
