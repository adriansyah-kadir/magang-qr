<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";

  export let title: string | undefined = undefined;
  export let desc: string | undefined = undefined;

  let open = false;

  function hide() {
    open = false;
  }

  function show() {
    open = true;
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger>
    <slot name="trigger" />
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      {#if title}
        <Dialog.Title>{title}</Dialog.Title>
      {/if}
      {#if desc}
        <Dialog.Description>
          {desc}
        </Dialog.Description>
      {/if}
    </Dialog.Header>
    <slot {show} {hide} />
  </Dialog.Content>
</Dialog.Root>
