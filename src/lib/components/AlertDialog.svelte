<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { onMount } from "svelte";
  import { Button } from "./ui/button";

  export let title: string | undefined;
  export let desc: string | undefined;
  export let onCancel: () => void = () => {};
  export let onClick: () => void = () => {};
  export let openFirst = false;
  export let okOnly = false;
  export let error = false;

  let open = false;

  onMount(() => {
    open = openFirst;
  });
</script>

<AlertDialog.Root {open}>
  {#if $$slots.trigger}
    <AlertDialog.Trigger>
      <slot name="trigger" />
    </AlertDialog.Trigger>
  {/if}
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>{title}</AlertDialog.Title>
      <AlertDialog.Description>
        {desc}
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      {#if !okOnly}
        <AlertDialog.Cancel on:click={onCancel}>Cancel</AlertDialog.Cancel>
      {/if}
      <Button
        variant={error ? "destructive" : "default"}
        on:click={() => {
          open = false;
          onClick();
        }}>Continue</Button
      >
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
