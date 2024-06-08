import { createKysely } from "@vercel/postgres-kysely";
import type { Generated, ColumnType, Selectable, Insertable } from "kysely";

interface GuestTable {
  id: Generated<number>;
  name: string;
  expected_attendees: number;
  confirmed_attendees: number;
  bus: boolean;
  allergies?: string;
  modified_at: ColumnType<Date, string | undefined, never>;
}

interface Database {
  guest: GuestTable;
}

export type Guest = Selectable<GuestTable>;
export type GuestInput = Insertable<GuestTable>;

export default createKysely<Database>({
  connectionString: import.meta.env.POSTGRES_URL,
});
