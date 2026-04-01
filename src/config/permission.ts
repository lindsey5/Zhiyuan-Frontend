
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
    PRODUCT_CREATE: 'product:create',
    PRODUCT_UPDATE: 'product:update',
    PRODUCT_DELETE: 'product:delete',

    // Order management
    ORDER_READ_ALL: 'order:read:all',
    ORDER_READ: 'order:read',
    ORDER_UPDATE: 'order:update',

    //Category management
    CATEGORY_READ_ALL: 'category:read:all',
    CATEGORY_CREATE: 'category:create',
    CATEGORY_UPDATE: 'category:update',
    CATEGORY_DELETE: 'category:delete',

    //Distributor management
    DISTRIBUTOR_READ_ALL: 'distributor:read:all',
    DISTRIBUTOR_CREATE: 'distributor:create',
    DISTRIBUTOR_UPDATE: 'distributor:update',
    DISTRIBUTOR_DELETE: 'distributor:delete'
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
        description: "Manage access to system audit logs and activity tracking.",
        AUDIT_VIEW_ALL: "View all audit logs",
    },

    "User Management": {
        description: "Manage system users including creation, updates, and removal.",
        USER_CREATE: "Create new users",
        USER_READ: "View user details",
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
        PRODUCT_CREATE: "Create products including variants",
        PRODUCT_UPDATE: "Update products including variants",
        PRODUCT_DELETE: "Delete products including variants",
    },

    "Order Management": {
        description: "Manage customer orders including viewing and updating order status.",
        ORDER_READ_ALL: "View all orders",
        ORDER_READ: "View specific order",
        ORDER_UPDATE: "Update order status",
    },

    "Category Management": {
        description: "Manage product categories including creation, updates, and deletion.",
        CATEGORY_READ_ALL: "View all categories",
        CATEGORY_CREATE: "Create categories",
        CATEGORY_UPDATE: "Update categories",
        CATEGORY_DELETE: "Delete categories",
    },
    "Distributor Management": {
        description: "Manage distributors.",
        DISTRIBUTOR_READ_ALL: "View all distributors.",
        DISTRIBUTOR_CREATE: "Create a new distributor.",
        DISTRIBUTOR_UPDATE: "Update distributor details.",
        DISTRIBUTOR_DELETE: "Delete or deactivate a distributor."
    }
};

export const getPermissionKey = (value: string) => {
    return Object.keys(PERMISSIONS).find(
        key => PERMISSIONS[key as keyof typeof PERMISSIONS] === value
    );
};