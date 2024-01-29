import { redirect } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import type { User } from "@prisma/client";

export async function load(event: RequestEvent) {
  let user = event.locals.user;

  if (user == null) {
    if (event.url.pathname !== "/login") {
      let nextUrl = event.url.pathname;
      return redirect(302, `/login?next=${nextUrl}`);
    }
  }

  return {
    user: event.locals.user,
  };
}
