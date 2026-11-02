<script lang="ts">
  import type { Snippet } from "svelte";
  import AddQuestionsFab from "#lib/Components/AddQuestionsFab.svelte";

  let { children }: { children: Snippet } = $props();
</script>

{@render children()}
<AddQuestionsFab />
