import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface OrderQueryParams {
  search?: string;
  page?: number;
  status?: "pending" | "processing" | "completed" | "cancelled";
  payment_status?: "paid" | "unpaid";
  delivery_type?: "pickup" | "delivery";
}

export const useOrders = (params: OrderQueryParams) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: async () => {
      const { data } = await axios.get("/api/orders", { params });
      return data.data;
    },
    keepPreviousData: true,
  });
};