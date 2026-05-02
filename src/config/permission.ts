
export const PERMISSIONS = {
    DASHBOARD_VIEW: 'dashboard:view',
    AUDIT_VIEW_ALL: 'audit:view:all',

    // User management
    USER_CREATE: 'user:create',
    USER_READ: 'user:read',
    USER_READ_ALL: 'user:read:all',
    USER_UPDATE: 'user:update',
    USER_DELETE: 'user:delete',

    // Role management
    ROLE_CREATE: 'role:create',
    ROLE_READ_ALL: 'role:read:all',
    ROLE_UPDATE: 'role:update',
    ROLE_DELETE: 'role:delete',

    // Product management
    PRODUCT_READ_ALL: 'product:read:all',
    PRODUCT_LOW_STOCK_VIEW: 'product:low-stock:view',
    PRODUCT_CREATE: 'product:create',
    PRODUCT_UPDATE: 'product:update',
    PRODUCT_DELETE: 'product:delete',

    //Category management
    CATEGORY_READ_ALL: 'category:read:all',
    CATEGORY_CREATE: 'category:create',
    CATEGORY_UPDATE: 'category:update',
    CATEGORY_DELETE: 'category:delete',

    // Distributor Management
    DISTRIBUTOR_READ_ALL: 'distributor:read:all',
    DISTRIBUTOR_CREATE: 'distributor:create',
    DISTRIBUTOR_UPDATE: 'distributor:update',
    DISTRIBUTOR_DELETE: 'distributor:delete',
    DISTRIBUTOR_DOWNLINE_VIEW: 'distributor:downline:view',

    /* Distributor Analytics */
    DISTRIBUTOR_STATS_VIEW: 'distributor-stats:view',
    DISTRIBUTOR_REPORTS_VIEW: 'distributor-reports:view',
    DISTRIBUTOR_RANKINGS_VIEW: 'distributor-rankings:view',
    
    // Distributor Sales
    DISTRIBUTOR_SALES_VIEW_ALL: 'distributor-sales:view:all',
    DISTRIBUTOR_SALES_VIEW: 'distributor-sales:view',

    // Distributor Stock Management
    DISTRIBUTOR_STOCK_VIEW: 'distributor-stock:view',

    // Distributor Commissions
    DISTRIBUTOR_COMMISSIONS_VIEW: 'distributor-commissions:view',

    // Stock Orders
    STOCK_ORDERS_VIEW_ALL: 'stock-orders:view:all',
    STOCK_ORDERS_UPDATE: 'stock-orders:update',

    // Stock Distribution History
    STOCK_DISTRIBUTION_HISTORY_VIEW_ALL: 'tranfer-logs:view:all',
    STOCK_DISTRIBUTION_HISTORY_VIEW_OWN: 'tranfer-logs:view:own',
    STOCK_DISTRIBUTION_CREATE: 'transfer-logs:create',
    STOCK_DISTRIBUTION_UPDATE: 'transfer-logs:update',

    // Distributor Return Requests
    DISTRIBUTOR_RETURN_REQUEST_VIEW: 'distributor-return:view',
    DISTRIBUTOR_RETURN_REQUEST_UPDATE: 'distributor-return:update',

    // Withdrawal Requets
     WITHDRAWAL_REQUEST_VIEW_ALL: 'withdrawal-requests:view:all',
    WITHDRAWAL_REQUEST_UPDATE: 'withdrawal-requests:view:update',

    // Sponsored Items
    SPONSORED_PRODUCT_UPDATE: 'sponsored-items:update',
    SPONSORED_PRODUCT_VIEW_ALL: 'sponsored-items:view:all',

    // Order management
    ORDER_READ_ALL: 'order:read:all',
    ORDER_UPDATE: 'order:update',
    ORDER_SALES_VIEW: "order:sales:view"
}

type PermissionGroup = {
    description: string;
    [permissionKey: string]: string;
};

