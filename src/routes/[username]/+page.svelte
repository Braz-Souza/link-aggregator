<script lang="ts">
  import UserLink from "$lib/components/UserLink.svelte";
  import { Avatar } from "@skeletonlabs/skeleton-svelte";
  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<svelte:head>
  <title>@{data.username} Links</title>
  <meta name="description" content={data.bio} />
  {#if data.photoURL}
    <link rel="icon" href={data.photoURL} />
  {/if}
</svelte:head>

<main class="prose text-center mx-auto mt-8">
  <h1 class="text-7xl text-purple-500">
    @{data.username}
  </h1>
  <div class="flex justify-center mt-6">
    <Avatar src={data.photoURL ?? "/user.png"} name="User Avatar" />
  </div>

  <p class="text-xl my-8">{data.bio ?? "no bio yet..."}</p>
  <ul class="flex flex-col gap-10 items-center">
    {#each data.links as item}
      <li class="w-2/3 md:w-full max-w-md">
        <UserLink {...item} />
      </li>
    {/each}
  </ul>
</main>
