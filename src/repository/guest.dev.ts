// src/data.ts
import type { Guest, GuestInput } from "./db";

let guests: Guest[] = [
  {
    id: 1,
    name: "John Doe",
    expected_attendees: 2,
    confirmed_attendees: 2,
    bus: false,
    allergies: "",
    modified_at: new Date(),
  },
  {
    id: 2,
    name: "Jane Smith",
    expected_attendees: 4,
    confirmed_attendees: 3,
    bus: false,
    allergies: "",
    modified_at: new Date(),
  },
];

export function getGuests(): Guest[] {
  return guests;
}

export function getGuest(id: number): Guest | undefined {
  return guests.find((guest) => guest.id === id);
}

export function addGuest(guest: Omit<GuestInput, "id" | "modified_at">): void {
  const newGuest: Guest = {
    ...guest,
    id: guests.length + 1,
    modified_at: new Date(),
    allergies: "",
  };
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