export const PERMISSION_DESCRIPTIONS : Record<string, PermissionGroup> = {
    Dashboard: {
        description: "Manage access to dashboard features and overview data.",
        DASHBOARD_VIEW: "Allows access to the dashboard",
    },

    Audit: {
        description: "View system audit logs and activity tracking records.",
        AUDIT_VIEW_ALL: "View all audit logs",
    },

    "User Management": {
        description: "Manage system users including creation, updates, and removal.",
        USER_CREATE: "Create new users",
        USER_READ_ALL: "View all users",
        USER_UPDATE: "Update user information",
        USER_DELETE: "Delete users",
    },

    "Role Management": {
        description: "Manage roles and assign permissions for system access control.",
        ROLE_CREATE: "Create roles",
        ROLE_READ_ALL: "View all roles",
        ROLE_UPDATE: "Update roles",
        ROLE_DELETE: "Delete roles",
    },

    "Product Management": {
        description: "Manage products and variants including updates and inventory setup.",
        PRODUCT_READ_ALL: "View all products including variants",
        PRODUCT_LOW_STOCK_VIEW: 'View and manage low stock products',
        PRODUCT_CREATE: "Create products including variants",
        PRODUCT_UPDATE: "Update products including variants",
        PRODUCT_DELETE: "Delete products including variants",
    },

    "Category Management": {
        description: "Manage product categories including creation, updates, and deletion.",
        CATEGORY_READ_ALL: "View all categories",
        CATEGORY_CREATE: "Create categories",
        CATEGORY_UPDATE: "Update categories",
        CATEGORY_DELETE: "Delete categories",
    },

    "Distributor Management": {
        description: "Manage distributors, their accounts, stock inventory, and distribution activities.",
        DISTRIBUTOR_READ_ALL: "View all distributors",
        DISTRIBUTOR_CREATE: "Create new distributor accounts",
        DISTRIBUTOR_UPDATE: "Update distributor info",
        DISTRIBUTOR_DELETE: "Delete distributor accounts",
        DISTRIBUTOR_DOWNLINE_VIEW: "View the list of downline distributors under a distributor"
    },

    "Distributor Analytics": {
        description: "Track and analyze distributor performance through sales data, activity insights, and detailed reporting.",
        DISTRIBUTOR_STATS_VIEW: "View individual distributor performance metrics and statistics",
        DISTRIBUTOR_REPORTS_VIEW: "Access comprehensive reports and analytics for all distributors",
        DISTRIBUTOR_RANKINGS_VIEW: "View distributor rankings based on sales and performance",
    },

    "Distributor Sales" : {
        description: "Monitor distributor sales history",
        DISTRIBUTOR_SALES_VIEW_ALL: "View all distributor sales history",
        DISTRIBUTOR_SALES_VIEW: "View distributor sales history of individual distributor",
    },

    "Distributor Stock": {
        description: "Monitor distributor's inventory / stocks.",
        DISTRIBUTOR_STOCK_VIEW: "View inventory of individual distributor",
    },

    "Distributor Commission": {
        description: "Monitor distributor commission records",
        DISTRIBUTOR_COMMISSIONS_VIEW: "View distributor commission history."
    },

    "Stock Orders": {
        description: "Manage and monitor distributor's stock orders, including viewing all orders and updating order status.",
        STOCK_ORDERS_VIEW_ALL: "View all distributor's stock orders",
        STOCK_ORDERS_UPDATE: "Update distributor's stock order status",
    },

    "Stock Distribution History": {
        description: "Manage and monitor stock distribution records, including tracking status updates and viewing history.",
        STOCK_DISTRIBUTION_UPDATE: "Update stock distribution status",
        STOCK_DISTRIBUTION_CREATE: 'Distribute stock to distributors',
        STOCK_DISTRIBUTION_HISTORY_VIEW_ALL: "View all stock distribution history",
        STOCK_DISTRIBUTION_HISTORY_VIEW_OWN: 'View own stock distribution history',
    },

    "Distributor Return Requests": {
        description: "Manage distributor return requests including viewing and updating request statuses.",
        DISTRIBUTOR_RETURN_REQUEST_VIEW: "View distributor return requests",
        DISTRIBUTOR_RETURN_REQUEST_UPDATE: "Update distributor return request status",
    },

    "Withdrawal Requests": {
        description: 'Manage withdrawal requests including status update and viewing',
        WITHDRAWAL_REQUEST_VIEW_ALL: 'View all withdrawal requests',
        WITHDRAWAL_REQUEST_UPDATE: 'Update withdrawal request status',
    },

    "Sponsored Product Management": {
        description: "Manage sponsored products including status update and viewing",
        SPONSORED_PRODUCT_UPDATE: 'Update sponsored product status',
        SPONSORED_PRODUCT_VIEW_ALL: 'Access all sponsored products',
    },

    "Order Management": {
        description: "Manage walk-in orders by viewing order details, tracking status, and monitoring sales performance.",
        ORDER_READ_ALL: "View all walk-in orders",
        ORDER_UPDATE: "Update walk-in order status",
        ORDER_SALES_VIEW: "View sales analytics and monthly walk-in order reports"
    },
};

export const getPermissionKey = (value: string) => {
    return Object.keys(PERMISSIONS).find(
        key => PERMISSIONS[key as keyof typeof PERMISSIONS] === value
    );
};