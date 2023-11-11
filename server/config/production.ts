require("dotenv").config();
export default {
  port: process.env.PORT || 5000,
  dbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/url-shortener",
  corsOrigin: process.env.CORSORIGIN || "http://localhost:3000",
};
