import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { dev } from "$app/env";
import { building } from "$app/environment";
import mongoose from "./db.js";

function createLucia() {
  const db = mongoose.connection.getClient().db("examinu");
  const adapter = new MongodbAdapter(
    db.collection("sessions"),
    db.collection("users"),
  );

  return new Lucia(adapter, {
    sessionCookie: {
      name: "session",
      attributes: { httpOnly: true, sameSite: "lax", path: "/", secure: !dev },
    },
    getUserAttributes: (attributes) => ({
      email: attributes.email,
      role: attributes.role,
    }),
  });
}

// During build/analysis there is no DB connection, so don't create it
export const lucia = building ? /** @type {any} */ (null) : createLucia();
