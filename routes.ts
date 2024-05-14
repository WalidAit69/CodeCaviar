// routes do not require authentification
export const publicRoutes = ["/", "/projects", "/services"];

// routes for admins and require authentification
export const adminRoutes = ["/admin"];

// routes used for authentification
export const authRoutes = [
  "/auth",
  "/auth/error",
  "/auth/verify",
  "/auth/reset",
  "/auth/reset/otp",
  "/auth/reset/otp/passwordreset",
];

// prefix for api authentification routes
export const apiAuthPrefix = "/api/auth";

// prefix for api authentification routes
export const AdminPrefix = "/admin";

// prefix for api authentification routes
export const Default_Login_Redirect = "/";
