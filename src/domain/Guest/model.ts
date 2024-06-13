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
