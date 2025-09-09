import { CustomerProps, ParkingProps, PaymentProps } from "../types/userTypes";
import { handleApiResponse } from "../utils/ApiResponse";
import * as Endpoints from "../utils/endpoints";
import api from "./api";

export async function getCustomers(params?: { paid?: boolean }): Promise<CustomerProps[]> {
  // Monta a URL completa com query string, se houver filtro
  const query = params?.paid !== undefined ? `?paid=${params.paid}` : "";
  const fullUrl = Endpoints.NEXT_PUBLIC_API_URL + Endpoints.CUSTOMERS + query;

  console.log("URL da API:", fullUrl);

  const response = await api.get(Endpoints.CUSTOMERS, {
    params: {
      paid: params?.paid
    }
  });

  return handleApiResponse<CustomerProps[]>(response);
}

export async function getParkings(params?: { available?: boolean }): Promise<ParkingProps[]> {

  // Monta a URL completa com query string, se houver filtro
  const query = params?.available !== undefined ? `?available=${params.available}` : "";
  const fullUrl = Endpoints.NEXT_PUBLIC_API_URL + Endpoints.PARKINGS + query;

  console.log("URL da API:", fullUrl);

  const response = await api.get(Endpoints.PARKINGS, {
    params: {
      available: params?.available
    }
  });

  return handleApiResponse<ParkingProps[]>(response);
}


export async function getPayments(params?: { paid?: boolean }): Promise<PaymentProps[]> {
  // Monta a URL completa com query string, se houver filtro
  const query = params?.paid !== undefined ? `?paid=${params.paid}` : "";
  const fullUrl = Endpoints.NEXT_PUBLIC_API_URL + Endpoints.PAYMENTS + query;

  console.log("URL da API:", fullUrl);

  const response = await api.get(Endpoints.PAYMENTS, {
    params: {
      paid: params?.paid
    }
  });

  return handleApiResponse<PaymentProps[]>(response);
}

export async function confirmePayment(data: { customerId?: string; paymentId: string }): Promise<void> {
  try {

    const url = `/customer/${data.customerId}/payment-confirm/${data.paymentId}`;

    console.log("URL da API:", Endpoints.NEXT_PUBLIC_API_URL + url);

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
export async function createCustomer(data: CustomerProps ): Promise<void> {
    try {

      console.log("URL da API:", Endpoints.NEXT_PUBLIC_API_URL + Endpoints.CREATE_CUSTOMER);

      const response = await api.post(Endpoints.CREATE_CUSTOMER, data);
      
      return handleApiResponse<void>(response);
    }
    catch (error: any) {
      throw error;
    }
  }
  export async function createParking(data: { numeroVaga: string; }): Promise<void> {
    try {

      console.log("URL da API:", Endpoints.NEXT_PUBLIC_API_URL + Endpoints.CREATE_PARKING);

      const response = await api.post(Endpoints.CREATE_PARKING, {
        number: data.numeroVaga
      });
      return handleApiResponse<void>(response);
    }
    catch (error: any) {
      throw error;
    }
  }

    export async function createParkingSpots(data: { startNumber: string; endNumber: string; }): Promise<void> {
    try {

      console.log("URL da API:", Endpoints.NEXT_PUBLIC_API_URL + Endpoints.CREATE_PARKING_SPOT);

      const response = await api.post(Endpoints.CREATE_PARKING_SPOT, {
        startNumber: data.startNumber,
        endNumber: data.endNumber
      });
      return handleApiResponse<void>(response);
    }
    catch (error: any) {
      throw error;
    }
  }

