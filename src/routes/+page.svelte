<script lang="ts">
  import QrScanner from "$lib/components/QrScanner.svelte";
  import { ArrowKeyRight, GradientButton, Spinner } from "flowbite-svelte";

  let scanning: boolean = true;
  let data: string | null = null;
  let preparing = true;
</script>

<div class="p-5 max-w-lg m-auto">
  <QrScanner
    onScan={(ev) => {
      scanning = false;
      data = ev;
    }}
  />
  <GradientButton color="purpleToBlue" class="w-full mt-10">
    {#if preparing}
      <Spinner class="me-3" />
      Initializing...
    {:else if scanning}
      <Spinner class="me-3" />
      Scanning...
    {:else}
      Check <ArrowKeyRight />
    {/if}
  </GradientButton>
</div>
