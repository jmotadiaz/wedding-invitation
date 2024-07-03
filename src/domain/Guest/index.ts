import * as GuestRepository from "@repository/GuestRepository";
import { nanoid } from "nanoid";
import type { BusStop, Guest, Stats } from "./model";

export const stops = ["Sevilla", "Los Palacios", "Trajano"];
export enum ValidationError {
  CONFIRMATION_REQUIRED,
  BUS_STOP_REQUIRED,
  BUS_STOP_ERROR,
  BUS_SEATS_REQUIRED,
  BUS_SEATS_OVER_CONFIRMED_ATTENDEES,
  GENERIC,
}

export const getGuests = async (): Promise<Guest[]> => {
  return GuestRepository.getGuests();
};

export const getGuest = async (id: string): Promise<Guest | undefined> => {
  return GuestRepository.getGuest(id);
};

export const addGuest = async ({
  name,
  expectedAttendees,
}: Pick<Guest, "name" | "expectedAttendees">): Promise<void> => {
  return GuestRepository.addGuest({
    name,
    expectedAttendees,
    uuid: nanoid(),
    confirmedAttendees: 0,
    bus: false,
    busStop: null,
    busSeats: 0,
    allergies: "",
  });
};

export const deleteGuest = async (id: string): Promise<void> => {
  return GuestRepository.deleteGuest(id);
};

const validateGuest = (
  guest: Pick<
    Guest,
    "allergies" | "confirmedAttendees" | "bus" | "busSeats" | "busStop"
  >
): ValidationError[] => {
  const errors: ValidationError[] = [];
  if (!guest.confirmedAttendees) {
    errors.push(ValidationError.CONFIRMATION_REQUIRED);
  }

  if (guest.bus) {
    if (!guest.busStop) {
      errors.push(ValidationError.BUS_STOP_REQUIRED);
    }

    if (!guest.busSeats) {
      errors.push(ValidationError.BUS_SEATS_REQUIRED);
    }

    if (guest.busSeats && guest.busSeats > guest.confirmedAttendees) {
      errors.push(ValidationError.BUS_SEATS_OVER_CONFIRMED_ATTENDEES);
    }

    if (guest.busStop && !stops.includes(guest.busStop)) {
      errors.push(ValidationError.BUS_STOP_ERROR);
    }
  }

  return errors;
};

export const getStats = (guests: Guest[]): Stats =>
  guests.reduce(
    (acc, { confirmedAttendees, expectedAttendees, busSeats, busStop }) => ({
      totalConfirmedAttendees: acc.totalConfirmedAttendees + confirmedAttendees,
      totalExpectedAttendees: acc.totalExpectedAttendees + expectedAttendees,
      totalBusSeats: acc.totalBusSeats + (busSeats || 0),
      seatsByStop: {
        ...acc.seatsByStop,
        ...(busStop && {
          [busStop]: acc.seatsByStop[busStop as BusStop] + (busSeats || 0),
        }),
      },
    }),
    {
      totalConfirmedAttendees: 0,
      totalExpectedAttendees: 0,
      totalBusSeats: 0,
      seatsByStop: {
        Sevilla: 0,
        "Los Palacios": 0,
        Trajano: 0,
      },
    }
  );

export const totalConfirmedAttendees = (guests: Guest[]): number =>
  guests.reduce((acc, { confirmedAttendees }) => acc + confirmedAttendees, 0);
export const totalExpectedAttendees = (guests: Guest[]): number =>
  guests.reduce((acc, guest) => acc + guest.expectedAttendees, 0);

export const confirmGuest = async (
  id: string,
  {
    allergies,
    confirmedAttendees,
    bus,
    busSeats,
    busStop,
  }: Pick<
    Guest,
    "allergies" | "confirmedAttendees" | "bus" | "busSeats" | "busStop"
  >
): Promise<void> => {
  const parsedGuest = {
    allergies,
    confirmedAttendees,
    bus,
    busSeats: bus ? busSeats : null,
    busStop: bus ? busStop : null,
  };

  const errors = validateGuest(parsedGuest);
  if (errors.length) {
    return Promise.reject(errors);
  }

  return GuestRepository.updateGuest(id, parsedGuest);
};
