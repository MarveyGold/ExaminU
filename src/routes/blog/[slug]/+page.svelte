<script lang="ts">
  import { Navbar, Card, Chip, Block } from "konsta/svelte";
  import { getPosts } from "#lib/blog/blog.remote.ts";

  const posts = await getPosts();
</script>

<svelte:head>
  <title>Blog | ExaminU</title>
  <meta
    name="description"
    content="Study tips, exam guides and updates from ExaminU."
  />
</svelte:head>

<Navbar title="ExaminU Blog" />

{#each posts as post (post.id)}
  <a href="/blog/{post.slug}" class="block no-underline">
    <Card
      header={post.publishedAt?.toLocaleDateString("en-NG", {
        dateStyle: "medium",
      })}
    >
      <h2 class="text-lg font-semibold">{post.title}</h2>
      <p class="mt-1 opacity-80">{post.excerpt}</p>
      <div class="mt-2 flex flex-wrap gap-1">
        {#each post.tags as tag}<Chip>{tag}</Chip>{/each}
      </div>
    </Card>
  </a>
{:else}
  <Block>No posts yet.</Block>
{/each}
