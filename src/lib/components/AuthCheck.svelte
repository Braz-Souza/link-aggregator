<script lang="ts">
  import { user } from "$lib/firebase";
  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children } = $props();
</script>

{#if $user}
  {@render children?.()}
{:else}
  <p class="text-error my-10 flex flex-col m-4 md:m-10 gap-5">
    You must be signed in to view this page.
    <a class="btn preset-tonal-error" href="/login">Sign in</a>
  </p>
{/if}
