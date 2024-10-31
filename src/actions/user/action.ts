/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { setSession } from "@/lib/session";
// import prisma from "../../../prisma/db";
// import bcrypt from "bcrypt";
import { invalidateSession, validateRequest } from "@/lib/auth";
import db from "../../lib/pg";

export async function login(data: { [k: string]: FormDataEntryValue }) {
  try {
    // const findUser = await prisma.user.findUnique({
    //   where: {
    //     email: data.email as string,
    //   },
    // });

    const result = await db.query(
      `SELECT * FROM users WHERE email = '${data.email.toString()}' AND password = '${data.password.toString()}'`,
    );

    const findUser = result[0];

    if (!findUser) {
      throw new Error("User not found");
    }

    // const passwordMatch = bcrypt.compareSync(
    //   data.password as string,
    //   findUser.password,
    // );

    // if (!passwordMatch) {
    // throw new Error("Password does not match");
    // }

    await setSession(findUser.id);

    console.log(findUser);
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function register(data: { [k: string]: FormDataEntryValue }) {
  console.log("register", data);
  try {
    // const findUser = await prisma.user.findUnique({
    //   where: {
    //     email: data.email as string,
    //   },
    // });

    // if (findUser) {
    //   throw new Error("User already exists");
    // }

    // const hashedPassword = bcrypt.hashSync(data.password as string, 10);

    // const newUser = await prisma.user.create({
    //   data: {
    //     name: data.first_name as string,
    //     lastname: data.last_name as string,
    //     email: data.email as string,
    //     password: data.password as string,
    //   },
    // });

    const result = await db.query(
      `INSERT INTO users (name, lastname, email, password) VALUES ('${data.first_name.toString()}', '${data.last_name.toString()}', '${data.email.toString()}', '${data.password.toString()}') RETURNING *`,
    );

    const newUser = result[0];

    await setSession(newUser.id);

    console.log(newUser);
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function logout() {
  const { session } = await validateRequest();

  if (!session) {
    return true;
  }

  await invalidateSession(session.id);

  return true;
}
