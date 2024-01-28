<script lang="ts">
  import QrCode from "$lib/components/QrCode.svelte";

  export let data: any;
</script>

<div>
  <QrCode value="/data/{data.id}/qr"/>
</div>
