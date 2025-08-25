import { DashboardProps } from "../types/userTypes";
import { handleApiResponse } from "../utils/ApiResponse";
import { DASHBOARD, NEXT_PUBLIC_API_URL } from "../utils/endpoints";
import api from "./api";

export async function getDashboard(): Promise<DashboardProps> {
console.log("URL da API:", NEXT_PUBLIC_API_URL + DASHBOARD);
  const response = await api.get(DASHBOARD);

  return handleApiResponse<DashboardProps>(response);
}


