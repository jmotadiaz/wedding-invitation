// src/data.ts
import * as devGuest from "./guest.dev.ts";
import * as prodGuest from "./guest.prod.ts";

export const addGuest =
  import.meta.env.MODE === "production"
    ? prodGuest.addGuest
    : devGuest.addGuest;
export const deleteGuest =
  import.meta.env.MODE === "production"
    ? prodGuest.deleteGuest
    : devGuest.deleteGuest;
export const getGuest =
  import.meta.env.MODE === "production"
    ? prodGuest.getGuest
    : devGuest.getGuest;
export const getGuests =
  import.meta.env.MODE === "production"
    ? prodGuest.getGuests
    : devGuest.getGuests;
