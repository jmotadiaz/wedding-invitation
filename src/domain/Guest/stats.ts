import type { Guest, Stats } from "./model";

export const getStats = (guests: Guest[]): Stats =>
  guests.reduce<Stats>(
    (acc, guest) => ({
      totalConfirmedGuests:
        acc.totalConfirmedGuests + (guest.confirmed ? 1 : 0),
      totalCancelledAttendees:
        acc.totalCancelledAttendees +
        (guest.hasAnswered()
          ? guest.expectedAttendees - (guest.confirmedAttendees ?? 0)
          : 0),
      totalBusSeats: acc.totalBusSeats + (guest.busSeats || 0),
      seatsByStop: {
        ...acc.seatsByStop,
        ...(guest.busStop && {
          [guest.busStop]:
            (acc.seatsByStop[guest.busStop] ?? 0) + (guest.busSeats || 0),
        }),
      },
    }),
    {
      totalConfirmedGuests: 0,
      totalCancelledAttendees: 0,
      totalBusSeats: 0,
      seatsByStop: {},
    }
  );

export const totalConfirmedAttendees = (guests: Guest[]): number =>
  guests.reduce(
    (acc, { confirmedAttendees }) => acc + (confirmedAttendees ?? 0),
    0
  );

export const totalExpectedAttendees = (guests: Guest[]): number =>
  guests.reduce((acc, guest) => acc + guest.expectedAttendees, 0);
