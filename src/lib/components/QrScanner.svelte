<script lang="ts">
  import { Spinner } from "flowbite-svelte";
  import { Html5Qrcode } from "html5-qrcode";
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";

  export let onScan: (arg0: string) => void = () => {};
  export let onFail: (arg0: string) => void = () => {};
  export let onReady: () => void = () => {};

  let ready = false;

  let html5Qrcode: Html5Qrcode;

  function init() {
    html5Qrcode = new Html5Qrcode("reader");
    html5Qrcode
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: 300,
        },
        onScan,
        onFail,
      )
      .then((_) => {
        ready = true;
        onReady();
      });
    return async () => {
      await html5Qrcode.stop();
      html5Qrcode.clear();
    };
  }

  onMount(init);
</script>

<main
  class="w-full max-w-lg aspect-square border flex items-center justify-center rounded-xl shadow-md bg-black overflow-hidden relative"
>
  <reader id="reader" class="w-full h-full flex items-center justify-center" />
  {#if !ready}
    <div
      class="bg-white flex items-center justify-center absolute top-0 left-0 w-full h-full"
      transition:fade
    >
      <Spinner />
    </div>
  {/if}
</main>
