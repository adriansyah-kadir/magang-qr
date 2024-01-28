import {type RequestEvent} from "@sveltejs/kit"

export const load = async (ev: RequestEvent) => {

  return {
    id: ev.params.id
  }
}
