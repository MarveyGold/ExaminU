<script>
  let { title, backHref = "/", children } = $props();
</script>

<svelte:head><meta name="robots" content="noindex" /></svelte:head>

<main>
  <div class="shell">
    <div class="bar">
      <a class="back" href={backHref} aria-label="Back">
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
      <h1>{title}</h1>
      <span></span>
    </div>

    <!-- No pending snippet on purpose, so the server waits for the data and renders it into the HTML -->
    <svelte:boundary>
      {@render children()}

      {#snippet failed(err, reset)}
        <p class="notice error" role="alert">
          Couldn't load this page. Check your connection and try again.
        </p>
        <button class="retry" onclick={reset}>Try again</button>
      {/snippet}
    </svelte:boundary>
  </div>
</main>

<style>
  .shell {
    --card: #20153a;
    --line: #3c2572;
    --muted: #b4a9d6;
    --brand: #7a5cfa;
    --danger: #ffb4b4;
    --ok: #8fe3bf;

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

  /* Shared by the pages rendered inside the shell */
  .shell :global(.divider) {
    height: 1px;
    border: 0;
    background: var(--line);
    opacity: 0.6;
  }

  .shell :global(form.stack) {
    display: grid;
    gap: 0.85rem;
  }

  .shell :global(.field) {
    display: grid;
    gap: 0.1rem;
    padding: 0.65rem 1rem;
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 14px;
    transition:
      border-color 0.15s,
      box-shadow 0.15s;
  }

  .shell :global(.field:focus-within) {
    border-color: var(--brand);
    box-shadow: 0 0 0 3px rgba(122, 92, 250, 0.45);
  }

  .shell :global(.field label) {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--muted);
  }

  .shell :global(.field input),
  .shell :global(.field select) {
    width: 100%;
    padding: 0.15rem 0;
    background: transparent;
    color: #fff;
    font: inherit;
    border: 0;
    outline: none;
    color-scheme: dark;
  }

  .shell :global(.field select option) {
    background: #20153a;
    color: #fff;
  }

  .shell :global(.field.readonly) {
    opacity: 0.7;
  }

  .shell :global(.help) {
    margin-top: -0.6rem;
    padding-inline: 0.25rem;
    font-size: 0.8rem;
    color: var(--muted);
  }

  .shell :global(.notice) {
    padding: 0.7rem 0.9rem;
    border-radius: 12px;
    font-size: 0.9rem;
  }

  .shell :global(.notice.error) {
    background: rgba(255, 99, 99, 0.1);
    border: 1px solid rgba(255, 99, 99, 0.4);
    color: var(--danger);
  }

  .shell :global(.notice.ok) {
    background: #10301f;
    border: 1px solid rgba(143, 227, 191, 0.5);
    color: var(--ok);
  }

  /* builds on your global .answerButton */
  .shell :global(.block) {
    display: block;
    width: 100%;
    text-align: center;
  }

  .shell :global(.answerButton:disabled) {
    opacity: 0.65;
    cursor: progress;
    transform: none;
  }
  .retry {
    justify-self: start;
    padding: 0.5rem 0;
    background: none;
    border: 0;
    color: #b8a8ff;
    font: inherit;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }
  @media (prefers-reduced-motion: reduce) {
    .back,
    .shell :global(.field) {
      transition: none;
    }
  }
</style>
