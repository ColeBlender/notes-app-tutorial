"use server";

import db from "@/db";
import { notes } from "@/db/schemas/notes";
import { getUser } from "@/lib/auth";
import { getErrorMessage } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const addNewNoteAction = async (formData: FormData) => {
  try {
    const user = await getUser();

    const text = formData.get("text") as string;

    await db.insert(notes).values({ text, userId: user.id });

    revalidatePath("/");

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const deleteNoteAction = async (noteId: number) => {
  try {
    const user = await getUser();

    await db
      .delete(notes)
      .where(and(eq(notes.id, noteId), eq(notes.userId, user.id)));

    revalidatePath("/");

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const editNoteAction = async (formData: FormData) => {
  try {
    const user = await getUser();

    const text = formData.get("text") as string;
    const noteId = formData.get("noteId") as string;

    await db
      .update(notes)
      .set({ text, updatedAt: new Date() })
      .where(and(eq(notes.id, Number(noteId)), eq(notes.userId, user.id)));

    revalidatePath("/");

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};
