<script lang="ts">
  import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Button } from "$lib/components/ui/button";
  import type { ActionData } from "./$types";
  import AlertDialog from "$lib/components/AlertDialog.svelte";
  import { enhance } from "$app/forms";

  export let form: ActionData;
</script>

{#key form}
  <AlertDialog
    openFirst={!!form}
    okOnly
    title="Login"
    desc={form?.message}
    error={!form?.success}
    onClick={() => {
      let next = new URLSearchParams(location.search).get("next");
      location.assign(next ?? "/");
    }}
  />
{/key}

<div class="flex items-center justify-center py-10">
  <form
    use:enhance
    action="?/login"
    method="post"
    class="rounded-xl p-5 border shadow-md w-full max-w-sm bg-white"
  >
    <h3 class="text-xl font-bold mb-4">Please Login</h3>
    <div class="flex flex-col gap-3">
      <div>
        <Label>Username</Label>
        <Input name="username" />
      </div>
      <div>
        <Label>Password</Label>
        <Input name="password" />
      </div>
      <div class="flex items-center gap-3">
        <Checkbox />
        <Label>remember me</Label>
      </div>
      <Button class="w-full" type="submit">Submit</Button>
    </div>
  </form>
</div>
