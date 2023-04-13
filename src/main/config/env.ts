export default {
  host: process.env.HOST || "localhost",
  dbUser: process.env.DB_USER || "postgres",
  dbPassword: process.env.DB_PASSWORD || "postgres",
  databaseName: process.env.DATABASE || "multicalc",
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || "tj67O==5H",
  databaseUrl:
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5432/multicalc",
};
