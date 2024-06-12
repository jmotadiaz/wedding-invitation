export interface Guest {
  uuid: string;
  name: string;
  expectedAttendees: number;
  confirmedAttendees: number;
  bus: boolean;
  allergies: string;
}
