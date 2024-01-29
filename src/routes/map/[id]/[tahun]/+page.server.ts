import type { RequestEvent, Actions } from "./$types";
import { editSchema, tambahSchema } from "./schema";
import { superValidate } from "sveltekit-superforms/server";
import { prisma } from "$lib/server/db";
import { error } from "@sveltejs/kit";

export async function load(ev: RequestEvent) {
  let tahun = parseInt(ev.params.tahun);

  if (isNaN(tahun)) throw error(400, "Invalid Date");

  let daftarIsi = await prisma.daftarIsi.findFirst({
    where: {
      tahun: tahun,
      mapId: ev.params.id,
    },
  });

  if (!daftarIsi) {
    console.log(daftarIsi);
    throw error(404, "Daftar Isi Tidak Ditemukan");
  }

  let surat = await prisma.surat.findMany({
    where: {
      daftarIsi: {
        mapId: ev.params.id,
        tahun: parseInt(ev.params.tahun),
      },
    },
  });

  return {
    form: await superValidate(tambahSchema),
    surat,
    daftarIsi,
  };
}

export const actions: Actions = {
  tambah: async (ev) => {
    let form = tambahSchema.safeParse(await ev.request.formData());
    let success = false;
    let message = "Gagal";

    if (form.success) {
      let daftarIsi = await prisma.daftarIsi.findFirst({
        where: {
          tahun: parseInt(ev.params.tahun),
          mapId: ev.params.id,
        },
      });

      if (daftarIsi) {
        await prisma.surat.create({
          data: {
            ...form.data,
            daftarIsiId: daftarIsi?.id,
          },
        });
        success = true;
        message = "Sukses";
      } else message = "Daftar Isi Tidak Ditemukan";
    } else {
      message = "Input invalid: " + form.error.flatten();
      console.log(form.error.errors);
    }

    return {
      success,
      message,
    };
  },
  hapus: async (ev) => {
    let success = false;
    let message = "Gagal";

    let rawId = (await ev.request.formData()).get("id")?.toString();

    if (rawId) {
      let id = parseInt(rawId);
      if (!isNaN(id)) {
        let surat = await prisma.surat.findFirst({
          where: {
            id: id,
            daftarIsi: {
              tahun: parseInt(ev.params.tahun),
              mapId: ev.params.id,
            },
          },
        });

        if (surat) {
          await prisma.surat.delete({
            where: {
              id: surat.id,
            },
          });
          success = true;
          message = "Sukses";
        } else {
          message = "Surat Tidak Ditemukan";
        }
      } else {
        message = "Id Surat Invalid";
      }
    } else {
      message = "Id Surat Diperlukan";
    }

    return { success, message };
  },

  edit: async (ev) => {
    let success = false;
    let message = "Gagal";

    let form = editSchema.safeParse(await ev.request.formData());

    if (form.success) {
      let { data } = form;
      console.log(data);

      let surat = await prisma.surat.findFirst({
        where: {
          id: data.id,
          daftarIsi: {
            tahun: parseInt(ev.params.tahun),
            mapId: ev.params.id,
          },
        },
      });

      if (surat) {
        await prisma.surat.update({
          where: {
            id: surat.id,
          },
          data: { ...data },
        });
        success = true;
        message = "Sukses";
      } else {
        message = "Surat Tidak Ditemukan";
      }
    } else {
      console.log(form.error.flatten(), "invalid input");
      message = "Invalid Input";
    }

    return { success, message };
  },
};
