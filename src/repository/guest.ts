// src/data.ts
import type { Guest } from "../models/guest";

let guests: Guest[] = [
  {
    id: 1,
    name: "John Doe",
    expectedAttendees: 2,
    confirmedAttendees: 2,
    bus: false,
  },
  {
    id: 2,
    name: "Jane Smith",
    expectedAttendees: 4,
    confirmedAttendees: 3,
    bus: false,
  },
];

export function getGuests(): Guest[] {
  return guests;
}

export function getGuest(id: number): Guest | undefined {
  return guests.find((guest) => guest.id === id);
}

export function addGuest(guest: Omit<Guest, "id">): void {
  const newGuest = { ...guest, id: guests.length + 1 };
  guests.push(newGuest);
}

export function updateGuest(
  id: number,
  updatedGuest: Partial<Omit<Guest, "id">>
): void {
  const index = guests.findIndex((guest) => guest.id === id);
  if (index !== -1) {
    guests[index] = { ...guests[index], ...updatedGuest };
  }
}

export function deleteGuest(id: number): void {
  guests = guests.filter((guest) => guest.id !== id);
}
