<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import FormTambahData from "./FormTambahData.svelte";
  import type { ActionData, PageData } from "./$types";
  import AlertDialog from "$lib/components/AlertDialog.svelte";
  import Dialog from "$lib/components/Dialog.svelte";
  import Label from "$lib/components/ui/label/label.svelte";

  export let data: PageData;
  export let form: ActionData;

  let search: string = "";

  $: listData =
    search.length <= 0
      ? data.daftarIsi
      : data.daftarIsi.filter((e) => e.tahun.toString().includes(search));
</script>

<AlertDialog
  openFirst={!!form}
  title="Tambah Daftar Isi"
  desc={form?.message}
  okOnly
  error={!form?.success}
/>

<div class="p-5 flex flex-col items-center">
  <div class="flex items-center gap-5 max-w-lg">
    <Input placeholder="Cari..." bind:value={search} />
    <FormTambahData />
  </div>
  <h3 class="text-lg font-bold my-5 underline">{data.map?.label}</h3>
  <div class="w-full max-w-lg">
    {#each listData as data}
      <a
        href="/map/{data.mapId}/{data.tahun}"
        class="flex w-full items-center gap-10 bg-white hover:scale-105 transition-all p-3 rounded-lg border shadow-md mb-3"
      >
        <h5 class="w-full text-start">{data.tahun}</h5>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class="flex items-center gap-2"
          on:click|stopPropagation|preventDefault={() => {}}
        >
          <Button href="/qr?url=/map/{data.id}"
            ><i class="fas fa-qrcode"></i></Button
          >
          <Dialog title="Edit Daftar Isi">
            <svelte:fragment slot="trigger">
              <Button variant="outline"
                ><i class="fas fa-pen-to-square"></i></Button
              >
            </svelte:fragment>
            <form action="?/edit" method="post">
              <input name="id" type="hidden" value={data.id} />
              <Label>Tahun</Label>
              <Input name="tahun" value={data.tahun} />
              <Button type="submit" class="mt-3">Simpan</Button>
            </form>
          </Dialog>
          <Dialog
            title="Hapus Daftar Isi"
            let:hide
            desc="Apakah Anda Yakin Ingin Menghapus Daftar Isi?"
          >
            <svelte:fragment slot="trigger">
              <Button variant="destructive"><i class="fas fa-trash"></i></Button
              >
            </svelte:fragment>
            <form action="?/hapus" method="post">
              <input name="id" type="hidden" value={data.id} />
              <Button type="reset" on:click={hide} variant="default"
                >Tidak</Button
              >
              <Button type="submit" variant="destructive">Ya</Button>
            </form>
          </Dialog>
        </div>
      </a>
    {/each}
  </div>
</div>
