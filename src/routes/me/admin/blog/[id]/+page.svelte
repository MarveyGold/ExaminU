<script lang="ts">
  import { page } from "$app/state";
  import { goto, replaceState } from "$app/navigation";
  import {
    List,
    ListInput,
    ListItem,
    Toggle,
    Block,
    Button,
  } from "konsta/svelte";
  import {
    getAdminPost,
    savePost,
    deletePost,
  } from "#lib/blog/admin.remote.ts";

  const routeId = page.params.id;
  const existing = routeId === "new" ? null : await getAdminPost(routeId);

  // Tracks the real id once a new post has been saved
  let currentId = $state<string | undefined>(existing?.id);

  let title = $state(existing?.title ?? "");
  let slug = $state(existing?.slug ?? "");
  let excerpt = $state(existing?.excerpt ?? "");
  let body = $state(existing?.body ?? "");
  let tags = $state(existing?.tags.join(", ") ?? "");
  let published = $state(existing?.status === "published");

  let saving = $state(false);
  let message = $state("");

  async function save() {
    saving = true;
    message = "";
    try {
      const res = await savePost({
        id: currentId,
        title,
        slug,
        excerpt,
        body,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        published,
      });
      if (!currentId) {
        currentId = res.id;
        // Update the URL without remounting the page
        replaceState(`/admin/blog/${res.id}`, {});
      }
      message = "Saved";
    } catch (e: any) {
      message = e?.body?.message ?? "Could not save";
    } finally {
      saving = false;
    }
  }

  async function remove() {
    if (!currentId || !confirm("Delete this post?")) return;
    await deletePost(currentId);
    await goto("/admin/blog");
  }
</script>

<section>
  <Block>
    <h2 class="text-2xl font-bold">{currentId ? "Edit post" : "New post"}</h2>
  </Block>

  <List strongIos insetIos>
    <ListInput
      label="Title"
      type="text"
      value={title}
      onInput={(e) => (title = e.target.value)}
    />
    <ListInput
      label="Slug (optional)"
      type="text"
      placeholder="auto-generated from title"
      value={slug}
      onInput={(e) => (slug = e.target.value)}
    />
    <ListInput
      label="Excerpt"
      type="textarea"
      value={excerpt}
      onInput={(e) => (excerpt = e.target.value)}
    />
    <ListInput
      label="Tags (comma separated)"
      type="text"
      value={tags}
      onInput={(e) => (tags = e.target.value)}
    />
    <ListInput
      label="Body (Markdown)"
      type="textarea"
      inputClass="!h-96 font-mono"
      value={body}
      onInput={(e) => (body = e.target.value)}
    />
    <ListItem title="Published">
      {#snippet after()}
        <Toggle checked={published} onChange={() => (published = !published)} />
      {/snippet}
    </ListItem>
  </List>

  <Block class="space-y-2">
    <Button onClick={save} disabled={saving}
      >{saving ? "Saving…" : "Save"}</Button
    >
    {#if currentId}
      <Button clear onClick={remove}>Delete</Button>
    {/if}
    {#if message}<p class="text-center text-sm">{message}</p>{/if}
  </Block>
</section>
