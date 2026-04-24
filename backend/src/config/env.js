const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/grocery_app",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  jwtSecret: process.env.JWT_SECRET || "change_me_super_secret_key",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  adminName: process.env.ADMIN_NAME || "Admin",
  adminLastName: process.env.ADMIN_LAST_NAME || "User",
  adminEmail: process.env.ADMIN_EMAIL || "admin@groceryapp.com",
  adminPassword: process.env.ADMIN_PASSWORD || "admin123",
};

export default env;
