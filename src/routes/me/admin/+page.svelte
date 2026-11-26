<script lang="ts">
  import { Page, List, ListItem, Card } from "konsta/svelte";
</script>

<Page>
  <List>
    <ListItem
      link
      href="/me/admin/users"
      title="User Email List"
      class="text-white"
    /><ListItem link href="/me/admin/blog" title="Blog" class="text-white" />
  </List>
</Page>

<style>
  :global(.k-page) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
