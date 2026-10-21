<script>
  import { goto, invalidateAll } from "$app/navigation";
  import { page } from "$app/state";
  import { Popover, Popup, Block } from "konsta/svelte";

  import Me from "#lib/Icons/me.svelte";
  import Contact from "#lib/Components/Contact.svelte";

  let { class: className = "", ...props } = $props();

  let user = $derived(page.data.user);
  let open = $state(false);
  let feedbackOpen = $state(false);
  let triggerEl = $state();

  const displayName = $derived(
    (user?.name && user.name !== "user" ? user.name : "") ||
      user?.username ||
      user?.email?.split("@")[0] ||
      "Account",
  );

  const initial = $derived(Array.from(displayName)[0]?.toUpperCase() ?? "?");

  function auth(target) {
    document.cookie = `prev=${encodeURIComponent(page.url.href)}; path=/; max-age=600; samesite=lax`;
    goto(`/${target}?redirect=${encodeURIComponent(page.url.href)}`);
  }

  async function signout() {
    await fetch("/api/logout", { method: "POST" });
    await invalidateAll();
    goto("/");
  }

  function close() {
    open = false;
  }

  function openFeedback() {
    close();
    feedbackOpen = true;
  }
</script>

{#if user}
  <div class="trigger-wrap">
    <button
      type="button"
      bind:this={triggerEl}
      onclick={() => (open = !open)}
      class="avatar-trigger"
      aria-haspopup="menu"
      aria-expanded={open}
      aria-label="Account menu"
    >
      <Me />
    </button>

    <Popover
      opened={open}
      target={triggerEl}
      onBackdropClick={close}
      class="account-popover"
    >
      <div class="panel">
        <div class="head">
          <div class="avatar" aria-hidden="true">{initial}</div>
          <p class="name">{displayName}</p>
          <p class="email">{user.email}</p>
        </div>

        <div class="list">
          <a class="item" role="menuitem" href="/me" onclick={close}>
            <svg
              class="icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"
              />
            </svg>
            <span>Manage your account</span>
          </a>

          <a
            class="item"
            role="menuitem"
            href="/me/submissions"
            onclick={close}
          >
            <svg
              class="icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
              />
            </svg>
            <span>My submissions</span>
          </a>

          <button
            type="button"
            class="item"
            role="menuitem"
            onclick={openFeedback}
          >
            <svg
              class="icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
              />
            </svg>
            <span>Send feedback</span>
          </button>

          <button
            type="button"
            class="item danger"
            role="menuitem"
            onclick={() => {
              close();
              signout();
            }}
          >
            <svg
              class="icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
              />
            </svg>
            <span>Log out</span>
          </button>
        </div>
      </div>
    </Popover>
  </div>
{:else}
  <div class={`auth-buttons ${className}`} {...props}>
    <button class="login" onclick={() => auth("login")}>Sign in</button>
    <button class="signup" onclick={() => auth("signup")}>Sign up</button>
  </div>
{/if}

{#if feedbackOpen}
  <div
    class="feedback-overlay"
    role="presentation"
    onclick={(e) => {
      if (e.target === e.currentTarget) feedbackOpen = false;
    }}
    onkeydown={(e) => {
      if (e.key === "Escape") feedbackOpen = false;
    }}
  >
    <div
      class="feedback-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Send feedback"
    >
      <button
        type="button"
        class="feedback-close"
        onclick={() => (feedbackOpen = false)}
        aria-label="Close feedback form">✕</button
      >
      <Contact />
    </div>
  </div>
{/if}

<style>
  .trigger-wrap {
    position: relative;
    display: inline-flex;
    margin: -9px;
    margin-inline-end: -1px;
  }

  .avatar-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 9px;
    background: none;
    border: 0;
    border-radius: 12px;
    color: inherit;
    cursor: pointer;
    transition: background-color 0.15s;
  }

  .avatar-trigger:hover,
  .avatar-trigger[aria-expanded="true"] {
    background: rgba(255, 255, 255, 0.2);
  }

  .avatar-trigger:focus-visible {
    outline: 2px solid #7a5cfa;
    outline-offset: 2px;
  }

  /* Neutralize Konsta's popover chrome so our panel shows cleanly */
  .account-popover :global(.k-popover) {
    background: transparent;
    box-shadow: none;
    padding: 0;
    border-radius: 0;
  }

  .panel {
    min-width: 16rem;
    width: max-content;
    max-width: calc(100vw - 24px);
    padding-bottom: 6px;
    background: #eceef8;
    color: #1a1840;
    border-radius: 18px;
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.2),
      0 12px 28px rgba(0, 0, 0, 0.35);
    font-family: Roboto, system-ui, sans-serif;
    overflow: hidden;
  }

  .head {
    display: grid;
    justify-items: center;
    padding: 13px 16px 0;
  }

  .avatar {
    display: grid;
    place-items: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #9d8ef2;
    color: #fff;
    font-size: 24px;
    font-weight: 500;
    line-height: 1;
    user-select: none;
  }

  .name {
    max-width: 100%;
    margin-top: 10px;
    color: #14122e;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    text-align: center;
    overflow-wrap: anywhere;
  }

  .email {
    max-width: 100%;
    margin-top: 2px;
    color: #6b6b7b;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .list {
    margin-top: 12px;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 13px;
    width: 100%;
    height: 36px;
    padding: 0 13px 0 14px;
    background: none;
    border: 0;
    color: #1a1840;
    font-size: 15px;
    line-height: 1;
    text-align: left;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.12s;
  }

  .item span {
    flex: 1;
  }

  .item:hover,
  .item:focus-visible {
    background: rgba(26, 24, 64, 0.08);
  }

  .item:focus-visible {
    outline: 2px solid #7a5cfa;
    outline-offset: -2px;
  }

  .icon {
    flex: none;
    width: 22px;
    height: 22px;
    fill: currentColor;
  }

  .chev {
    flex: none;
    width: 20px;
    height: 20px;
    color: #111;
  }

  .item.danger {
    color: #c2303f;
  }

  .auth-buttons {
    display: flex;
    gap: 8px;
  }
  .auth-buttons .login,
  .auth-buttons .signup {
    padding: 8px 16px;
    border: 1px solid #3c2572;
    border-radius: 999px;
    background: transparent;
    color: #fff;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
  }
  .auth-buttons .signup {
    background: #7a5cfa;
    border-color: #7a5cfa;
  }

  .feedback-overlay {
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    overflow-y: auto;
    animation: feedback-fade-in 0.18s ease-out;
  }

  .feedback-modal {
    position: relative;
    width: 100%;
    max-width: 32rem;
    max-height: calc(100dvh - 32px);
    overflow-y: auto;
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    animation: feedback-pop-in 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .feedback-close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.05);
    color: #4b5563;
    border: 0;
    font-size: 14px;
    cursor: pointer;
    z-index: 1;
    transition: background 0.15s;
  }
  .feedback-close:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  .feedback-close:focus-visible {
    outline: 2px solid #7a5cfa;
    outline-offset: 2px;
  }

  .feedback-modal :global(.contact-us) {
    margin: 0;
    box-shadow: none;
    border-radius: 24px;
    padding-top: 56px;
  }

  @keyframes feedback-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes feedback-pop-in {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .feedback-overlay,
    .feedback-modal {
      animation: none;
    }
    .avatar-trigger,
    .item {
      transition: none;
    }
  }
</style>
