import type { GuestSource } from "../../repository/GuestRepository";

export class Guest {
  uuid: string;
  name: string;
  expectedAttendees: number;
  confirmedAttendees: number | null;
  accommodation: boolean;
  bus: boolean;
  busStop: string | null;
  busSeats: number | null;
  allergies: string | null;

  constructor(guestSource: GuestSource) {
    this.uuid = guestSource.uuid;
    this.name = guestSource.name ?? "";
    this.expectedAttendees = guestSource.expected_attendees ?? 0;
    this.confirmedAttendees = guestSource.confirmed_attendees;
    this.accommodation = guestSource.accommodation ?? false;
    this.bus = guestSource.bus ?? false;
    this.busStop = guestSource.bus_stop;
    this.busSeats = guestSource.bus_seats;
    this.allergies = guestSource.allergies;
  }
}

export class Guests {
  guests: GuestSource[];

  constructor(guests: GuestSource[]) {
    this.guests = guests;
  }

  map<T>(cb: (value: Guest, index: number) => T): T[] {
    return this.guests.map((guestSource, index) =>
      cb(new Guest(guestSource), index)
    );
  }

  reduce<T>(
    cb: (
      previousValue: T,
      currentValue: Guest,
      currentIndex: number,
      list: Guests
    ) => T,
    initial: T
  ): T {
    return this.guests.reduce(
      (acc, guestSource, index) => cb(acc, new Guest(guestSource), index, this),
      initial
    );
  }
  toArray(): Guest[] {
    return this.guests.map((guestSource) => new Guest(guestSource));
  }
}

export interface Stats {
  totalConfirmedGuests: number;
  totalCancelledAttendees: number;
  totalBusSeats: number;
  seatsByStop: Record<string, number>;
}
