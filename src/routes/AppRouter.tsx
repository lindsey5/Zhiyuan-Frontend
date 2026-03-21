import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import LoginPage from "../pages/auth/Login";
import DashboardLayout from "../pages/DashboardLayout";
import { ProtectedRoute } from "../components/ProtectedRoute";

const router = createBrowserRouter([
    {
        index: true,
        Component: () => <LoginPage />
    },
    {
        path: '/dashboard',
        Component: () => (
            <ProtectedRoute requireAuthentication>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
        {
            index: true,
            Component: () => <Dashboard />,
        },
        ]
    },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}