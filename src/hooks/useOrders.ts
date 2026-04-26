import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { apiAxios } from "../lib/api/apiAxios";
import type { Order } from "../types/order.type";
import type { PaginationResponse } from "../types/pagination.type";

export interface OrderQueryParams {
  search?: string;
  page?: number;
  limit?: number;
  status?:
    | "pending"
    | "processing"
    | "delivered"
    | "completed"
    | "cancelled"
    | "refunded";

  payment_status?: "paid" | "unpaid";

  delivery_type?: "pickup" | "delivery";
}

interface OrdersResponse extends PaginationResponse {
  orders: Order[];
}


/* ------------------------
   Orders Query
------------------------- */

export const useOrders = (
  params: OrderQueryParams
) => {

  return useQuery<OrdersResponse, Error>({
    queryKey: ["orders", params],

    queryFn: async () =>
      apiAxios<OrdersResponse>("/orders", {
        method: "GET",
        params,
      }),

    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
  });
};


type OrderAction =
  | "paid"
  | "processing"
  | "delivered"
  | "completed"
  | "cancelled"
  | "refunded";


export const useOrderActions = () => {
  const queryClient = useQueryClient();

  const markOrderPaid = useMutation({
    mutationFn: async (orderId: string) => {
      return apiAxios(
        `/orders/${orderId}/mark-paid`,
        {
          method: "PATCH"
        }
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"]
      });
    }
  });


  const updateOrderStatus = useMutation({
    mutationFn: async ({
      orderId,
      status
    }: {
      orderId: string;
      status: Exclude<OrderAction, "paid">;
    }) => {

      return apiAxios(
        `/orders/${orderId}/status`,
        {
          method: "PATCH",
          data: { status }
        }
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"]
      });
    }
  });

  const runOrderAction = async (
    orderId: string,
    action: OrderAction
  ) => {

    if (action === "paid") {
      return markOrderPaid.mutateAsync(orderId);
    }

    return updateOrderStatus.mutateAsync({
      orderId,
      status: action
    });
  };


  return {
    markOrderPaid,
    updateOrderStatus,
    runOrderAction,

    isPending:
      markOrderPaid.isPending ||
      updateOrderStatus.isPending
  };
};