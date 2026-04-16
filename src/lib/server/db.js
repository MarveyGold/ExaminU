import mongoose from "mongoose";
import { MONGO_URI } from "$env/static/private";
const clientOptions =
  process.env.NODE_ENV == "production"
    ? {
        serverApi: { version: "1", strict: true, deprecationErrors: true },
        serverSelectionTimeoutMS: 5000, // ← fail fast instead of hanging
        connectTimeoutMS: 5000,
        family: 4,
        dbName: "examinu",
      }
    : { dbName: "examinu" };
if (!mongoose.connection.readyState) {
  await mongoose.connect(MONGO_URI, clientOptions);
}

export default mongoose;
