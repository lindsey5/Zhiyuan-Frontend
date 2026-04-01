import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DistributorAuthState } from "../../types/auth.type";
import { type Distributor } from "../../types/distributor.type";

export const useDistributorAuthStore = create<DistributorAuthState>()(
  persist(
    (set, get) => ({
      distributor: null,
      accessToken: null,
      refreshToken: null,


      setAuth: (accessToken: string, refreshToken : string) => {
        set({
          accessToken,
          refreshToken,
        });
      },

      setDistributor: (distributor : Distributor) => set({ distributor }),
      isAuthenticated: () => {
        const { distributor, accessToken } = get();
        return !!(distributor && accessToken);
      },

      logout: () => {
        window.location.reload();
        set({
          distributor: null,
          accessToken: null,
          refreshToken: null,
        });
      },
    }),
    {
      name: "distributor-auth-storage",
    }
  )
);