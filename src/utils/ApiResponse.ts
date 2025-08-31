import {
  ApiResponse,
} from "../types/apiType";

function extractApiErrors<T>(res: ApiResponse<T>): string {
  return [
    ...(res.reasons ?? []),
  ].join(", ") || "Unknown error";
}

export function handleApiResponse<T>(response: { data: ApiResponse<T> }) {
  if (!response.data.success) {
    console.error("Erro na API:", extractApiErrors(response.data));
    throw new Error(extractApiErrors(response.data));
  }
  return response.data.data as T;
}

