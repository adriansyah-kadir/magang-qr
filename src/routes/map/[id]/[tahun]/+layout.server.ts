import { prisma } from "$lib/server/db"
import {type RequestEvent} from "@sveltejs/kit"

export const load = async (ev: RequestEvent) => {
  let data = await prisma.data.findFirst({where:{
    id: ev.params.id
  }, include: {files: true}})

  return {
    id: ev.params.id,
    data,
  }
}
