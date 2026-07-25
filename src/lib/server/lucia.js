import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { dev } from "$app/environment";
import mongoose from "./db.js";

const client = mongoose.connection.getClient();
const db = client.db("examinu");

const adapter = new MongodbAdapter(
  db.collection("sessions"),
  db.collection("users"),
);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "session",
    attributes: {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: !dev,
    },
  },
  getUserAttributes: (attributes) => ({
    email: attributes.email,
    role: attributes.role,
  }),
});
