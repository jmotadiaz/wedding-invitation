import type { Guest } from "@domain/Guest/model";
import db from "./db";
import type { GuestTable } from "./db";
import type { Selectable } from "kysely";

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
      ...(has(guest.name) && { name: guest.name }),
      ...(has(guest.expectedAttendees) && {
        expected_attendees: guest.expectedAttendees,
      }),
      ...(has(guest.confirmedAttendees) && {
        confirmed_attendees: guest.confirmedAttendees,
      }),
      ...(has(guest.accommodation) && { accommodation: guest.accommodation }),
      ...(has(guest.bus) && { bus: guest.bus }),
      ...(has(guest.busStop) && { bus_stop: guest.busStop }),
      ...(has(guest.busSeats) && { bus_seats: guest.busSeats }),
      ...(has(guest.allergies) && { allergies: guest.allergies }),
      ...(has(guest.accommodation) && { accommodation: guest.accommodation }),
    })
    .where("uuid", "=", uuid)
    .execute();
}

export async function deleteGuest(uuid: string): Promise<void> {
  await db.deleteFrom("guest").where("uuid", "=", uuid).execute();
}

const has = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined;
