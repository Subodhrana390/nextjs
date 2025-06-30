import { query, rowToChallenge } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const awaitedParams = await params;
    const result = await query("SELECT * FROM challenges WHERE id = $1", [
      awaitedParams.id,
    ]);

    if (result.rows.length === 0) {
      return Response.json({ error: "Challenge not found" }, { status: 404 });
    }

    return Response.json(rowToChallenge(result.rows[0]));
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
