<script lang="ts">
    import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
</script>

<Dialog.Root>
  <Dialog.Trigger>
  <Button>Tambah</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Tambah Data</Dialog.Title>
      <Dialog.Description>
        Tambah Data Daftar Isi
      </Dialog.Description>
    </Dialog.Header>
    <form method="post" action="?/tambah">
      <Label>Tahun</Label>
      <Input name="tahun" placeholder="tahun"/>
      <Button type="submit" class="mt-3">Submit</Button>
    </form>
  </Dialog.Content>
</Dialog.Root>
