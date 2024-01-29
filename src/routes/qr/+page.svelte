<script lang="ts">
  import QrCode from "$lib/components/QrCode.svelte";
  import { page } from "$app/stores";
  import { Button } from "$lib/components/ui/button";

  let url = $page.url.searchParams.get("url");

  const download = () => {
    let img = document.querySelector("#container img") as HTMLImageElement;
    if (img) {
      let a = document.createElement("a");
      a.href = img.src;
      a.download = "qrimage"
      a.click()
    }
  };
</script>

<div class="flex items-center justify-center flex-col" id="container">
  {#if url}
    <QrCode value={url} />
    <Button on:click={download}>Download</Button>
  {:else}
    <Button variant="destructive">Invalid Data</Button>
  {/if}
</div>
