<script lang="ts">
  import Dialog from "$lib/components/Dialog.svelte";
  import Dropdown from "$lib/components/Dropdown.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { cn } from "$lib/utils";
  import type { Surat } from "@prisma/client";

  export let surat: Surat[] = [];
  export let onSearch = (surat: Surat[]) => {};
  export let onClear = () => {};
  export let totalData = surat.length;

  let filter = {
    asalSurat: "",
    nomorTerima: "",
    tanggalTerima: "",
    nomor: "",
    tanggal: "",
    perihal: "",
  };

  $: searchSurat = surat.filter((e) => {
    if (filter.asalSurat.length) {
      if (!e.asalSurat.toLowerCase().includes(filter.asalSurat.toLowerCase()))
        return false;
    }
    if (filter.nomorTerima.length) {
      if (
        !e.nomorTerima.toLowerCase().includes(filter.nomorTerima.toLowerCase())
      )
        return false;
    }
    if (filter.tanggalTerima.length) {
      if (
        !e.tanggalTerima
          .toLowerCase()
          .includes(filter.tanggalTerima.toLowerCase())
      )
        return false;
    }
    if (filter.nomor.length) {
      if (!e.nomor.toLowerCase().includes(filter.nomor.toLowerCase()))
        return false;
    }
    if (filter.tanggal.length) {
      if (!e.tanggal.toLowerCase().includes(filter.tanggal.toLowerCase()))
        return false;
    }
    if (filter.perihal.length) {
      if (!e.perihal.toLowerCase().includes(filter.perihal.toLowerCase()))
        return false;
    }
    return true;
  });

  $: filtered = searchSurat.length !== totalData;
</script>

<Dialog title="Filter Data" let:hide>
  <div slot="trigger">
    <Button variant="outline" class={cn(filtered ? "bg-green-200" : "")}
      >Filter</Button
    >
  </div>
  {#key filter}
    <div>
      <Label>Asal Surat</Label>
      <Dropdown
        none
        bind:value={filter.asalSurat}
        data={[...new Set(searchSurat.map((e) => e.asalSurat))].map((e) => ({
          label: e,
          value: e,
        }))}
      />
    </div>
    <div>
      <Label>Nomor Terima Surat</Label>
      <Dropdown
        none
        bind:value={filter.nomorTerima}
        data={[...new Set(searchSurat.map((e) => e.nomorTerima))].map((e) => ({
          label: e,
          value: e,
        }))}
      />
    </div>
    <div>
      <Label>Tanggal Terima Surat</Label>
      <Dropdown
        none
        bind:value={filter.tanggalTerima}
        data={[...new Set(searchSurat.map((e) => e.tanggalTerima))].map((e) => ({
          label: e,
          value: e,
        }))}
      />
    </div>
    <div>
      <Label>Nomor Surat</Label>
      <Dropdown
        none
        bind:value={filter.nomor}
        data={[...new Set(searchSurat.map((e) => e.nomor))].map((e) => ({
          label: e,
          value: e,
        }))}
      />
    </div>
    <div>
      <Label>Tanggal Surat</Label>
      <Dropdown
        none
        bind:value={filter.tanggal}
        data={[...new Set(searchSurat.map((e) => e.tanggal))].map((e) => ({
          label: e,
          value: e,
        }))}
      />
    </div>
    <div>
      <Label>Perihal</Label>
      <Dropdown
        none
        bind:value={filter.perihal}
        data={[...new Set(searchSurat.map((e) => e.perihal))].map((e) => ({
          label: e,
          value: e,
        }))}
      />
    </div>
  {/key}
  <div class="flex items-center gap-3 justify-end">
    <Button
      variant="destructive"
      on:click={() => {
        filter = {
          asalSurat: "",
          nomorTerima: "",
          tanggalTerima: "",
          nomor: "",
          tanggal: "",
          perihal: "",
        };
        onClear();
        hide();
      }}>Reset Filter</Button
    >
    <Button
      on:click={() => {
        onSearch(searchSurat);
        hide();
      }}>Cari</Button
    >
  </div>
</Dialog>
