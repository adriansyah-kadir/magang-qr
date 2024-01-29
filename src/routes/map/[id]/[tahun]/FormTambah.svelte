<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Label } from "$lib/components/ui/label";
  import { Input } from "$lib/components/ui/input";
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<form use:enhance method="post" action="?/tambah" class="[&>*]:mt-3">
  <h4 class="text-xl font-bold">Tambah Data</h4>
  <div>
    <Label>Asal Surat</Label>
    <Input name="asalSurat" required/>
  </div>
  <div>
    <Label>Nomor Surat Terima</Label>
    <Input name="nomorTerima" required/>
  </div>
  <div>
    <Label>Tanggal Surat Terima</Label>
    <Input type="date" name="tanggalTerima" required/>
  </div>
  <div>
    <Label>Nomor Surat</Label>
    <Input name="nomor" required/>
  </div>
  <div>
    <Label>Tanggal Surat</Label>
    <Input type="date" name="tanggal" required/>
  </div>
  <div>
    <Label>Perihal</Label>
    <Input name="perihal" required/>
  </div>
  <Form.Button type="submit">Submit</Form.Button>
</form>
