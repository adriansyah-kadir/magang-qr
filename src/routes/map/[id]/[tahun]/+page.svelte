<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import type { Surat } from "@prisma/client";
  import type { ActionData, PageData } from "./$types";
  import FormTambah from "./FormTambah.svelte";
  import TableSurat from "./TableSurat.svelte";
  import { jsPDF } from "jspdf";
  import autotable from "jspdf-autotable";
  import Dialog from "$lib/components/Dialog.svelte";
  import FilterData from "./FilterData.svelte";

  export let data: PageData;
  export let form: ActionData;

  function Popup(surat: Surat[]) {
    let doc = new jsPDF();
    autotable(doc, {
      head: [
        [
          "No",
          "Asal Surat",
          "Nomor & Tanggal \n Terima Surat",
          "Nomor & Tanggal \n Surat",
          "Perihal",
        ],
      ],
      body: surat.map((e, i) => [
        i + 1,
        e.asalSurat,
        `${e.nomorTerima} \n ${e.tanggalTerima}`,
        `${e.nomor} \n ${e.tanggal}`,
        e.perihal,
      ]),
      theme: "plain",
      styles: {
        font: "Times New Roman",
        lineWidth: 0.001,
        lineColor: "black",
        halign: "center",
        valign: "middle",
        fillColor: "white",
        textColor: "black",
      },
    });
    doc.save(`${data.map.label} (${data.daftarIsi.tahun}).pdf`);

    return true;
  }

  let open = false;

  $: surat = data.surat;
  $: console.log(surat);
</script>

<div class="p-10">
  <div class="sm:flex gap-5">
    <div class="w-full">
      <div class="pb-4 flex items-center gap-4">
        <Button on:click={() => (open = !open)}>Tambah Data</Button>
        <Button variant="outline" on:click={() => Popup(surat)}>Download</Button
        >
        <FilterData
          totalData={data.surat.length}
          {surat}
          onSearch={(s) => {
            surat = s;
          }}
          onClear={() => {
            surat = data.surat;
          }}
        />
        <div class="w-full"></div>
      </div>
      <div class="flex flex-col sm:flex-row gap-5 py-4">
        {#if open}
          <div
            class="flex-shrink-0 rounded-xl border p-5 shadow-sm hover:ring w-full max-w-sm transition-all bg-white"
          >
            <FormTambah {form} />
          </div>
        {/if}
        <TableSurat {surat} {form} />
      </div>
    </div>
  </div>
</div>
