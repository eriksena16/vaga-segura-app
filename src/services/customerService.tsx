import { CustomerProps, ParkingProps, PaymentProps } from "../types/userTypes";
import { handleApiResponse } from "../utils/ApiResponse";
import { CUSTOMERS, NEXT_PUBLIC_API_URL, PARKINGS, PAYMENTS } from "../utils/endpoints";
import api from "./api";

export async function getCustomers(params?: { paid?: boolean }): Promise<CustomerProps[]> {
  // Monta a URL completa com query string, se houver filtro
  const query = params?.paid !== undefined ? `?paid=${params.paid}` : "";
  const fullUrl = NEXT_PUBLIC_API_URL + CUSTOMERS + query;

  console.log("URL da API:", fullUrl);

  const response = await api.get(CUSTOMERS, {
    params: {
      paid: params?.paid
    }
  });

  return handleApiResponse<CustomerProps[]>(response);
}

export async function getParkings(params?: { available?: boolean }): Promise<ParkingProps[]> {

    // Monta a URL completa com query string, se houver filtro
  const query = params?.available !== undefined ? `?available=${params.available}` : "";
  const fullUrl = NEXT_PUBLIC_API_URL + PARKINGS + query;

  console.log("URL da API:", fullUrl);

  const response = await api.get(PARKINGS, {
    params: {
      available: params?.available
    }
  });

  return handleApiResponse<ParkingProps[]>(response);
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

export async function confirmePayment(data: { customerId?: string; paymentId: string }): Promise<void> {
  try {

    const url = `/customer/${data.customerId}/payment-confirm/${data.paymentId}`;

    console.log("URL da API:", NEXT_PUBLIC_API_URL + url);

    const response = await api.post(url, {
      customerId: data.customerId,
      paymentId: data.paymentId,
    });
    return handleApiResponse<void>(response);
  }
  catch (error: any) {
    throw error;
  }

}

