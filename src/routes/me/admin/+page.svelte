<script>
  import { listEmails } from "./admin.remote.js";

  const emails = listEmails();

  let status = $state(""); // "", "copied" or "failed"
  let timer;

  const list = $derived(emails.current ?? []);
  const text = $derived(list.join(", "));

  async function copyForGmail() {
    clearTimeout(timer);
    try {
      await navigator.clipboard.writeText(text);
      status = "copied";
    } catch {
      // clipboard blocked (http, iframe, or permissions)
      status = "failed";
    }
    timer = setTimeout(() => (status = ""), 2500);
  }
</script>

<svelte:head><title>Email list - ExaminU admin</title></svelte:head>

<main>
  <div class="panel">
    <h1>Email list</h1>
    <p class="lede">Every registered email, ready to paste into Gmail.</p>

    {#if emails.error}
      <p class="error" role="alert">
        Couldn't load the emails. Refresh the page to try again.
      </p>
    {:else}
      <p class="count">
        {#if emails.loading}
          Loading…
        {:else}
          <strong>{list.length}</strong> email{list.length === 1 ? "" : "s"}
        {/if}
      </p>

      <label for="emails">Recipients</label>
      <textarea
        id="emails"
        readonly
        rows="8"
        value={text}
        placeholder={emails.loading ? "Loading…" : "No emails yet."}
        onfocus={(e) => e.currentTarget.select()}
      ></textarea>

      <button
        class="answerButton"
        class:done={status === "copied"}
        onclick={copyForGmail}
        disabled={!list.length}
      >
        {status === "copied" ? "Copied" : "Copy all for Gmail"}
      </button>

      <div role="status" aria-live="polite">
        {#if status === "copied"}
          <span class="sr-only"
            >Copied {list.length} emails to the clipboard.</span
          >
        {:else if status === "failed"}
          <p class="error">
            Couldn't copy automatically. Click the box above and copy it
            yourself.
          </p>
        {/if}
      </div>

      <p class="hint">
        Paste into <strong>Bcc</strong>, not To. Otherwise every student can see
        every other student's address.
      </p>
    {/if}
  </div>
</main>

<style>
  .panel {
    --card: #20153a;
    --field: #110b1f;
    --line: #3c2572;
    --muted: #b4a9d6;
    --brand: #7a5cfa;
    --danger: #ffb4b4;

    width: min(100%, 40rem);
    margin-top: clamp(1rem, 4vh, 3rem);
    padding: 2rem 1.75rem;
    display: grid;
    gap: 0.5rem;
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 16px;
    color: #fff;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .lede {
    margin-bottom: 0.75rem;
    color: var(--muted);
  }

  .count {
    color: var(--muted);
    font-size: 0.9rem;
  }

  .count strong {
    color: #fff;
    font-size: 1.5rem;
    font-weight: 700;
  }

  label {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
  }

  textarea {
    width: 100%;
    min-height: 9rem;
    padding: 0.8rem 1rem;
    background: var(--field);
    color: #fff;
    font: inherit;
    font-family: ui-monospace, monospace;
    font-size: 0.85rem;
    line-height: 1.5;
    overflow-wrap: anywhere;
    border: 1px solid var(--line);
    border-radius: 12px;
    resize: vertical;
    color-scheme: dark;
    transition:
      border-color 0.15s,
      box-shadow 0.15s;
  }

  textarea:focus-visible {
    outline: 2px solid transparent; /* stays visible in high-contrast mode */
    border-color: var(--brand);
    box-shadow: 0 0 0 3px rgba(122, 92, 250, 0.45);
  }

  /* builds on your global .answerButton */
  .answerButton {
    justify-self: start;
    margin-top: 0.75rem;
  }

  .answerButton:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .answerButton.done,
  .answerButton.done:hover {
    background: linear-gradient(135deg, #22c55e, #15803d);
    transform: none;
  }

  .answerButton:focus-visible {
    outline: 3px solid rgba(184, 168, 255, 0.8);
    outline-offset: 2px;
  }

  .hint {
    margin-top: 0.5rem;
    color: var(--muted);
    font-size: 0.875rem;
  }

  .hint strong {
    color: #fff;
  }

  .error {
    padding: 0.7rem 0.9rem;
    background: rgba(255, 99, 99, 0.1);
    border: 1px solid rgba(255, 99, 99, 0.4);
    border-radius: 12px;
    color: var(--danger);
    font-size: 0.9rem;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
  }

  @media (prefers-reduced-motion: reduce) {
    textarea {
      transition: none;
    }
  }
</style>
