<script>
  import { goto, invalidateAll } from "$app/navigation";
  import { page } from "$app/state";
  import { Popover, List, ListItem, Block, Button } from "konsta/svelte";
  import Me from "#lib/Icons/me.svelte";
  import Contact from "#lib/Components/Contact.svelte";

  let { class: className = "", ...props } = $props();

  let user = $derived(page.data.user);
  let popoverOpened = $state(false);
  let popoverTargetEl = $state();
  let feedbackOpen = $state(false);

  const displayName = $derived(
    user?.name && user.name !== "user"
      ? user.name
      : (user?.username ?? "Account"),
  );

  const initial = $derived(
    (displayName || user?.email || "?").trim().charAt(0).toUpperCase(),
  );

  const subtitle = $derived(
    [user?.level && `Level ${user.level}`, user?.department]
      .filter(Boolean)
      .join(" · "),
  );

  function auth(target) {
    document.cookie = `prev=${encodeURIComponent(page.url.href)}; path=/; max-age=600; samesite=lax`;
    goto(`/${target}?redirect=${encodeURIComponent(page.url.href)}`);
  }

  async function signout() {
    await fetch("/api/logout", { method: "POST" });
    await invalidateAll();
    goto("/");
  }

  const close = () => (popoverOpened = false);

  function openFeedback() {
    close();
    feedbackOpen = true;
  }

  function closeFeedback() {
    feedbackOpen = false;
  }

  function onOverlayKeydown(e) {
    if (e.key === "Escape") closeFeedback();
  }
</script>

{#if user}
  <div class="trigger-wrap" bind:this={popoverTargetEl}>
    <button
      type="button"
      onclick={() => (popoverOpened = !popoverOpened)}
      aria-expanded={popoverOpened}
      aria-label="Account menu"
      class="avatar-trigger"
    >
      <Me />
    </button>

    <Popover
      opened={popoverOpened}
      target={popoverTargetEl}
      onBackdropClick={close}
      class="profile-menu w-72"
    >
      <Block class="profile-head">
        <div class="profile-avatar" aria-hidden="true">{initial}</div>
        <h6 class="profile-name">{displayName}</h6>
        <small class="profile-email">{user.email}</small>
        {#if subtitle}
          <small class="profile-subtitle">{subtitle}</small>
        {/if}
      </Block>

      <Block>
        <Button rounded raised class="w-full" href="/me" onClick={close}>
          Manage your account
        </Button>
      </Block>

      <List dividers="between" class="profile-list">
        <ListItem
          link
          href="/me/submissions"
          onClick={close}
          title="My submissions"
        />
        <ListItem onClick={openFeedback} title="Send feedback" />
        <ListItem
          onClick={() => {
            close();
            signout();
          }}
          title="Log out"
          class="profile-logout"
        />
      </List>
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
      if (e.target === e.currentTarget) closeFeedback();
    }}
    onkeydown={onOverlayKeydown}
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
        onclick={closeFeedback}
        aria-label="Close feedback form"
      >
        ✕
      </button>
      <Contact />
    </div>
  </div>
{/if}

<style>
  .trigger-wrap {
    display: inline-flex;
    margin-inline-end: 8px;
  }

  .avatar-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background: none;
    border: 0;
    cursor: pointer;
    color: inherit;
  }
  .avatar-trigger:focus-visible {
    outline: 2px solid #7a5cfa;
    outline-offset: 2px;
    border-radius: 50%;
  }

  :global(.profile-menu),
  :global(.profile-menu .k-glass) {
    border-radius: 0 !important;
    background: #20153a !important;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
  }

  :global(.profile-menu) {
    --k-color-primary: #7a5cfa;
    --color-primary: #7a5cfa;
    --k-color-ios-primary: #7a5cfa;
    --k-color-md-light-primary: #7a5cfa;
    --k-color-md-light-on-primary: #ffffff;
    --k-color-md-dark-primary: #7a5cfa;
    --k-color-md-dark-on-primary: #ffffff;
    --k-color-md-light-surface-3: #20153a;
    --k-color-md-dark-surface-3: #20153a;
    --k-color-md-light-on-surface: #ffffff;
    --k-color-md-dark-on-surface: #ffffff;
    --k-color-md-light-on-surface-variant: #b4a9d6;
    --k-color-md-dark-on-surface-variant: #b4a9d6;
    --k-color-md-light-outline: #3c2572;
    --k-color-md-dark-outline: #3c2572;
    color: #ffffff;
  }

  .profile-head {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding-block: 16px 8px;
    text-align: center;
  }

  .profile-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    margin-bottom: 4px;
    border-radius: 50%;
    background: #3c2572;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
  }

  .profile-name {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
  }
  .profile-email {
    font-size: 12px;
    opacity: 0.6;
    word-break: break-all;
  }
  .profile-subtitle {
    font-size: 11px;
    opacity: 0.45;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  :global(.profile-list .k-list-item) {
    font-size: 14px;
    color: #ffffff !important;
  }
  :global(.profile-list .k-list-item a),
  :global(.profile-list .k-list-item div),
  :global(.profile-list .k-list-item span) {
    color: #ffffff !important;
  }
  :global(.profile-logout),
  :global(.profile-logout div),
  :global(.profile-logout span) {
    color: #ffb4b4 !important;
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

  /* Full-screen dimmed overlay centered on the viewport */
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

  /* Contact.svelte renders its own white card - we neutralize its outer
     margin/radius so it blends into the modal container. */
  .feedback-modal :global(.contact-us) {
    margin: 0;
    box-shadow: none;
    border-radius: 24px;
    padding-top: 56px; /* room for the close button */
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
  }
</style>
