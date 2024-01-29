import type { RequestEvent, Actions } from "./$types"
import { prisma } from "$lib/server/db"
import { tambahSchema } from "./schema"

export const actions: Actions = {
  tambah: async ev => {
    let success = false;
    let message = "Gagal"
    let form = tambahSchema.safeParse(await ev.request.formData())
    if (form.success) {
      let daftarIsi = await prisma.daftarIsi.findFirst({
        where: {
          mapId: ev.params.id,
          tahun: form.data.tahun,
        }
      })

      if (daftarIsi) {
        message = "Daftar Isi sudah ada " + form.data.tahun
      } else {
        await prisma.daftarIsi.create({
          data: {
            tahun: form.data.tahun,
            mapId: ev.params.id
          }
        })
        success = true;
        message = "Sukses"
      }
    } else {
      message = form.error.message
    }

    return {
      success,
      message
    }
  }
}

export const load = async (ev: RequestEvent) => {
  return {
    map: await prisma.map.findFirst({
      where: {
        id: ev.params.id
      }
    }),
    daftarIsi: await prisma.daftarIsi.findMany({
      where: {
        mapId: ev.params.id
      }
    })
  }
}
