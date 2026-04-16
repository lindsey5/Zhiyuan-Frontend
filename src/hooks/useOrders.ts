import { useQuery } from "@tanstack/react-query";
import { apiAxios } from "../lib/api/apiAxios"; 
import type { Order } from "../pages/dashboard/Orders";
import type { PaginationResponse } from "../types/pagination.type";

export interface OrderQueryParams {
  search?: string;
  page?: number;
  status?: "pending" | "processing" | "completed" | "cancelled";
  payment_status?: "paid" | "unpaid";
  delivery_type?: "pickup" | "delivery";
}


interface OrdersResponse extends PaginationResponse{
  orders: Order[]
}


export const useOrders = (params: OrderQueryParams) => {
  return useQuery<OrdersResponse, Error>({
    queryKey: ["orders", params],
    queryFn: async () => apiAxios<OrdersResponse>("/orders", {
        method: "GET",
        params,
    }),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
  });
};