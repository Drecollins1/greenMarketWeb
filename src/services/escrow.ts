// services/escrow.service.ts

import ApiFetcher from "@/utils/apis";
import { toast } from "react-toastify";
import { GetOffersRequest, GetOffersResponse } from "@/types/escrow";

export const getOffers = async (
  params?: GetOffersRequest
): Promise<GetOffersResponse | null> => {
  try {
    const res = await ApiFetcher.get<GetOffersResponse>("/offers", {
      params: params || {},
    });

    return res.data;
  } catch (err) {
    console.error(err);
    toast.error("Failed to fetch escrow offers");
    return null;
  }
};

export const acceptOffer = async (offerId: number) => {
  try {
    await ApiFetcher.get(`/offers/accept/${offerId}`);
    toast.success("Offer accepted");
    return true;
  } catch {
    toast.error("Failed to accept offer");
    return false;
  }
};

export const rejectOffer = async (offerId: number) => {
  try {
    await ApiFetcher.delete(`/offers/reject/${offerId}`);
    toast.success("Offer rejected");
    return true;
  } catch {
    toast.error("Failed to reject offer");
    return false;
  }
};
