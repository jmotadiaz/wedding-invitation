export interface Guest {
  uuid: string;
  name: string;
  expectedAttendees: number;
  confirmedAttendees: number;
  bus: boolean;
  busStop: string | null;
  busSeats: number | null;
  allergies: string;
}

export type BusStop = "Sevilla" | "Los Palacios" | "Trajano";

export interface Stats {
  totalConfirmedAttendees: number;
  totalExpectedAttendees: number;
  totalBusSeats: number;
  seatsByStop: Record<BusStop, number>;
}
