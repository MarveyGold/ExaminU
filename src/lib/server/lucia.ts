import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { dev, building } from "$app/env";
import mongoose from "./db.js";

interface DatabaseUserAttributes {
  email: string;
  role: string;
  faculty?: string;
  department?: string;
  level?: string;
}

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

// The adapter and Mongoose can ship slightly different copies of the `mongodb` types,
// so take the collection types from the adapter itself.
type AdapterCollections = ConstructorParameters<typeof MongodbAdapter>;

function createLucia() {
  const db = mongoose.connection.getClient().db("examinu");
  const adapter = new MongodbAdapter(
    db.collection("sessions") as unknown as AdapterCollections[0],
    db.collection("users") as unknown as AdapterCollections[1],
  );

  return new Lucia(adapter, {
    sessionCookie: {
      name: "session",
      attributes: { sameSite: "lax", path: "/", secure: !dev }, // Lucia always sets HttpOnly
    },
    getUserAttributes: (attributes) => ({
      email: attributes.email,
      role: attributes.role,
      faculty: attributes.faculty,
      department: attributes.department,
      level: attributes.level,
    }),
  });
}

// During build/analysis there is no DB connection, so don't create it
export const lucia = building ? (null as unknown as ReturnType<typeof createLucia>) : createLucia();

// Sessions here are keyed by the Mongoose ObjectId itself (not its string form), and the
// Mongo adapter looks users up by that exact value. Lucia only types user ids as `string`,
// so ids are passed through untouched, just retyped.
export const asLuciaId = (id: unknown) => id as string;
