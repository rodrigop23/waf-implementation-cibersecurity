// import db from "../../../lib/pg";

export async function POST(request: Request) {
  const body = await request.json();

  return Response.json({ body });
}

export async function GET(request: Request) {
  const body = await request.json();

  return Response.json({ body });
}

// export async function login(data: { [k: string]: FormDataEntryValue }) {
//   try {
//     const result = await db.query(
//       `SELECT * FROM users WHERE email = '${data.email.toString()}' AND password = '${data.password.toString()}'`,
//     );

//     const findUser = result[0];

//     if (!findUser) {
//       throw new Error("User not found");
//     }

//     await setSession(findUser.id);

//     console.log(findUser);
//   } catch (error: any) {
//     console.log(error);
//     throw new Error(error.message);
//   }
// }
