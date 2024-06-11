import { createKysely } from "@vercel/postgres-kysely";
import SQLite from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";
import { SerializePlugin } from "kysely-plugin-serialize";
import type { GuestTable } from "./model";

interface Database {
  guest: GuestTable;
}

const createProdDB = () => createKysely<Database>();

const createDevDB = () => {
  const dialect = new SqliteDialect({
    database: new SQLite("local.db"),
  });
  return new Kysely<Database>({
    dialect,
    plugins: [new SerializePlugin()],
  });
};

const db =
  import.meta.env.MODE === "development" ? createDevDB() : createProdDB();

export default db;
