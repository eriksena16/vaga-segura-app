import { CostumerProps } from "../types/userTypes";
import { handleApiResponse } from "../utils/ApiResponse";
import { COSTUMERS, NEXT_PUBLIC_API_URL } from "../utils/endpoints";
import api from "./api";

export async function getCostumers(params?: { paid?: boolean }): Promise<CostumerProps[]> {
  // Monta a URL completa com query string, se houver filtro
  const query = params?.paid !== undefined ? `?paid=${params.paid}` : "";
  const fullUrl = NEXT_PUBLIC_API_URL + COSTUMERS + query;

  console.log("URL da API:", fullUrl);
  console.log("Parâmetro 'paid':", params?.paid);

  // Faz a requisição passando os params (Axios converte automaticamente em query string)
  const response = await api.get(COSTUMERS, {
    params: {
      paid: params?.paid
    }
  });

  return handleApiResponse<CostumerProps[]>(response);
}



