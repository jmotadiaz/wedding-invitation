import type { Guest } from "@domain/Guest/model";
import db from "./db";
import type { GuestTable } from "./db";
import type { Selectable } from "kysely";

type DbGuest = Omit<Guest, "confirmed" | "declined" | "hasAnswered">;

export type GuestSource = Selectable<GuestTable>;

export function getGuests(): Promise<GuestSource[]> {
  return db.selectFrom("guest").selectAll().execute();
}

export function getGuest(uuid: string): Promise<GuestSource | undefined> {
  return db
    .selectFrom("guest")
    .where("uuid", "=", uuid)
    .selectAll()
    .executeTakeFirst();
}

export async function addGuest(guest: DbGuest): Promise<void> {
  db.insertInto("guest")
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

export async function dumpGuests(guests: DbGuest[]): Promise<void> {
  await db
    .insertInto("guest")
    .values(
      guests.map((guest) => ({
        uuid: guest.uuid,
        name: guest.name,
        expected_attendees: guest.expectedAttendees,
        confirmed_attendees: guest.confirmedAttendees,
        bus: guest.bus,
        allergies: guest.allergies,
      }))
    )
    .execute();
}

export async function updateGuest(
  uuid: string,
  guest: Partial<DbGuest>
): Promise<void> {
  db.updateTable("guest")
    .set({
      name: guest.name,
      expected_attendees: guest.expectedAttendees,
      confirmed_attendees: guest.confirmedAttendees,
      accommodation: guest.accommodation,
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
