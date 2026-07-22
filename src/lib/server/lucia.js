import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { MongoClient } from "mongodb";
import { MONGO_URI } from "$env/static/private";
import { dev } from "$app/environment"

const client = new MongoClient(MONGO_URI);
await client.connect();
const db = client.db("examinu");

const adapter = new MongodbAdapter(
  db.collection("sessions"),
  db.collection("users"), // must match Mongoose User collection
);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "session",
    attributes: {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: false,
    },
  },
  getUserAttributes: (attributes) => ({
    email: attributes.email,
    role: attributes.role,
  }),
});
