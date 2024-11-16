import db from "@/lib/pg";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password } = body;

    const result = await db.query(
      `SELECT * FROM users WHERE email = '${email.toString()}' AND password = '${password.toString()}'`,
    );

    const findUser = result[0];

    if (!findUser) {
      return Response.json({ ok: false, message: "Usuario no encontrado" });
    }

    return Response.json({ ok: true, user: findUser });
  } catch (error) {
    console.log(error);
    return Response.json({ ok: false, message: "Error en el servidor" });
  }
}
