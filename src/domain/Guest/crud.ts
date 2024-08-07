import * as GuestRepository from "@repository/GuestRepository";
import { Guest } from "./model";

export const stops = ["Sevilla", "Los Palacios", "Trajano"];
export enum ValidationError {
  CONFIRMATION_REQUIRED,
  BUS_STOP_REQUIRED,
  BUS_STOP_ERROR,
  BUS_SEATS_REQUIRED,
  BUS_SEATS_OVER_CONFIRMED_ATTENDEES,
  GENERIC,
}

function nameToUrl(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+y\s+/g, "-")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export const getGuests = async (): Promise<Guest[]> => {
  return (await GuestRepository.getGuests()).map(
    (guestSource) => new Guest(guestSource)
  );
};

export const getGuest = async (id: string): Promise<Guest | undefined> => {
  const guestSource = await GuestRepository.getGuest(id);

  return guestSource && new Guest(guestSource);
};

export const addGuest = async ({
  name,
  expectedAttendees,
  uuid,
}: Pick<Guest, "name" | "expectedAttendees" | "uuid">): Promise<void> => {
  return GuestRepository.addGuest({
    name,
    expectedAttendees,
    accommodation: false,
    uuid: nameToUrl(uuid),
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
  if (confirmedAttendees === 0) {
    return GuestRepository.updateGuest(id, {
      confirmedAttendees,
      allergies: "",
      bus: false,
      busSeats: null,
      busStop: null,
    });
  }

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

export const updateAccommodation = async (
  id: string,
  accommodation: boolean
) => {
  const guest = await getGuest(id);

  if (!guest?.declined) {
    return GuestRepository.updateGuest(id, { accommodation });
  }
};
