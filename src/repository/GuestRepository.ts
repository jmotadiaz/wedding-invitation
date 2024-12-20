import type { Guest } from "@domain/Guest/model";
import db from "./db";
import type { GuestTable } from "./db";
import type { Selectable } from "kysely";

type DbGuest = Omit<
  Guest,
  "confirmed" | "declined" | "hasAnswered" | "isConfirmed" | "info"
>;

export type GuestSource = Selectable<GuestTable>;

export function getGuests(): Promise<GuestSource[]> {
  return db
    .selectFrom("guest")
    .selectAll()
    .orderBy("modified_at", "desc")
    .execute();
}

export function getGuest(uuid: string): Promise<GuestSource | undefined> {
  return db
    .selectFrom("guest")
    .where("uuid", "=", uuid)
    .selectAll()
    .executeTakeFirst();
}

export async function addGuest(
  guest: Omit<DbGuest, "modifiedAt">
): Promise<GuestSource> {
  return db
    .insertInto("guest")
    .values({
      uuid: guest.uuid,
      name: guest.name,
      expected_attendees: guest.expectedAttendees,
      confirmed_attendees: guest.confirmedAttendees,
      bus: guest.bus,
      allergies: guest.allergies,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function dumpGuests(
  guests: Omit<DbGuest, "modifiedAt">[]
): Promise<void> {
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
): Promise<GuestSource | undefined> {
  return db
    .updateTable("guest")
    .set({
      name: guest.name,
      expected_attendees: guest.expectedAttendees,
      confirmed_attendees: guest.confirmedAttendees,
      accommodation: guest.accommodation,
      bus: guest.bus,
      bus_stop: guest.busStop,
      bus_seats: guest.busSeats,
      allergies: guest.allergies,
      modified_at: new Date().toISOString(),
    })
    .where("uuid", "=", uuid)
    .returningAll()
    .executeTakeFirst();
}

export async function deleteGuest(uuid: string): Promise<void> {
  await db.deleteFrom("guest").where("uuid", "=", uuid).execute();
}
