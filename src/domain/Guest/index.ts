import * as GuestRepository from "@repository/GuestRepository";
import type { GuestSource } from "@repository/GuestRepository";
import { nanoid } from "nanoid";
import type { Guest, GuestList, Stats } from "./model";

export const stops = ["Sevilla", "Los Palacios", "Trajano"];
export enum ValidationError {
  CONFIRMATION_REQUIRED,
  BUS_STOP_REQUIRED,
  BUS_STOP_ERROR,
  BUS_SEATS_REQUIRED,
  BUS_SEATS_OVER_CONFIRMED_ATTENDEES,
  GENERIC,
}

const Guest = (guestSource: GuestSource): Guest => ({
  ...guestSource,
  name: guestSource.name ?? "",
  expectedAttendees: guestSource.expected_attendees ?? 0,
  confirmedAttendees: guestSource.confirmed_attendees,
  busSeats: guestSource.bus_seats,
  busStop: guestSource.bus_stop,
});

const GuestList = (guestSources: GuestSource[]): GuestList => {
  const guestList: GuestList = {
    map: (cb) =>
      guestSources.map((guestSource, index) => cb(Guest(guestSource), index)),
    reduce: (cb, initial) =>
      guestSources.reduce(
        (acc, guestSource, index) =>
          cb(acc, Guest(guestSource), index, guestList),
        initial
      ),
    toArray: () => guestSources.map((guestSource) => Guest(guestSource)),
  };

  return guestList;
};

export const getGuests = async (): Promise<GuestList> => {
  return GuestList(await GuestRepository.getGuests());
};

export const getGuest = async (id: string): Promise<Guest | undefined> => {
  const guestSource = await GuestRepository.getGuest(id);

  return guestSource === undefined ? undefined : Guest(guestSource);
};

export const addGuest = async ({
  name,
  expectedAttendees,
}: Pick<Guest, "name" | "expectedAttendees">): Promise<void> => {
  return GuestRepository.addGuest({
    name,
    expectedAttendees,
    uuid: nanoid(),
    confirmedAttendees: null,
    bus: false,
    busStop: null,
    busSeats: null,
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

    if (guest.busSeats && guest.busSeats > (guest.confirmedAttendees ?? 0)) {
      errors.push(ValidationError.BUS_SEATS_OVER_CONFIRMED_ATTENDEES);
    }

    if (guest.busStop && !stops.includes(guest.busStop)) {
      errors.push(ValidationError.BUS_STOP_ERROR);
    }
  }

  return errors;
};

const isConfirmed = (guest: Guest): boolean =>
  (guest.confirmedAttendees ?? 0) > 0;

export const getStats = (guests: GuestList): Stats =>
  guests.reduce<Stats>(
    (acc, guest) => ({
      totalConfirmedGuests:
        acc.totalConfirmedGuests + (isConfirmed(guest) ? 1 : 0),
      totalCancelledAttendees:
        acc.totalCancelledAttendees +
        (isConfirmed(guest)
          ? 0
          : guest.expectedAttendees - (guest.confirmedAttendees ?? 0)),
      totalBusSeats: acc.totalBusSeats + (guest.busSeats || 0),
      seatsByStop: {
        ...acc.seatsByStop,
        ...(guest.busStop && {
          [guest.busStop]:
            (acc.seatsByStop[guest.busStop] ?? 0) + (guest.busSeats || 0),
        }),
      },
    }),
    {
      totalConfirmedGuests: 0,
      totalCancelledAttendees: 0,
      totalBusSeats: 0,
      seatsByStop: {},
    }
  );

export const totalConfirmedAttendees = (guests: GuestList): number =>
  guests.reduce(
    (acc, { confirmedAttendees }) => acc + (confirmedAttendees ?? 0),
    0
  );

export const totalExpectedAttendees = (guests: GuestList): number =>
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
