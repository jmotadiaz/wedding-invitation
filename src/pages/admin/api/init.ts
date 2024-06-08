import { createClient } from "@vercel/postgres";

export async function GET() {
  let client;
  try {
    client = createClient({
      connectionString: import.meta.env.POSTGRES_URL_NON_POOLING,
    });
    await client.connect();
    const result = await client.sql`CREATE TABLE Guest (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        expected_attendees INTEGER NOT NULL,
        confirmed_attendees INTEGER NOT NULL,
        bus BOOLEAN NOT NULL,
        allergies TEXT,
        modified_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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
