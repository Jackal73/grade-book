import dotenv from "dotenv";

dotenv.config();

export default {
  baseUrl: process.env.BASE_URL || "http://localhost",
  db: {
    name: "gradeBookDB",
    uri: process.env.MONGODB_URI,
  },

  // Add encryption object
  encryption: {
    expiresIn: process.env.EXPIRES_IN || "7d", // How long till expires
    saltRounds: process.env.SALT_ROUNDS || 10, // adds 10 random characters
    secret: process.env.ENCRYPTION_SECRET || "secret", // ... or "secret"
  },
  port: process.env.PORT || 3000,
};
