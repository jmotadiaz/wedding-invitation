import db from "@repository/db";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ redirect }) => {
	try {
		await db.schema
			.createTable("guest")
			.addColumn("id", "integer", (cb) =>
				cb.primaryKey().autoIncrement().notNull(),
			)
			.addColumn("name", "text", (cb) => cb.notNull())
			.addColumn("expected_attendees", "integer")
			.addColumn("confirmed_attendees", "integer")
			.addColumn("bus", "boolean")
			.addColumn("allergies", "text")
			.addColumn("modified_at", "text")
			.execute();

		return redirect("/admin", 307);
	} catch (error) {
		return new Response(
			JSON.stringify({
				error,
			}),
		);
	}
};
