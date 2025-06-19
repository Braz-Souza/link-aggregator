<script lang="ts">
   interface Props {
      children?: import('svelte').Snippet;
   }

   let { children }: Props = $props();
</script>

<h1> User login</h1>