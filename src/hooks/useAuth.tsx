import { useMutation } from "@tanstack/react-query"
import { authService } from "../service/authService"
import { useAuthStore } from "../store/authStore"
import { useNavigate } from "react-router-dom"

export const useAuth = () => {

  const { setAuth, logout, setErrorMessage } = useAuthStore(); 
  const navigate = useNavigate()

  const login = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      console.log(data); //print the response temporarily 
      setAuth(data.user, data.token, data.permissions) //update this base on the response of the backend
      navigate("dashboard") //change the path accordingly
    },
    onError: (error) => {
      setErrorMessage(error.message); //the backend should return json({ message: 'Invalid Credential' })
    }
  })

  const logoutMutate = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logout()
      navigate("/");
    },
  })

  return {
    login,
    logoutMutate,
  }
}