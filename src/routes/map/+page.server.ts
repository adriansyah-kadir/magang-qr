import { type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/db";
import { tambahSchema } from "./schema";

export const actions: Actions = {
  tambah: async ev => {
    let success = false
    let message = "Gagal"
    let data = tambahSchema.safeParse(await ev.request.formData())

    if (data.success) {
      let map = await prisma.map.findFirst({
        where: {
          label: data.data.label
        }
      })

      if (map) {
        message = "Map Exists: " + map.label
      } else {
        await prisma.map.create({
          data: {
            label: data.data.label
          }
        })
        success = true;
        message = "Sukses"
      }

    } else {
      message = data.error.message
    }

    return {
      success,
      message
    }
  }
}

export const load: PageServerLoad = async ev => {

  return {
    maps: await prisma.map.findMany()
  }
}
