import ApiFetcher from "@/utils/apis";
import { toast } from "react-toastify";
import { GetOffersRequest, GetOffersResponse } from "../types/escrow";

// GET ALL OFFERS (with optional parameters)
export const getOffers = async (
  params?: GetOffersRequest
): Promise<GetOffersResponse | null> => {
  try {
    const response = await ApiFetcher.get<GetOffersResponse>(`/offers`, {
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
