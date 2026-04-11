import { useMutation } from "@tanstack/react-query";
import { authService } from "../service/authService";
import { useAuthStore } from "../lib/store/authStore";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { setAuth, setUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const login = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setAuth(data.token.accessToken, data.token.refreshToken);
      setUser(data.user);
      navigate("dashboard");
    },
  });

  const logoutMutate = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logout();
      navigate("/");
    },
  });

  return {
    login,
    logoutMutate,
  };
};
