import type { Actions } from "@sveltejs/kit";
import { loginSchema } from "./schema";
import { prisma } from "$lib/server/db";
import { login } from "$lib/server/utils";

export const actions: Actions = {
  login: async (ev) => {
    let success = false;
    let message = "Gagal";

    let form = loginSchema.safeParse(await ev.request.formData());

    if (form.success) {
      let user = await prisma.user.findFirst({
        where: {
            username: form.data.username,
            password: form.data.password
        },
      });

      if (user) {
        await login(user, ev, form.data.remember ? 7 : 1);
        success = true;
        message = "Sukses";
      } else {
        message = "User Not Found";
      }
    } else {
      message = "Invalid Credentials";
    }

    return {
      success,
      message,
    };
  },
};
