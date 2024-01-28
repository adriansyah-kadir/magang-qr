<script lang="ts">
  import qrcode from "qrcode-generator";
  import { onMount } from "svelte";

  export let value: string = "test";

  let qrImg: string = "Loading...";

  onMount(() => {
    let qr = qrcode(4, "L");
    qr.addData(value);
    qr.make();
    qrImg = qr.createImgTag(5);
  });
</script>

<div class="flex items-center justify-center">
  <div>
    {@html qrImg}
  </div>
</div>
