import * as GuestRepository from "@repository/GuestRepository";
import csvToJson from "csvtojson";
import { Guest } from "./model";
import { arrayFrom } from "@utils";

const DEFAULT_GUEST_VALUES = {
  accommodation: false,
  confirmedAttendees: null,
  bus: false,
  busStop: null,
  busSeats: null,
  allergies: "",
} as const;

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
}: Pick<Guest, "name" | "expectedAttendees" | "uuid">): Promise<Guest> => {
  return new Guest(
    await GuestRepository.addGuest({
      name,
      expectedAttendees,
      uuid: nameToUrl(uuid),
      ...DEFAULT_GUEST_VALUES,
    })
  );
};

export const dumpGuests = async (csv: string): Promise<void> => {
  const rawGuests = await csvToJson().fromString(csv);

  GuestRepository.dumpGuests(
    rawGuests.map((rawGuest) => ({
      ...DEFAULT_GUEST_VALUES,
      name: rawGuest["Invitación"],
      uuid: nameToUrl(rawGuest["URL"] || rawGuest["Invitación"]),
      expectedAttendees: arrayFrom(parseInt(rawGuest["N Pax"] || "0")).map(
        (n) => rawGuest[`Asistente ${n}`] || `Invitado ${n}`
      ),
    }))
  );
};

export const deleteGuest = async (id: string): Promise<void> => {
  return GuestRepository.deleteGuest(id);
};

export const validateBus = (
  guest: Pick<Guest, "confirmedAttendees" | "bus" | "busSeats" | "busStop">
): ValidationError[] => {
  const errors: ValidationError[] = [];
  if (guest.bus) {
    if (!guest.busStop) {
      errors.push(ValidationError.BUS_STOP_REQUIRED);
    }

    if (!guest.busSeats) {
      errors.push(ValidationError.BUS_SEATS_REQUIRED);
    }

    if (
      guest.busSeats &&
      guest.busSeats > (guest.confirmedAttendees?.length ?? 0)
    ) {
      errors.push(ValidationError.BUS_SEATS_OVER_CONFIRMED_ATTENDEES);
    }

    if (guest.busStop && !stops.includes(guest.busStop)) {
      errors.push(ValidationError.BUS_STOP_ERROR);
    }
  }

  return errors;
};

export const validateGuest = (
  guest: Pick<Guest, "confirmedAttendees">,
  declineInvitation: boolean
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (guest.confirmedAttendees?.length === 0 && !declineInvitation) {
    errors.push(ValidationError.CONFIRMATION_REQUIRED);
  }

  return errors;
};

const buildGuest = (
  rawGuest: GuestRepository.GuestSource | undefined
): Guest | undefined => rawGuest && new Guest(rawGuest);

export const confirmGuest = async (
  id: string,
  {
    confirmedAttendees,
    allergies,
    bus,
    declineInvitation,
  }: Pick<Guest, "confirmedAttendees" | "allergies" | "bus"> & {
    declineInvitation: boolean;
  }
): Promise<Guest | undefined> => {
  if (declineInvitation) {
    return buildGuest(
      await GuestRepository.updateGuest(id, {
        confirmedAttendees: [],
        allergies: "",
        bus: false,
        busSeats: null,
        busStop: null,
      })
    );
  }

  const parsedGuest = {
    allergies,
    confirmedAttendees,
    bus,
  };

  const errors = validateGuest(parsedGuest, declineInvitation);

  if (errors.length) {
    return Promise.reject(errors);
  }

  return buildGuest(await GuestRepository.updateGuest(id, parsedGuest));
};

export const updateAccommodation = async (
  id: string,
  accommodation: boolean
): Promise<Guest | undefined> => {
  const guest = await getGuest(id);

  if (!guest?.declined) {
    const rawGuest = await GuestRepository.updateGuest(id, { accommodation });
    return rawGuest && new Guest(rawGuest);
  }
};

export const updateInfo = async (
  id: string,
  info: string
): Promise<Guest | undefined> => {
  const rawGuest = await GuestRepository.updateGuest(id, { busStop: info });
  return rawGuest && new Guest(rawGuest);
};
