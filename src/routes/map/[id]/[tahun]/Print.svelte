<script lang="ts">
  import type { Surat } from "@prisma/client";

  export let surat: Surat[] = [];
</script>

<table
  style="padding: 10px; text-align: center; border: 1px solid black; border-collapse: collapse; width: 795px; margin: auto;"
>
  <thead>
    <tr>
      <th
        style="padding: 10px; text-align: center; border: 1px solid black; border-collapse: collapse;"
        >NO</th
      >
      <th
        style="padding: 10px; text-align: center; border: 1px solid black; border-collapse: collapse;"
        >ASAL SURAT</th
      >
      <th
        style="padding: 10px; text-align: center; border: 1px solid black; border-collapse: collapse;"
        >NOMOR & TANGGAL <br /> TERIMA SURAT</th
      >
      <th
        style="padding: 10px; text-align: center; border: 1px solid black; border-collapse: collapse;"
        >NOMOR & TANGGAL <br /> SURAT</th
      >
      <th
        style="padding: 10px; text-align: center; border: 1px solid black; border-collapse: collapse;"
        >PERIHAL</th
      >
    </tr>
  </thead>
  <tbody>
    {#each surat as s, i}
      <tr>
        <td
          style="padding: 10px; text-align: center; border: 1px solid black; border-collapse: collapse;"
          >{i + 1}</td
        >
        <td
          style="padding: 10px; text-align: center; border: 1px solid black; border-collapse: collapse;"
          >{s.asalSurat}</td
        >
        <td
          style="padding: 10px; text-align: center; border: 1px solid black; border-collapse: collapse;"
          >({s.nomorTerima}) <br /> {s.tanggalTerima}</td
        >
        <td
          style="padding: 10px; text-align: center; border: 1px solid black; border-collapse: collapse;"
          >{s.nomor} <br /> {s.tanggal}</td
        >
        <td
          style="padding: 10px; text-align: center; border: 1px solid black; border-collapse: collapse;"
          >{s.perihal}</td
        >
      </tr>
    {/each}
  </tbody>
</table>
