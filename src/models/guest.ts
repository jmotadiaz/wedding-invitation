// src/models/guest.ts
export interface Guest {
  id: number;
  name: string;
  expectedAttendees: number;
  confirmedAttendees: number;
  allergies?: string;
}
