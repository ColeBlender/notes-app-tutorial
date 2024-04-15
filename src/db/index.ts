import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(process.env.DB_CONNECTION_STRING!);
const db = drizzle(client);

export default db;
