import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import LoginPage from "../pages/auth/Login";
import DashboardLayout from "../pages/DashboardLayout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import AccountSettings from "../pages/dashboard/AccountSettings";
import Products from "../pages/dashboard/Products";
import Categories from "../pages/dashboard/Categories";
import { PERMISSIONS } from "../config/permission";
import AddProduct from "../pages/dashboard/AddProduct";
import EditProduct from "../pages/dashboard/EditProduct";
import AuditLogs from "../pages/dashboard/AuditLogs";
import Variants from "../pages/dashboard/Variants";
import PageNotFound from "../pages/PageNotFound";
import Roles from "../pages/dashboard/Roles";
import Role from "../pages/dashboard/Role";

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
                            PERMISSIONS.PRODUCT_UPDATE,
                            PERMISSIONS.PRODUCT_READ_ALL
                        ]}
                    >
                        <Products />
                    </ProtectedRoute>
                )
            },
            {
                path: 'variants',
                Component: () => (
                    <ProtectedRoute
                        anyPermissions={[
                            PERMISSIONS.PRODUCT_DELETE,
                            PERMISSIONS.PRODUCT_UPDATE,
                            PERMISSIONS.PRODUCT_READ_ALL
                        ]}
                    >
                        <Variants />
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
                            PERMISSIONS.CATEGORY_UPDATE,
                            PERMISSIONS.CATEGORY_READ_ALL,
                        ]}
                    >
                        <Categories />
                    </ProtectedRoute>
                )
            },
            {
                path: 'add-product',
                Component: () => (
                    <ProtectedRoute
                        requiredPermissions={[PERMISSIONS.PRODUCT_CREATE]}
                    >
                        <AddProduct />
                    </ProtectedRoute>
                )
            },
            {
                path: 'edit-product/:id',
                Component: () => (
                    <ProtectedRoute requiredPermissions={[PERMISSIONS.CATEGORY_UPDATE]}>
                        <EditProduct />
                    </ProtectedRoute>
                )
            },
            {
                path: 'roles',
                Component: () => (
                    <ProtectedRoute anyPermissions={
                        [
                            PERMISSIONS.ROLE_CREATE, 
                            PERMISSIONS.ROLE_READ_ALL, 
                            PERMISSIONS.ROLE_UPDATE, 
                            PERMISSIONS.ROLE_DELETE
                        ]
                    }>
                        <Roles />
                    </ProtectedRoute>
                )
            },
            {
                path: 'audit-logs',
                Component: () => (
                    <ProtectedRoute requiredPermissions={[PERMISSIONS.AUDIT_VIEW_ALL]}>
                        <AuditLogs />
                    </ProtectedRoute>
                )
            },
            {
                path: 'create-role',
                Component: () => (
                    <ProtectedRoute requiredPermissions={[PERMISSIONS.ROLE_CREATE]}>
                       <Role title="Create Role" description="Define a new role and assign its permissions." />
                    </ProtectedRoute>
                )
            },
            {
                path: 'edit-role/:id',
                Component: () => (
                    <ProtectedRoute requiredPermissions={[PERMISSIONS.ROLE_UPDATE]}>
                        <Role title="Edit Role" description="Update role details and manage permissions." />
                    </ProtectedRoute>
                )
            }
        ]
    },
    {
        path: '*',
        Component: () => <PageNotFound />
    }
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}