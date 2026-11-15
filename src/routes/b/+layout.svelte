<script lang="ts">
  import type { Snippet } from "svelte";
  import AddQuestionsFab from "#lib/Components/AddQuestionsFab.svelte";

  let { children }: { children: Snippet } = $props();
</script>

{@render children()}
<AddQuestionsFab />

<style>
  :global(.header-block) {
    width: 100%;
    text-align: center;
    margin-bottom: 24px;
  }
</style>
