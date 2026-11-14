<script lang="ts">
  import { App, Page, Block } from "konsta/svelte";
  let { children } = $props();
</script>

<App theme="material">
  <Page>
    <svelte:boundary>
      {@render children()}
      {#snippet pending()}
        <Block>Loading…</Block>
      {/snippet}
    </svelte:boundary>
  </Page>
</App>
