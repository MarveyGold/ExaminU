<script lang="ts">
  import { Navbar, List, ListItem, Button, Block } from "konsta/svelte";
  import { getAdminPosts, deletePost } from "#lib/blog/admin.remote.ts";

  const posts = $derived(await getAdminPosts());

  async function remove(id: string) {
    if (confirm("Delete this post?")) await deletePost(id);
  }
</script>

<Navbar title="Blog posts" />

<Block>
  <Button href="/me/admin/blog/new">New post</Button>
</Block>

<List strong inset>
  {#each posts as post (post.id)}
    <ListItem
      link
      href="/admin/blog/{post.id}"
      title={post.title}
      subtitle={post.status}
      after={post.slug}
    />
  {:else}
    <ListItem title="No posts yet" />
  {/each}
</List>
