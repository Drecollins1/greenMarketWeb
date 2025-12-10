import ApiFetcher from "@/utils/apis";
import { toast } from "react-toastify";
import { GetOrdersRequest, GetOrdersResponse } from "../types/orders";

// GET ALL OFFERS (with optional parameters)
export const getOrders = async (
  params?: GetOrdersRequest
): Promise<GetOrdersResponse | null> => {
  try {
    const response = await ApiFetcher.get<GetOrdersResponse>(`/offers`, {
      params: params || {}
    });

    if (response?.data) {
      return response.data; 
    }

    toast.error("Failed to load offers");
    return null;
  } catch (error) {
    console.error("Error fetching offers:", error);
    toast.error("Error fetching offers");
    return null;
  }
};
