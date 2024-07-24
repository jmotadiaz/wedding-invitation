import { json2csv } from "json-2-csv";
import { getGuests } from "@domain/Guest";

export async function GET() {
  const guests = await getGuests();
  return new Response(json2csv(guests.toArray()), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="guests.csv"',
    },
  });
}
