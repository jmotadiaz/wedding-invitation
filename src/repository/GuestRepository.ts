import db from "./db";
import type { Guest } from "@domain/Guest/model";

export function getGuests(): Promise<Guest[]> {
  return db
    .selectFrom("guest")
    .select([
      "uuid",
      "name",
      "expected_attendees as expectedAttendees",
      "confirmed_attendees as confirmedAttendees",
      "bus",
      "allergies",
    ])
    .execute();
}

export function getGuest(uuid: string): Promise<Guest | undefined> {
  return db
    .selectFrom("guest")
    .where("uuid", "=", uuid)
    .select([
      "uuid",
      "name",
      "expected_attendees as expectedAttendees",
      "confirmed_attendees as confirmedAttendees",
      "bus",
      "allergies",
    ])
    .executeTakeFirst();
}

export async function addGuest(guest: Guest): Promise<void> {
  await db
    .insertInto("guest")
    .values({
      uuid: guest.uuid,
      name: guest.name,
      expected_attendees: guest.expectedAttendees,
      confirmed_attendees: guest.confirmedAttendees,
      bus: guest.bus,
      allergies: guest.allergies,
    })
    .execute();
}

export async function deleteGuest(uuid: string): Promise<void> {
  await db.deleteFrom("guest").where("uuid", "=", uuid).execute();
}
