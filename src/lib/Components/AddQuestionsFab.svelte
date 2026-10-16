<script>
  import { page } from "$app/state";

  let { href = "/contribute", label = "Add questions", raised = true } = $props();
</script>

{#if page.url.pathname !== href}
  <a {href} class="fab" class:raised>
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
    </svg>
    <span>{label}</span>
  </a>
{/if}

<style>
  .fab {
    position: fixed;
    right: max(1rem, env(safe-area-inset-right));
    bottom: calc(1rem + env(safe-area-inset-bottom));
    z-index: 100;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.85rem 1.25rem 0.85rem 1rem;
    background: linear-gradient(135deg, #7a5cfa, #5a3eda);
    color: #fff;
    font-weight: 600;
    font-size: 0.95rem;
    line-height: 1;
    border-radius: 999px;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.12),
      0 8px 24px rgba(0, 0, 0, 0.45);
    transition: bottom 0.25s ease, transform 0.3s ease, background 0.3s ease;
  }

  /* lifts the button above a fixed bottom bar */
  .fab.raised {
    bottom: calc(5.5rem + env(safe-area-inset-bottom));
  }

  .fab:hover {
    background: linear-gradient(135deg, #5a3eda, #4533b8);
    transform: translateY(-2px);
  }

  .fab:focus-visible {
    outline: 3px solid rgba(184, 168, 255, 0.8);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    .fab {
      transition: none;
    }
    .fab:hover {
      transform: none;
    }
  }
</style>
