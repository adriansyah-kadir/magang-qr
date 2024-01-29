<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import FormTambahData from "./FormTambahData.svelte";
  import type { ActionData, PageData } from "./$types";
  import AlertDialog from "$lib/components/AlertDialog.svelte";
  import Dialog from "$lib/components/Dialog.svelte";
  import { Label } from "$lib/components/ui/label";

  export let data: PageData;
  export let form: ActionData;

  let search: string = "";

  $: listData =
    search.length <= 0
      ? data.maps
      : data.maps.filter((e) =>
          e.label.toLowerCase().includes(search.toLowerCase())
        );
</script>

<AlertDialog
  openFirst={!!form}
  okOnly
  title="Tambah Map"
  desc={form?.message}
  error={!form?.success}
/>

<div class="p-5 flex flex-col items-center">
  <div class="flex items-center gap-5 max-w-lg">
    <Input placeholder="Cari..." bind:value={search} />
    <FormTambahData />
  </div>
  <div class="mt-10 w-full max-w-lg">
    {#each listData as data}
      <a
        href="/map/{data.id}"
        class="flex w-full items-center gap-10 hover:scale-105 transition-all px-3 py-2 rounded-lg border shadow-md mb-3 bg-white"
      >
        <h5 class="w-full text-start">{data.label}</h5>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class="flex items-center gap-2"
          on:click|stopPropagation|preventDefault={() => {}}
        >
          <Button href="/qr?url=/map/{data.id}"
            ><i class="fas fa-qrcode"></i></Button
          >
          <Dialog title="Edit Map">
            <svelte:fragment slot="trigger">
              <Button variant="outline"
                ><i class="fas fa-pen-to-square"></i></Button
              >
            </svelte:fragment>
            <form action="?/edit" method="post">
              <input name="id" type="hidden" value={data.id} />
              <Label>Label</Label>
              <Input name="tahun" value={data.label} />
              <Button type="submit" class="mt-3">Simpan</Button>
            </form>
          </Dialog>
          <Dialog title="Hapus Map" let:hide desc="Apakah Anda Yakin Ingin Menghapus Map?">
            <svelte:fragment slot="trigger">
              <Button variant="destructive"><i class="fas fa-trash"></i></Button
              >
            </svelte:fragment>
            <form action="?/hapus" method="post">
              <input name="id" type="hidden" value={data.id} />
              <Button type="reset" on:click={hide} variant="default">Tidak</Button>
              <Button type="submit" variant="destructive">Ya</Button>
            </form>
          </Dialog>
        </div>
      </a>
    {/each}
  </div>
</div>
