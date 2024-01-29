<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import "../app.css";
  import type { PageData } from "./$types";

export let data: PageData; 
</script>

<div>
  <Navbar user={data.user}/>
  <slot />
</div>
