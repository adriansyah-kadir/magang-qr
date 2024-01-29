import { zfd } from "zod-form-data";

export const loginSchema = zfd.formData({
    username: zfd.text(),
    password: zfd.text(),
    remember: zfd.checkbox(),
})