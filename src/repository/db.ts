import { createKysely } from "@vercel/postgres-kysely";
import SQLite from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";
import type { ColumnType, Generated, Insertable, Selectable } from "kysely";
import { SerializePlugin } from "kysely-plugin-serialize";

export interface GuestTable {
  id: Generated<number>;
  uuid: string;
  name: string;
  expected_attendees: string[];
  confirmed_attendees: string[] | null;
  accommodation: boolean | null;
  bus: boolean | null;
  allergies: string | null;
  bus_stop: string | null;
  bus_seats: number | null;
  modified_at?: ColumnType<Date, string | undefined, string | undefined>;
}

export type SelectableGuest = Selectable<GuestTable>;
export type GuestInput = Insertable<GuestTable>;

export interface Database {
  guest: GuestTable;
}

const createProdDB = () =>
  createKysely<Database>({
    connectionString: import.meta.env.POSTGRES_URL,
  });

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
