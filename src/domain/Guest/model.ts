export interface Guest {
  uuid: string;
  name: string;
  expectedAttendees: number;
  confirmedAttendees: number | null;
  bus: boolean | null;
  busStop: string | null;
  busSeats: number | null;
  allergies: string | null;
}

export interface GuestList {
  map: <T>(cb: (value: Guest, index: number) => T) => T[];
  reduce: <T>(
    callbackfn: (
      previousValue: T,
      currentValue: Guest,
      currentIndex: number,
      list: GuestList
    ) => T,
    initialValue: T
  ) => T;
  toArray: () => Guest[];
}

export interface Stats {
  totalConfirmedGuests: number;
  totalCancelledAttendees: number;
  totalBusSeats: number;
  seatsByStop: Record<string, number>;
}
