import mongoose, { type ConnectOptions } from "mongoose";
import { building } from "$app/env";
import { MONGO_URI } from "$app/env/private";

console.log("[DB] Module loaded", {
  building,
  uriPresent: !!MONGO_URI,
  nodeEnv: process.env.NODE_ENV,
  readyState: mongoose.connection.readyState,
});

if (!building) {
  const options: ConnectOptions = {
    serverApi: {
      version: "1",
      strict: true,
      deprecationErrors: true,
    },
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    family: 4,
    dbName: "examinu",
  };

  try {
    console.log("[DB] Connecting...");
    await mongoose.connect(MONGO_URI, options);
    console.log("[DB] Connected!", mongoose.connection.readyState);
  } catch (error) {
    console.error("[DB] CONNECTION FAILED:", error);
    throw error;
  }
}

export default mongoose;
