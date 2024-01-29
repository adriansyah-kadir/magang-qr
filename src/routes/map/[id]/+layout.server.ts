import { prisma } from "$lib/server/db"
import { error, fail } from "@sveltejs/kit"
import type {RequestEvent} from "./$types"

export async function load(ev: RequestEvent){
  let map = await prisma.map.findFirst({where: {
    id: ev.params.id
  }})

  if(!map) throw error(404, "Map Not Found")

  return {
    map,
  }
}
