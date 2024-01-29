<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button } from "$lib/components/ui/button";
  import * as Table from "$lib/components/ui/table";
  import { type Surat } from "@prisma/client";
  import type { ActionData } from "./$types";
  import AlertDialog from "$lib/components/AlertDialog.svelte";
  import Dialog from "$lib/components/Dialog.svelte";
  import { Label } from "$lib/components/ui/label";
  import { Input } from "$lib/components/ui/input";

  export let surat: Surat[] = [];
  export let form: ActionData;
</script>

{#key form}
  <AlertDialog
    openFirst={!!form}
    okOnly
    error={!form?.success}
    title="Hapus Surat"
    desc={form?.message}
  />
{/key}

<Table.Root class="border rounded-xl shadow-2xl bg-white">
  <Table.Caption>{surat.length > 0 ? "Data Surat" : "Empty"}</Table.Caption>
  <Table.Header>
    <Table.Row class="px-4 [&>*]:py-2">
      <Table.Head class="text-center">No</Table.Head>
      <Table.Head class="text-center">Asal Surat</Table.Head>
      <Table.Head class="text-center text-nowrap">Nomor Terima Surat</Table.Head
      >
      <Table.Head class="text-center text-nowrap"
        >Tanggal Terima Surat</Table.Head
      >
      <Table.Head class="text-center text-nowrap">Nomor Surat</Table.Head>
      <Table.Head class="text-center text-nowrap">Tanggal Surat</Table.Head>
      <Table.Head class="text-center">Perihal</Table.Head>
      <Table.Head class="text-center">Aksi</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each surat as s, i}
      <Table.Row class="text-center [&>*]:px-4 [&>*]:py-4">
        <Table.Cell>{i + 1}</Table.Cell>
        <Table.Cell>{s.asalSurat}</Table.Cell>
        <Table.Cell>{s.nomorTerima}</Table.Cell>
        <Table.Cell>{s.tanggalTerima}</Table.Cell>
        <Table.Cell>{s.nomor}</Table.Cell>
        <Table.Cell>{s.tanggal}</Table.Cell>
        <Table.Cell>{s.perihal}</Table.Cell>
        <Table.Cell class="flex gap-2 justify-center">
          <form method="post" action="?/hapus" use:enhance>
            <input type="hidden" value={s.id} name="id" />
            <Button variant="destructive" type="submit" name="Hapus"
              ><i class="fas fa-trash"></i></Button
            >
          </form>
          <Dialog let:hide>
            <svelte:fragment slot="trigger">
              <Button variant="default" title="Edit"
                ><i class="fas fa-pen-to-square"></i></Button
              >
            </svelte:fragment>
            <form
              use:enhance
              method="post"
              action="?/edit"
              class="[&>*]:mt-3"
            >
              <h4 class="text-xl font-bold">Edit Data</h4>
              <input type="hidden" value={s.id} name="id"/>
              <div>
                <Label>Asal Surat</Label>
                <Input name="asalSurat" required value={s.asalSurat} />
              </div>
              <div>
                <Label>Nomor Surat Terima</Label>
                <Input name="nomorTerima" required value={s.nomorTerima} />
              </div>
              <div>
                <Label>Tanggal Surat Terima</Label>
                <Input
                  type="date"
                  name="tanggalTerima"
                  required
                  value={s.tanggalTerima}
                />
              </div>
              <div>
                <Label>Nomor Surat</Label>
                <Input name="nomor" required value={s.nomor} />
              </div>
              <div>
                <Label>Tanggal Surat</Label>
                <Input type="date" name="tanggal" required value={s.tanggal} />
              </div>
              <div>
                <Label>Perihal</Label>
                <Input name="perihal" required value={s.perihal} />
              </div>
              <Button type="submit" on:click={hide}>Submit</Button>
            </form>
          </Dialog>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
