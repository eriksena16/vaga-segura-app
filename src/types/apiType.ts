
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  reasons?: string[];
};