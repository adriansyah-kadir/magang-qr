<script lang="ts">
  import AlertDialog from "$lib/components/AlertDialog.svelte";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  let open = false;

  onMount(() => (open = true));
</script>

<AlertDialog
  onClick={() => {
    history.back();
  }}
  openFirst
  okOnly
  title={$page.status.toString()}
  desc={$page.error?.message ?? "Not Found"}
  error
></AlertDialog>
