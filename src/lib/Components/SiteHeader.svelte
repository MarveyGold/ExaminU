<script>
  import { page } from "$app/state";
  import Me from "$lib/Icons/me.svelte";

  let { links = [], user = null, cta = "Start practising", ctaHref = "/app" } = $props();

  let menuOpen = $state(false);
  let accountOpen = $state(false);
  let accountEl = $state();

  const redirect = $derived(encodeURIComponent(page.url.href));

  // Same behaviour as before: remember where the visitor came from.
  function remember(route) {
    document.cookie = `prev=${page.url.href}; path=/${route}`;
  }

  async function signout() {
    const res = await fetch("/api/logout");
    if (res.ok) window.location.href = page.url.href;
  }

  function closeAll() {
    menuOpen = false;
    accountOpen = false;
  }

  function onkeydown(e) {
    if (e.key === "Escape") closeAll();
  }

  // Close the account popover when the visitor clicks anywhere else.
  function onclick(e) {
    if (accountOpen && accountEl && !accountEl.contains(e.target)) accountOpen = false;
  }
</script>

<svelte:window {onkeydown} {onclick} />

<header class="bar">
  <div class="inner">
    <a class="brand" href="/" aria-label="ExaminU home">
      <img class="mark" src="/favicon.png" alt="" width="36" height="36" />
      <span class="name">ExaminU</span>
    </a>

    <nav class="primary" aria-label="Main">
      <ul class="links">
        {#each links as link}
          <li><a href={link.href}>{link.label}</a></li>
        {/each}
      </ul>
    </nav>

    <div class="actions">
      {#if user}
        <a class="cta" href={ctaHref}>{cta}</a>
        <div class="account" bind:this={accountEl}>
          <button
            type="button"
            class="icon"
            aria-label="Account"
            aria-expanded={accountOpen}
            aria-controls="account-panel"
            onclick={() => (accountOpen = !accountOpen)}
          >
            <Me />
          </button>
          {#if accountOpen}
            <div class="panel" id="account-panel">
              <p class="email">{user.email}</p>
              <button type="button" class="text-btn" onclick={signout}>Sign out</button>
            </div>
          {/if}
        </div>
      {:else}
        <a class="text-link" href="/login?redirect={redirect}" onclick={() => remember("login")}>Sign in</a>
        <a class="cta" href={ctaHref}>{cta}</a>
      {/if}
    </div>

    <button
      type="button"
      class="burger"
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      aria-expanded={menuOpen}
      aria-controls="mobile-menu"
      onclick={() => (menuOpen = !menuOpen)}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {#if menuOpen}
          <path d="M6 6 18 18M18 6 6 18" />
        {:else}
          <path d="M4 7h16M4 12h16M4 17h16" />
        {/if}
      </svg>
    </button>
  </div>

  {#if menuOpen}
    <div class="drawer" id="mobile-menu">
      <ul>
        {#each links as link}
          <li><a href={link.href} onclick={closeAll}>{link.label}</a></li>
        {/each}
      </ul>
      <div class="drawer-actions">
        <a class="cta wide" href={ctaHref} onclick={closeAll}>{cta}</a>
        {#if user}
          <p class="email">{user.email}</p>
          <button type="button" class="text-btn" onclick={signout}>Sign out</button>
        {:else}
          <a class="text-link" href="/login?redirect={redirect}" onclick={() => remember("login")}>Sign in</a>
        {/if}
      </div>
    </div>
  {/if}
</header>

<style>
  /* The global stylesheet fixes every <header>; this one sticks instead. */
  .bar {
    position: sticky;
    top: 0;
    left: auto;
    right: auto;
    z-index: 50;
    display: block;
    max-width: none;
    padding: 0;
    box-shadow: none;
    animation: none;
    background: color-mix(in srgb, var(--ground) 90%, transparent);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--line);
  }

  .inner {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    max-width: var(--wrap);
    height: 64px;
    margin-inline: auto;
    padding-inline: var(--gap);
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
    margin-right: auto;
    color: var(--ink);
  }

  .mark {
    width: 36px;
    height: 36px;
    border-radius: 9px;
  }

  .name {
    font-size: 1.3125rem;
    font-weight: 750;
    letter-spacing: -0.02em;
  }

  .primary {
    display: none;
    flex: none;
  }

  .links {
    display: flex;
    align-items: center;
    gap: 1.75rem;
    list-style: none;
  }

  .links a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--body);
  }

  .links a:hover {
    color: var(--violet-deep);
  }

  .actions {
    display: none;
    align-items: center;
    gap: 1rem;
  }

  .text-link {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--ink);
  }

  .text-link:hover {
    color: var(--violet-deep);
  }

  .cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 0 1.25rem;
    border-radius: 999px;
    background: var(--violet);
    color: #fff;
    font-size: 0.9375rem;
    font-weight: 600;
    transition: background-color 0.15s;
  }

  .cta:hover {
    background: var(--violet-deep);
  }

  .account {
    position: relative;
  }

  .icon {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border: 1px solid var(--line);
    border-radius: 50%;
    background: var(--paper);
    color: var(--ink);
    cursor: pointer;
  }

  .panel {
    position: absolute;
    right: 0;
    top: calc(100% + 0.5rem);
    min-width: 15rem;
    padding: 1rem;
    border: 1px solid var(--line);
    border-radius: 12px;
    background: var(--paper);
    box-shadow: 0 18px 40px -20px rgba(27, 23, 64, 0.4);
  }

  .email {
    font-size: 0.875rem;
    color: var(--muted);
    overflow-wrap: anywhere;
    margin-bottom: 0.5rem;
  }

  .text-btn {
    min-height: 44px;
    padding: 0;
    border: 0;
    background: none;
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--violet-deep);
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }

  .burger {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border: 1px solid var(--line);
    border-radius: 12px;
    background: var(--paper);
    color: var(--ink);
    cursor: pointer;
  }

  .burger svg {
    width: 22px;
    height: 22px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
  }

  .drawer {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: 0.5rem var(--gap) 1.25rem;
    background: var(--ground);
    border-bottom: 1px solid var(--line);
    box-shadow: 0 24px 40px -24px rgba(27, 23, 64, 0.35);
  }

  .drawer ul {
    list-style: none;
  }

  .drawer li a {
    display: flex;
    align-items: center;
    min-height: 48px;
    font-size: 1.0625rem;
    font-weight: 500;
    color: var(--ink);
    border-bottom: 1px solid var(--line);
  }

  .drawer-actions {
    display: grid;
    justify-items: start;
    gap: 0.5rem;
    padding-top: 1rem;
  }

  .cta.wide {
    width: 100%;
  }

  a:focus-visible,
  button:focus-visible {
    outline: 3px solid var(--violet);
    outline-offset: 2px;
  }

  @media (min-width: 880px) {
    .primary,
    .actions {
      display: flex;
    }

    .burger,
    .drawer {
      display: none;
    }

    .brand {
      margin-right: 0;
    }

    .primary {
      margin-left: auto;
    }
  }
</style>
