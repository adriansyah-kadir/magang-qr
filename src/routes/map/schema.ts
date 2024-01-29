import { z } from "zod";
import { zfd } from "zod-form-data";

export const tambahSchema = zfd.formData({
  label: zfd.text(),
})
