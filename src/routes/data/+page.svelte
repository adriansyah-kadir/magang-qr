<script lang="ts">
  import { Button, Input, Modal } from "flowbite-svelte";
  import { PlusSolid } from "flowbite-svelte-icons";
  import FormTambahData from "./FormTambahData.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;

  let showTambahForm = false;

  $: console.log(data);
</script>

<div class="p-5 flex flex-col items-center">
  <div class="flex items-center gap-5 max-w-lg">
    <Input placeholder="Cari..." />
    <Button on:click={() => (showTambahForm = true)}><PlusSolid /></Button>
    <Modal title="Tambah Data" bind:open={showTambahForm}>
      <FormTambahData />
    </Modal>
  </div>
  <div class="mt-10">
    {#each data.listData as data}
      <div class="flex items-center gap-10">
        <h5>{data.label}</h5>
        <Button href="/data/{data.id}/qr">QrCode</Button>
      </div>
    {/each}
  </div>
</div>
