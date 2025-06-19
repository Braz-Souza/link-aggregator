<script lang="ts">
  import { page } from "$app/stores";
  import { fly } from "svelte/transition";

  let { children } = $props();
  // Source Data
  const steps = [
    { label: "Sign In", href: "/login" },
    { label: "Username", href: "/login/username" },
    { label: "Photo", href: "/login/photo" },
  ];
  const betweenSteps = steps.length - 1;
</script>

<div class="w-full py-4 md-12 flex justify-center items-start gap-8">
  <!-- Stepper -->
  <div class="space-y-8 w-5/6 sm:w-2/3 md:w-1/2 lg:w-1/3">
    <!-- Timeline -->
    <div class="relative">
      <!-- Numerals -->
      <div class="flex justify-between items-center gap-4">
        {#each steps as step, i}
          <!-- Numeral Button -->
          <a
            class="btn-icon btn-icon-lg rounded-full preset-filled-surface-200-800"
            class:!preset-filled-primary-500={i <= steps.findIndex(step => step.href === $page.route.id)}
            href={step.href}
          >
              {i + 1}
          </a>
        {/each}
      </div>
      <!-- Line -->
      <div class="absolute top-[43%] left-0 right-0 flex items-center z-[-1]">
        {#each steps as step, i}
          {#if i < betweenSteps}
            <hr
              class="hr !border-t-8 flex-1 mx-4"
              class:border-primary-500={i < steps.findIndex(step => step.href === $page.route.id)}
            />
          {/if}
        {/each}
      </div>
    </div>
  </div>
</div>

{#key $page.url}
<main in:fly={{x:'-100%', duration: 500}} class="card w-4/6 bg-neutral text-neutral-content mx-auto">
  <div class="card-body items-center text-center flex justify-center py-8">
    <div class="card preset-filled-surface-100-900 border-[1px] border-surface-200-800 card-hover divide-surface-200-800 block max-w-md divide-y overflow-hidden">
      {@render children?.()}
    </div>
  </div>
</main>
{/key}