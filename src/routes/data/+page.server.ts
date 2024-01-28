import { type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/db";

export const actions: Actions = {
  tambah: async ev =>{
    let formData = await ev.request.formData();
    console.log(formData.getAll("files"))
    console.log(formData.getAll("names"))
  }
}

export const load: PageServerLoad = async ev => {

  return {
    listData: await prisma.data.findMany()
  }
}
