import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import LoginPage from "../pages/auth/Login";
import DashboardLayout from "../pages/DashboardLayout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import AccountSettings from "../pages/dashboard/AccountSettings";
import Products from "../pages/dashboard/Products";
import Categories from "../pages/dashboard/Categories";
import { PERMISSIONS } from "../config/permission";

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
                Component: () => (
                    <ProtectedRoute 
                        requiredPermissions={[PERMISSIONS.DASHBOARD_VIEW]}
                    >
                        <Dashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'account',
                Component: () => <AccountSettings />,
            },
            {
                path: 'products',
                Component: () => (
                    <ProtectedRoute
                        anyPermissions={[
                            PERMISSIONS.PRODUCT_DELETE,
                            PERMISSIONS.PRODUCT_UPDATE
                        ]}
                    >
                        <Products />
                    </ProtectedRoute>
                )
            },
            {
                path: 'categories',
                Component: () => (
                    <ProtectedRoute
                        anyPermissions={[
                            PERMISSIONS.CATEGORY_CREATE,
                            PERMISSIONS.CATEGORY_DELETE,
                            PERMISSIONS.CATEGORY_UPDATE
                        ]}
                    >
                        <Categories />
                    </ProtectedRoute>
                )
            }
        ]
    },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}