import * as GuestRepository from "@repository/guest";
import type { Guest } from "./model";
import { nanoid } from "nanoid";

export const getGuests = async (): Promise<Guest[]> => {
  return GuestRepository.getGuests();
};

export const addGuest = async ({
  name,
  expectedAttendees,
}: Omit<
  Guest,
  "uuid" | "bus" | "allergies" | "confirmedAttendees"
>): Promise<void> => {
  return GuestRepository.addGuest({
    name,
    expectedAttendees,
    uuid: nanoid(),
    confirmedAttendees: 0,
    bus: false,
    allergies: "",
  });
};

export const deleteGuest = async (id: string): Promise<void> => {
  return GuestRepository.deleteGuest(id);
};
