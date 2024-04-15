import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { redirect } from "next/navigation";

export const getUser = async () => {
  const auth = getSupabaseAuth();
  const user = (await auth.getUser()).data.user;
  if (!user) redirect("/login");

  return user;
};

export const getSupabaseAuth = () => {
  const cookieStore = cookies();

  const supabaseClient = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {}
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {}
        },
      },
    },
  );
  return supabaseClient.auth;
};
