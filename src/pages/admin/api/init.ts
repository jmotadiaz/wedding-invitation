import { createClient } from "@vercel/postgres";

export async function GET() {
  let client;
  try {
    client = createClient({
      connectionString: import.meta.env.POSTGRES_URL_NON_POOLING,
    });
    await client.connect();
    const result = await client.sql`CREATE TABLE other (
        id SERIAL PRIMARY KEY,
        uuid VARCHAR(36) UNIQUE NOT NULL,
        name TEXT NOT NULL,
        expected_attendees INTEGER NOT NULL,
        confirmed_attendees INTEGER NOT NULL,
        bus BOOLEAN NOT NULL,
        allergies TEXT,
      );`;
    return new Response(
      JSON.stringify({
        result,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error,
      })
    );
  } finally {
    await client?.end();
  }
}
