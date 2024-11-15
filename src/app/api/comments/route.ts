import prisma from "../../../../prisma/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await prisma.comment.create({
      data: {
        content: body.comment,
      },
    });

    return Response.json({ ok: true, message: "Comentario creado" });
  } catch (error) {
    console.log(error);

    return Response.json({ ok: false });
  }
}

export async function GET() {
  try {
    const comments = await prisma.comment.findMany();

    return Response.json({
      ok: true,
      message: "Comentarios cargados",
      comments,
    });
  } catch (error) {
    console.log(error);

    return Response.json({ ok: false });
  }
}

export async function DELETE() {
  try {
    await prisma.comment.deleteMany();

    return Response.json({
      ok: true,
      message: "Los comentarios han sido eliminados",
    });
  } catch (error) {
    console.log(error);

    return Response.json({ ok: false });
  }
}
