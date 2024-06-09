import type { Generated, ColumnType, Selectable, Insertable } from "kysely";

export interface GuestTable {
  id: Generated<number>;
  name: string;
  expected_attendees: number;
  confirmed_attendees: number;
  bus?: boolean;
  allergies?: string;
  modified_at?: ColumnType<Date, string | undefined, never>;
}

export type Guest = Selectable<GuestTable>;
export type GuestInput = Insertable<GuestTable>;
