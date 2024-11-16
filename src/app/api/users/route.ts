import db from "@/lib/pg";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { first_name, last_name, email, password } = body;

    const result = await db.query(
      `INSERT INTO users (name, lastname, email, password) VALUES ('${first_name}', '${last_name}', '${email}', '${password}') RETURNING *`,
    );

    const newUser = result[0];

    if (!newUser) {
      return Response.json({ ok: false, message: "Error al crear usuario" });
    }

    return Response.json({ ok: true, user: newUser });
  } catch (error) {
    console.log(error);
    return Response.json({ ok: false, message: "Error en el servidor" });
  }
}
