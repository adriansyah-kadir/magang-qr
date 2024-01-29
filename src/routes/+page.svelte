<script lang="ts">
  import QrScanner from "$lib/components/QrScanner.svelte";
  import { Button } from "$lib/components/ui/button";
  import { ArrowKeyRight, GradientButton, Spinner } from "flowbite-svelte";

  let scanning: boolean = true;
  let data: string | null = null;
  let preparing = true;
</script>

<div class="p-5 max-w-lg m-auto">
  <QrScanner
    onReady={() => {
      preparing = false;
    }}
    onScan={(ev) => {
      scanning = false;
      data = ev;
    }}
  />
  <Button
    class="w-full mt-5"
    on:click={() => {
      if (data) {
        location.assign(data);
      }
    }}
  >
    {#if preparing}
      <div class="border w-5 h-5 rounded-full border-b-black animate-spin mr-3"></div>
      Initializing...
    {:else if scanning}
      <div class="border w-5 h-5 rounded-full border-b-black animate-spin mr-3"></div>
      Scanning...
    {:else}
      Check <ArrowKeyRight />
    {/if}
  </Button>
</div>
