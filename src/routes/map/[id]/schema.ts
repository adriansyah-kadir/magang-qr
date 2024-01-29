import {zfd} from "zod-form-data"

export const tambahSchema = zfd.formData({
  tahun: zfd.numeric()
})
