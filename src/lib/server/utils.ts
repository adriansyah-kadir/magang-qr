import { PUBLIC_COOKIE_NAME } from "$env/static/public";
import type { User } from "@prisma/client";
import type { RequestEvent } from "@sveltejs/kit";
import { prisma } from "./db";

export async function loadUserFromCookie(
  ev: RequestEvent
): Promise<User | null> {
  let sessionId = ev.cookies.get(PUBLIC_COOKIE_NAME);
  if (!!!sessionId) return null;

  let user = await prisma.user.findFirst({
    where: { session: { id: sessionId } },
  });

  if (!!!user) {
    await prisma.session.deleteMany({
      where: {
        id: sessionId,
      },
    });

    return null;
  }

  console.log("logged in from cookies " + user.username);
  return user;
}

export async function login(user: User, event: RequestEvent, days: number) {
  let date = new Date();
  date.setDate(date.getDate() + days);

  await prisma.session.deleteMany({
    where: {
      userId: user.id,
    },
  });

  let session = await prisma.session.create({
    data: {
      userId: user.id,
    },
  });

  event.cookies.set(PUBLIC_COOKIE_NAME, session.id, {
    path: "/",
    expires: date,
    secure: false,
    httpOnly: false
  });
}
