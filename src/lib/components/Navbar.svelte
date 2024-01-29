<script lang="ts">
  import { cn } from "$lib/utils";
  import type { User } from "@prisma/client";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Button } from "./ui/button";
  import { PUBLIC_COOKIE_NAME } from "$env/static/public";

  export let user: User | null;

  let navs = [
    { url: "/", label: "Home" },
    { url: "/data", label: "Data" },
  ];
</script>

<nav
  class={cn(
    "flex items-center space-x-4 lg:space-x-6 border-b h-16 shadow-sm px-6 backdrop-blur-sm sticky top-0 left-0"
  )}
>
  <a href="/" class="flex items-center gap-3 w-fit flex-shrink-0 mr-5">
    <img
      src="/logo.png"
      alt=""
      class="image max-w-full object-cover aspect-square w-10"
    />
    <p class="text-lg transition-colors font-medium">Arus</p>
  </a>
  <a
    href="/"
    class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
  >
    Home
  </a>
  <a
    href="/map"
    class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
  >
    Map
  </a>
  <div class="w-full"></div>
  {#if user}
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button>
          Hi {user.username} <i class="fas fa-chevron-down ml-3"></i>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <DropdownMenu.Item
            on:click={() => {
              document.cookie = `${PUBLIC_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
              location.reload()
            }}>Logout</DropdownMenu.Item
          >
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  {/if}
  <!--<div class="aspect-square h-[60%] bg-black rounded-full shadow-md"></div>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline">Hi {info.username} <i class="fas fa-chevron-down ml-3 text-xs"></i></Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item on:click={logout}>Log Out</DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root> !-->
</nav>
