import { loadUserFromCookie } from "$lib/server/utils";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ resolve, event }) => {
  let user = await loadUserFromCookie(event);

  if (user == null) {
    if (event.url.pathname !== "/login") {
      let nextUrl = event.url.pathname;
      return redirect(302, `/login?next=${nextUrl}`);
    }
  } else {
    event.locals.user = user;
  }

  return resolve(event);
};
