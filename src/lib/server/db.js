import mongoose from "mongoose";
import { building } from "$app/environment";
import { MONGO_URI } from "$app/env/private";

if (!building) {
  try {
    const clientOptions =
      process.env.NODE_ENV === "production"
        ? {
            serverApi: { version: "1", strict: true, deprecationErrors: true },
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 5000,
            family: 4,
            dbName: "examinu",
          }
        : { dbName: "examinu" };

    if (!mongoose.connection.readyState) {
      await mongoose.connect(MONGO_URI, clientOptions);
    }
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}

export default mongoose;
