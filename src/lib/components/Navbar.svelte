<script lang="ts">
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavHamburger,
    NavUl,
  } from "flowbite-svelte";

  let navs = [
    { url: "/", label: "Home" },
    { url: "/data", label: "Data" },
  ];
</script>

<Navbar let:NavContainer color="primary">
  <NavContainer class="border px-5 py-2 rounded-lg bg-white dark:bg-gray-600">
    <NavBrand href="/">
      <!-- <img src="/favicon.ico" class="me-3 h-6 sm:h-9" alt="Logo" /> -->
      <span class="self-center whitespace-nowrap text-xl font-semibold"
        >AppName</span
      >
    </NavBrand>
    <NavHamburger />
    <NavUl>
      {#each navs as nav}
        <NavLi href={nav.url}>{nav.label}</NavLi>
      {/each}
    </NavUl>
  </NavContainer>
</Navbar>
