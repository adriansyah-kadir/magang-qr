import { zfd } from "zod-form-data";

export const tambahSchema = zfd.formData({
  asalSurat: zfd.text(),
  nomorTerima: zfd.text(),
  tanggalTerima: zfd.text(),
  nomor: zfd.text(),
  tanggal: zfd.text(),
  perihal: zfd.text(),
})

export const editSchema = zfd.formData({
  id: zfd.numeric(),
  asalSurat: zfd.text(),
  nomorTerima: zfd.text(),
  tanggalTerima: zfd.text(),
  nomor: zfd.text(),
  tanggal: zfd.text(),
  perihal: zfd.text(),
})


export type TambahSchema = typeof tambahSchema
