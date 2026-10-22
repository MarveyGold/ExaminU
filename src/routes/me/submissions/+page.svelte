<script>
  import {
    Card,
    Badge,
    List,
    ListItem,
    Button,
    Preloader,
    Block,
  } from "konsta/svelte";
  import { getMySubmissions } from "#lib/functions/questions.remote.js";

  const submissions = getMySubmissions();
  const list = $derived(submissions.current);
  //console.log(list);

  function formatDate(iso) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function formatBytes(n) {
    if (!n) return "";
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
    return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  }
</script>

<svelte:head>
  <title>My submissions - ExaminU</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<main>
  <div class="shell">
    <div class="bar">
      <a class="back" href="/me" aria-label="Back">
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </a>
      <h1>My submissions</h1>
      <span></span>
    </div>

    {#if list === undefined}
      <Block class="loading">
        <Preloader />
      </Block>
    {:else if list.length === 0}
      <Card class="empty-card">
        <Block class="empty-block">
          <p class="empty">You haven't submitted anything yet.</p>
          <Button rounded href="/contribute" class="contribute-btn">
            Contribute a question
          </Button>
        </Block>
      </Card>
    {:else}
      <ul class="items">
        {#each list as s (s.id)}
          <li>
            <Card class="sub-card">
              <Block class="head">
                <span
                  ><Badge class="kind-badge">
                    {s.kind === "file" ? "File" : "Question"}
                  </Badge>
                </span> <span class="date">{formatDate(s.createdAt)}</span>
                <span
                  >{#if s.status == "approved"}
                    <Badge class="approved-badge">{s.status}</Badge>
                  {:else if s.status == "rejected"}
                    <Badge class="rejected-badge">{s.status}</Badge>
                  {:else}
                    <Badge class="exam-badge">{s.status}</Badge>
                  {/if}
                </span>
              </Block>

              {#if s.title}
                <Block class="title-block">
                  <strong>{s.title}</strong>
                </Block>
              {/if}

              {#if s.kind === "file" && s.file}
                <Block class="meta-block">
                  <span>{s.file.name}</span>
                  {#if s.file.size}
                    <span class="dim">· {formatBytes(s.file.size)}</span>
                  {/if}
                </Block>

                {#if s.file.mimeType?.startsWith("image/")}
                  <img
                    class="thumb"
                    src={`/files/${s.id}`}
                    alt={s.file.name ?? ""}
                    loading="lazy"
                    onerror={(e) =>
                      console.error("thumb failed:", e.currentTarget.src)}
                  />
                {:else}
                  <List class="file-list">
                    <ListItem
                      link
                      href={`/files/${s.id}`}
                      target="_blank"
                      title="Open file"
                    />
                  </List>
                {/if}
              {:else if s.note}
                <Block class="note-block">
                  <p class="note">{s.note}</p>
                </Block>
              {/if}
            </Card>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</main>

<style>
  :global(html) {
    background: #0f0a1e;
  }
  :global(body) {
    background: #0f0a1e;
  }
  main {
    min-height: 100dvh;
    background: linear-gradient(to bottom, #0f0a1e, #1a1030, #0f0a1e);
    padding-top: 10dvh;
    padding-bottom: 120px;
    padding-inline: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .shell {
    --card: #20153a;
    --line: #3c2572;
    --muted: #b4a9d6;
    --brand: #7a5cfa;

    width: min(100%, 28rem);
    margin-top: clamp(0.5rem, 3vh, 2rem);
    display: grid;
    gap: 1.25rem;
    color: #fff;
  }

  .bar {
    display: grid;
    grid-template-columns: 2.75rem 1fr 2.75rem;
    align-items: center;
  }

  h1 {
    text-align: center;
    font-size: 1.1rem;
    font-weight: 700;
  }

  .back {
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    background: var(--card);
    border: 1px solid var(--line);
    color: #fff;
    transition: border-color 0.15s;
  }
  .back:hover {
    border-color: var(--brand);
  }
  .back:focus-visible {
    outline: 3px solid rgba(184, 168, 255, 0.8);
    outline-offset: 2px;
  }

  /* Konsta overrides scoped to the shell */
  .shell :global(.sub-card),
  .shell :global(.empty-card) {
    background: var(--card) !important;
    border: 1px solid var(--line);
    border-radius: 16px;
    margin: 0;
  }

  .shell :global(.loading) {
    display: grid;
    place-items: center;
    padding-block: 2rem;
  }

  .empty-block {
    display: grid;
    gap: 0.9rem;
    justify-items: center;
    text-align: center;
    padding-block: 0.5rem;
  }

  .empty {
    color: var(--muted);
    font-size: 0.9rem;
  }

  .shell :global(.contribute-btn) {
    background: linear-gradient(135deg, #7a5cfa, #5a3eda) !important;
    color: #fff !important;
  }

  .items {
    display: grid;
    gap: 0.85rem;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  :global(.head) {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    gap: 0.5rem;
    flex-wrap: wrap;
    font-size: 0.78rem;
  }

  .shell :global(.kind-badge) {
    background: var(--line) !important;
    color: #fff !important;
    font-weight: 600;
  }

  .shell :global(.exam-badge) {
    background: rgba(122, 92, 250, 0.2) !important;
    color: #b8a8ff !important;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .shell :global(.rejected-badge) {
    background-color: rgba(239, 68, 68, 0.15) !important;
    border: 1px solid #ef4444;
    color: #b8a8ff !important;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .shell :global(.approved-badge) {
    background-color: rgba(34, 197, 94, 0.15) !important;
    border: 1px solid #22c55e;
    color: #b8a8ff !important;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .date {
    margin-inline-start: auto;
    color: var(--muted);
  }

  .title-block {
    padding-block: 0.35rem 0;
    overflow-wrap: anywhere;
  }

  .meta-block {
    padding-block: 0.15rem 0;
    font-size: 0.875rem;
    color: #e5e0f5;
    overflow-wrap: anywhere;
    display: flex;
    gap: 0.35rem;
    flex-wrap: wrap;
  }

  .dim {
    color: var(--muted);
  }

  .note-block {
    padding-block: 0.3rem 0;
  }

  .note {
    font-size: 0.875rem;
    color: var(--muted);
  }

  .thumb {
    display: block;
    width: 100%;
    max-height: 240px;
    margin-top: 0.65rem;
    border-radius: 12px;
    object-fit: cover;
  }

  .shell :global(.file-list) {
    margin-block: 0.5rem 0;
    background: transparent;
  }
  .shell :global(.file-list .k-list-item) {
    color: #b8a8ff;
    padding-inline: 0;
    font-weight: 600;
  }

  @media (prefers-reduced-motion: reduce) {
    .back {
      transition: none;
    }
  }
</style>
