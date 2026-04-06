import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useOrders = (params: any) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: async () => {
      const { data } = await axios.get("/api/orders", { params });

      return data.data;
    },
    keepPreviousData: true,
  });
};