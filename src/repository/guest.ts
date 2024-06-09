import db from "./db";
import type { Guest, GuestInput } from "./model";

export function getGuests(): Promise<
  Pick<
    Guest,
    | "allergies"
    | "bus"
    | "expected_attendees"
    | "confirmed_attendees"
    | "id"
    | "name"
  >[]
> {
  return db
    .selectFrom("guest")
    .select([
      "id",
      "allergies",
      "expected_attendees",
      "confirmed_attendees",
      "bus",
      "name",
    ])
    .execute();
}

export function getGuest(id: number): Promise<Guest | undefined> {
  return db
    .selectFrom("guest")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export function addGuest(guest: Omit<GuestInput, "id" | "modified_at">): void {
  db.insertInto("guest").values(guest).execute();
}

export function deleteGuest(id: number): void {
  db.deleteFrom("guest").where("id", "=", id).execute();
}
