"use server";

import { getSupabaseAuth } from "@/lib/auth";
import { getErrorMessage } from "@/lib/utils";

export const createAccountAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await getSupabaseAuth().signUp({
      email,
      password,
    });
    if (error) throw error;

    const { data, error: loginError } =
      await getSupabaseAuth().signInWithPassword({
        email,
        password,
      });
    if (loginError) throw loginError;
    if (!data.session) throw new Error("No session");

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const loginAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error: loginError } =
      await getSupabaseAuth().signInWithPassword({
        email,
        password,
      });
    if (loginError) throw loginError;
    if (!data.session) throw new Error("No session");

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const signOutAction = async () => {
  try {
    const { error } = await getSupabaseAuth().signOut();
    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};
