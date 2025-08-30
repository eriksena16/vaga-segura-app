import { CostumerProps, PaymentProps } from "../types/userTypes";
import { handleApiResponse } from "../utils/ApiResponse";
import { COSTUMERS, NEXT_PUBLIC_API_URL, PAYMENTS } from "../utils/endpoints";
import api from "./api";

export async function getCostumers(params?: { paid?: boolean }): Promise<CostumerProps[]> {
  // Monta a URL completa com query string, se houver filtro
  const query = params?.paid !== undefined ? `?paid=${params.paid}` : "";
  const fullUrl = NEXT_PUBLIC_API_URL + COSTUMERS + query;

  console.log("URL da API:", fullUrl);

  const response = await api.get(COSTUMERS, {
    params: {
      paid: params?.paid
    }
  });

  return handleApiResponse<CostumerProps[]>(response);
}

export async function getPayments(params?: { paid?: boolean }): Promise<PaymentProps[]> {
  // Monta a URL completa com query string, se houver filtro
  const query = params?.paid !== undefined ? `?paid=${params.paid}` : "";
  const fullUrl = NEXT_PUBLIC_API_URL + PAYMENTS + query;

  console.log("URL da API:", fullUrl);

  const response = await api.get(PAYMENTS, {
    params: {
      paid: params?.paid
    }
  });

  return handleApiResponse<PaymentProps[]>(response);
}

export async function confirmePayment(data: { costumerId?: string; paymentId: string }): Promise<void> {
  try {

    const url = `/costumer/${data.costumerId}/payment-confirm/${data.paymentId}`;

    console.log("URL da API para confirmar pagamento:", NEXT_PUBLIC_API_URL + url);

    const response = await api.post(url, {
      costumerId: data.costumerId,
      paymentId: data.paymentId,
    });
    
    return handleApiResponse<void>(response);
  } catch (error) {
    console.error("Erro ao confirmar pagamento:", error);
    throw error;
  }
}
