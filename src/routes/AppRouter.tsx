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
import Users from "../pages/dashboard/Users";
import Distributors from "../pages/dashboard/Distributors";
import StockDistribution from "../pages/dashboard/StockDistribution";
import TransferLogs from "../pages/dashboard/TransferLogs";
import AllDistributorSales from "../pages/dashboard/AllDistributorSales";
import Distributor from "../pages/dashboard/Distributor";
import DistributorReports from "../pages/dashboard/Reports";
import SponsoredItems from "../pages/dashboard/SponsoredItems";
import AddSponsoredItems from "../pages/dashboard/AddSponsoredItems";
import ReturnRequests from "../pages/dashboard/ReturnRequests";
import Orders from "../pages/dashboard/Orders";

const router = createBrowserRouter([ 
    {
        index: true,
        Component: () => <LoginPage />
    },
    {
        path: '/dashboard',
        Component: () => (
            <DashboardLayout />
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
                path: 'sponsored-products',
                children: [
                    {
                        index: true,
                        Component: () => (
                            <ProtectedRoute requiredPermissions={[PERMISSIONS.SPONSORED_PRODUCT_VIEW_ALL]}>
                                <SponsoredItems />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: 'create',
                        Component: () => (
                            <ProtectedRoute requiredPermissions={[PERMISSIONS.SPONSORED_PRODUCT_CREATE]}>
                                <AddSponsoredItems />
                            </ProtectedRoute>
                        )
                    }
                ]  
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
            },
            {
                path: 'users',
                Component: () => (
                    <ProtectedRoute anyPermissions={[PERMISSIONS.USER_CREATE, PERMISSIONS.USER_DELETE, PERMISSIONS.USER_UPDATE, PERMISSIONS.USER_READ_ALL]}>
                        <Users />
                    </ProtectedRoute>
                )
            },
            {
                path: 'orders',
                Component: () => (
                    <ProtectedRoute anyPermissions={[PERMISSIONS.ORDER_READ_ALL, PERMISSIONS.ORDER_UPDATE]}>
                        <Orders />
                    </ProtectedRoute>
                )
            },
            {
                path: 'distributors',
                children: [
                    {
                        index: true,
                        Component: () => (
                            <ProtectedRoute
                                anyPermissions={[
                                    PERMISSIONS.DISTRIBUTOR_CREATE,
                                    PERMISSIONS.DISTRIBUTOR_READ_ALL,
                                    PERMISSIONS.DISTRIBUTOR_DELETE,
                                    PERMISSIONS.DISTRIBUTOR_SALES_VIEW, 
                                    PERMISSIONS.DISTRIBUTOR_STOCK_VIEW, 
                                    PERMISSIONS.DISTRIBUTOR_STATS_VIEW
                                ]}
                            >
                                <Distributors />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: "sales",
                        Component: () => (
                            <ProtectedRoute requiredPermissions={[PERMISSIONS.DISTRIBUTOR_SALES_VIEW]}>
                                <AllDistributorSales />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: 'transfer-stocks',
                        Component: () => (
                            <ProtectedRoute requiredPermissions={[PERMISSIONS.DISTRIBUTOR_STOCK_TRANSFER]}>
                                <StockDistribution />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: 'reports',
                        Component: () => (
                            <ProtectedRoute requiredPermissions={[PERMISSIONS.DISTRIBUTOR_REPORTS_VIEW]}>
                                <DistributorReports />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: 'transfer-logs',
                        Component: () => (
                            <ProtectedRoute
                                requiredPermissions={[PERMISSIONS.TRANSFER_LOGS_VIEW_ALL]}
                            >
                                <TransferLogs />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: 'return-requests',
                        Component: () => (
                            <ProtectedRoute
                                anyPermissions={[PERMISSIONS.DISTRIBUTOR_RETURN_REQUEST_VIEW, PERMISSIONS.DISTRIBUTOR_RETURN_REQUEST_UPDATE]}
                            >
                                <ReturnRequests />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: ":id",
                        Component: () => (
                            <ProtectedRoute
                                anyPermissions={[
                                    PERMISSIONS.DISTRIBUTOR_SALES_VIEW, 
                                    PERMISSIONS.DISTRIBUTOR_STOCK_VIEW, 
                                    PERMISSIONS.DISTRIBUTOR_STATS_VIEW
                                ]}
                            >
                                <Distributor />
                            </ProtectedRoute>
                        )
                    },
                ]
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