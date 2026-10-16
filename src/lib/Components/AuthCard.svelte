<script>
  let { title, lede, error = "", children, footer } = $props();
</script>

<main>
  <div class="card">
    <h1>{title}</h1>
    <p class="lede">{lede}</p>

    {#if error}
      <p class="error" role="alert">{error}</p>
    {/if}

    {@render children()}

    <p class="alt">{@render footer()}</p>
  </div>
</main>

<style>
  .card {
    --card: #20153a;
    --field: #110b1f;
    --line: #3c2572;
    --muted: #b4a9d6;
    --brand: #7a5cfa;
    --brand-deep: #5a3eda;
    --link: #b8a8ff;
    --danger: #ffb4b4;

    width: min(100%, 25rem);
    margin-top: clamp(1rem, 6vh, 4rem);
    padding: 2rem 1.75rem;
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 16px;
    color: #fff;
  }

  h1 {
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .lede {
    margin: 0.35rem 0 1.5rem;
    color: var(--muted);
  }

  .error {
    margin-bottom: 1rem;
    padding: 0.7rem 0.9rem;
    background: rgba(255, 99, 99, 0.1);
    border: 1px solid rgba(255, 99, 99, 0.4);
    border-radius: 12px;
    color: var(--danger);
    font-size: 0.9rem;
  }

  .alt {
    margin-top: 1.5rem;
    color: var(--muted);
    font-size: 0.9rem;
  }

  .alt :global(a) {
    color: var(--link);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  /* Styles for the form that each page passes in */
  .card :global(form) {
    display: grid;
    gap: 0.4rem;
  }

  .card :global(label) {
    margin-top: 0.6rem;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .card :global(input) {
    width: 100%;
    padding: 0.8rem 1rem;
    background: var(--field);
    color: #fff;
    font: inherit;
    border: 1px solid var(--line);
    border-radius: 12px;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .card :global(input:focus-visible) {
    outline: 2px solid transparent; /* stays visible in high-contrast mode */
    border-color: var(--brand);
    box-shadow: 0 0 0 3px rgba(122, 92, 250, 0.45);
  }

  .card :global(input:-webkit-autofill) {
    -webkit-text-fill-color: #fff;
    box-shadow: 0 0 0 100px var(--field) inset;
    caret-color: #fff;
  }

  .card :global(.hint) {
    color: var(--muted);
    font-size: 0.85rem;
  }

  /* matches .answerButton in your global styles */
  .card :global(.submit) {
    margin-top: 1.25rem;
    padding: 12px 20px;
    background: linear-gradient(135deg, var(--brand), var(--brand-deep));
    color: #fff;
    font: inherit;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.3s ease;
  }

  .card :global(.submit:hover:not(:disabled)) {
    background: linear-gradient(135deg, #5a3eda, #4533b8);
    transform: translateY(-2px);
  }

  .card :global(.submit:focus-visible) {
    outline: 3px solid rgba(184, 168, 255, 0.7);
    outline-offset: 2px;
  }

  .card :global(.submit:disabled) {
    opacity: 0.65;
    cursor: progress;
  }

  @media (prefers-reduced-motion: reduce) {
    .card :global(*) {
      transition: none !important;
    }
    .card :global(.submit:hover:not(:disabled)) {
      transform: none;
    }
  }
</style>
