import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiAxios } from "../lib/api/apiAxios";
import type { Order } from "../types/order.type";
import { promiseToast} from "../utils/sileo";
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
    mutationFn: async ({
      orderId,
      paymentMethod
     }:{
      orderId:string;
      paymentMethod:string;
     }) => {
     
      return apiAxios(
        `/orders/${orderId}/mark-paid`,
        {
          method:"PATCH",
          data:{
            payment_method: paymentMethod
          }
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

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["orders"],
        exact: false
      });
    }
  });

  const runOrderAction = async (
    orderId: string,
    action: OrderAction,
    paymentMethod?: string
  ) => {
  
    if (action === "paid") {
      return promiseToast(
        markOrderPaid.mutateAsync({
          orderId,
          paymentMethod: paymentMethod || "COD"
        }),
  
        "top-center",
  
        () => {
          queryClient.invalidateQueries({
            queryKey: ["orders"],
            exact: false
          });
        },
  
        "Order marked as paid"
      );
    }
  
    return promiseToast(
      updateOrderStatus.mutateAsync({
        orderId,
        status: action
      }),
  
      "top-center",
  
      () => {
        queryClient.invalidateQueries({
          queryKey: ["orders"],
          exact: false
        });
      },
  
      `Order marked as ${action}`
    );
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