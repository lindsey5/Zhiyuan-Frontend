import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import LoginPage from "../pages/auth/Login";
import DashboardLayout from "../pages/DashboardLayout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import AccountSettings from "../pages/dashboard/AccountSettings";

const router = createBrowserRouter([
    {
        index: true,
        Component: () => <LoginPage />
    },
    {
        path: '/dashboard',
        Component: () => (
            <ProtectedRoute 
                requireAuthentication 
            >
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                Component: () => <Dashboard />,
            },
            {
                path: 'account',
                Component: () => <AccountSettings />,
            }
        ]
    },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}