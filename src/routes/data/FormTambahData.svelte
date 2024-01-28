<script lang="ts">
  import { Button, GradientButton, Input, Label } from "flowbite-svelte";
  import {
    FilePlusSolid,
    TrashBinSolid,
    EyeSolid,
  } from "flowbite-svelte-icons";

  let files: { name?: string; value?: File }[] = [];
</script>

<form
  action="?/tambah"
  method="post"
  enctype="multipart/form-data"
  class="flex flex-col gap-5"
>
  <div>
    <Label>Label</Label>
    <Input />
  </div>
  <div>
    <Label>Files</Label>
    {#each files as file, id (file)}
      <div class="p-2 rounded-md border shadow-sm my-3">
        <Input
          bind:value={file.name}
          placeholder="Filename"
          class="mb-1"
          name="names"
        />
        <div class="flex items-center gap-3">
          <input
            class="w-full"
            type="file"
            name="files"
            bind:value={file.value}
          />
          <Button
            color="red"
            size="xs"
            on:click={() => {
              let index = files.indexOf(file);
              index = index >= 0 ? index : id;
              files.splice(index, 1);
              files = files;
            }}><TrashBinSolid /></Button
          >
          <Button
            color="blue"
            size="xs"
            on:click={() => {
              if (file.value) {
                console.log(file.value);
              }
            }}><EyeSolid /></Button
          >
        </div>
      </div>
    {/each}
    <div></div>
    <GradientButton
      on:click={() => (files = [...files, {}])}
      shadow
      color="blue"
      class="w-full">Add Files <FilePlusSolid class="ml-2" /></GradientButton
    >
  </div>
  <div class="flex items-center">
    <div class="w-full"></div>
    <Button type="submit">Submit</Button>
  </div>
</form>
