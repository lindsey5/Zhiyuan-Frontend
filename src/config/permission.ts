
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
    ROLE_READ: 'role:read',
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
    ORDER_UPDATE: 'order:updated',

    //Category management
    CATEGORY_READ_ALL: 'category:read:all',
    CATEGORY_CREATE: 'category:create',
    CATEGORY_UPDATE: 'category:update',
    CATEGORY_DELETE: 'category:delete'
}

export const PERMISSION_DESCRIPTIONS = {
    Dashboard: {
        DASHBOARD_VIEW: "Allows access to the dashboard",
    },
    Audit: {
        AUDIT_VIEW_ALL: 'View all audit logs',
    },
    "User Management": {
        USER_CREATE: "Create new users",
        USER_READ: "View user details",
        USER_READ_ALL: "View all users",
        USER_UPDATE: "Update user information",
        USER_DELETE: "Delete users",
    },
    "Role Management": {
        ROLE_CREATE: "Create roles",
        ROLE_READ: "View role details",
        ROLE_READ_ALL: "View all roles",
        ROLE_UPDATE: "Update roles",
        ROLE_DELETE: "Delete roles",
    },
    "Product Management": {
        PRODUCT_READ_ALL: "View all products including variants",
        PRODUCT_CREATE: "Create products including variants",
        PRODUCT_UPDATE: "Update products including variants",
        PRODUCT_DELETE: "Delete products including variants",
    },
    "Order Management": {
        ORDER_READ_ALL: "View all orders",
        ORDER_READ: "View specific order",
        ORDER_UPDATE: "Update order status",
    },
    "Category Management" : {
        CATEGORY_READ_ALL: "View all categories",
        CATEGORY_CREATE: "Create categories",
        CATEGORY_UPDATE: "Update categories",
        CATEGORY_DELETE: "Delete categories",
    }
};