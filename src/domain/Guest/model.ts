export interface Guest {
  uuid: string;
  name: string;
  expectedAttendees: number;
  confirmedAttendees: number | null;
  bus: boolean | null;
  busStop: string | null;
  busSeats: number | null;
  allergies: string;
}

export interface Stats {
  totalConfirmedGuests: number;
  totalCancelledAttendees: number;
  totalBusSeats: number;
  seatsByStop: Record<string, number>;
}
