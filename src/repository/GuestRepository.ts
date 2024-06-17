import type { Guest } from "@domain/Guest/model";
import db from "./db";

export function getGuests(): Promise<Guest[]> {
  return db
    .selectFrom("guest")
    .select([
      "uuid",
      "name",
      "expected_attendees as expectedAttendees",
      "confirmed_attendees as confirmedAttendees",
      "bus_stop as busStop",
      "bus_seats as busSeats",
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
      "bus_stop as busStop",
      "bus_seats as busSeats",
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
    .executeTakeFirst();
}

export async function updateGuest(
  uuid: string,
  guest: Partial<Guest>
): Promise<void> {
  await db
    .updateTable("guest")
    .set({
      name: guest.name,
      expected_attendees: guest.expectedAttendees,
      confirmed_attendees: guest.confirmedAttendees,
      bus: guest.bus,
      bus_stop: guest.busStop,
      bus_seats: guest.busSeats,
      allergies: guest.allergies,
    })
    .where("uuid", "=", uuid)
    .execute();
}

export async function deleteGuest(uuid: string): Promise<void> {
  await db.deleteFrom("guest").where("uuid", "=", uuid).execute();
}
