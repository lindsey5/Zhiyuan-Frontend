import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { apiAxios } from "../lib/api/apiAxios"; 
import type { Order } from "../pages/dashboard/Orders";

export interface OrderQueryParams {
  search?: string;
  page?: number;
  status?: "pending" | "processing" | "completed" | "cancelled";
  payment_status?: "paid" | "unpaid";
  delivery_type?: "pickup" | "delivery";
}

type OrdersResponse = {
  data: Order[];
};

export const useOrders = (params: OrderQueryParams) => {
  return useQuery<Order[]>({
    queryKey: ["orders", params],
    queryFn: async () => {
      const res = await apiAxios<OrdersResponse>("/orders", {
        method: "GET",
        params,
      });

      return res.data; 
    },
    keepPreviousData: true,
  } as UseQueryOptions<Order[], Error>);
};