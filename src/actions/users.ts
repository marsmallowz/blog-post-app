"use server";

import { DtoUserCreate, DtoUserUpdate } from "@/model/user";
import { revalidatePath } from "next/cache";

export async function createUser({
  name,
  gender,
  email,
  status,
}: DtoUserCreate) {
  const res = await fetch("https://gorest.co.in/public/v2/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATA_TOKEN}`,
    },
    body: JSON.stringify({
      name,
      gender,
      email,
      status,
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to create user");
  }
  revalidatePath("/users");
  const data = await res.json();
  return data;
}

export async function updateUser({
  id,
  name,
  gender,
  email,
  status,
}: DtoUserUpdate) {
  const res = await fetch("https://gorest.co.in/public/v2/users/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATA_TOKEN}`,
    },
    body: JSON.stringify({
      name,
      gender,
      email,
      status,
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to update user");
  }
  revalidatePath("/users");
  const data = await res.json();
  return data;
}

export async function deleteUser(id: number) {
  const res = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATA_TOKEN}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to delete user");
  }
  revalidatePath("/users");
  return true;
}
