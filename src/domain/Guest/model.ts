import type { GuestSource } from "../../repository/GuestRepository";

export class Guest {
  uuid: string;
  name: string;
  expectedAttendees: string[];
  confirmedAttendees: string[] | null;
  accommodation: boolean;
  bus: boolean;
  busStop: string | null;
  busSeats: number | null;
  allergies: string | null;

  constructor(guestSource: GuestSource) {
    this.uuid = guestSource.uuid;
    this.name = guestSource.name ?? "";
    this.expectedAttendees = guestSource.expected_attendees;
    this.confirmedAttendees = guestSource.confirmed_attendees;
    this.accommodation = guestSource.accommodation ?? false;
    this.bus = guestSource.bus ?? false;
    this.busStop = guestSource.bus_stop;
    this.busSeats = guestSource.bus_seats;
    this.allergies = guestSource.allergies;
  }
  get confirmed(): boolean {
    return this.hasAnswered() && this.confirmedAttendees.length > 0;
  }

  get declined(): boolean {
    return this.confirmedAttendees?.length === 0;
  }

  hasAnswered(): this is { confirmedAttendees: number } {
    return this.confirmedAttendees !== null;
  }
}

export interface Stats {
  totalConfirmedGuests: number;
  totalCancelledAttendees: number;
  totalBusSeats: number;
  seatsByStop: Record<string, number>;
}
