<script>
  import AddQuestionsFab from "#lib/Components/AddQuestionsFab.svelte";
  let { children } = $props();
</script>

{@render children()}
<AddQuestionsFab />
