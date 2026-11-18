<script lang="ts">
  import { goto, refreshAll } from "$app/navigation";
  import { page } from "$app/state";
  import { Popover, List, ListItem } from "konsta/svelte";

  import Me from "#lib/Icons/me.svelte";
  import Contact from "#lib/Components/Contact.svelte";

  let { class: className = "", ...props } = $props();

  let user = $derived(page.data.user);
  let open = $state(false);
  let feedbackOpen = $state(false);
  let triggerEl = $state<HTMLElement | null>(null);

  const displayName = $derived(
    (user?.name && user.name !== "user" ? user.name : "") ||
      user?.username ||
      user?.email?.split("@")[0] ||
      "Account",
  );

  const initial = $derived(Array.from(displayName)[0]?.toUpperCase() ?? "?");

  const icons = {
    settings:
      "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
    submissions:
      "M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
    feedback:
      "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z",
    logout:
      "M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z",
  };

  function auth(target: string) {
    document.cookie = `prev=${encodeURIComponent(page.url.href)}; path=/; max-age=600; samesite=lax`;
    goto(`/${target}?redirect=${encodeURIComponent(page.url.href)}`);
  }

  async function signout() {
    close();
    await fetch("/api/logout", { method: "POST" });
    await refreshAll();
  }

  function close() {
    open = false;
  }

  function openFeedback() {
    close();
    feedbackOpen = true;
  }
</script>

{#snippet icon(path: string)}
  <svg
    class="size-5.5 fill-current"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path d={path} />
  </svg>
{/snippet}

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
  </div>

  <Popover
    opened={open}
    target={triggerEl}
    size="min-w-64 w-max max-w-[calc(100vw-24px)]"
    onBackdropClick={close}
    colors={{ bgMaterial: "bg-[#eceef8]" }}
    class="!rounded-[18px] !p-0 !pb-[6px] overflow-hidden text-[#1a1840] !shadow-[0_4px_6px_rgba(0,0,0,0.2),0_12px_28px_rgba(0,0,0,0.35)]"
  >
    <!-- Header -->
    <div class="grid justify-items-center px-4 pt-[13px]">
      <div
        class="grid size-14 select-none place-items-center rounded-full bg-[#9d8ef2] text-2xl font-medium leading-none text-white"
        aria-hidden="true"
      >
        {initial}
      </div>
      <p
        class="mt-[10px] max-w-full break-words text-center text-base font-semibold leading-5 text-[#14122e]"
      >
        {displayName}
      </p>
      <p
        class="mt-[2px] max-w-full truncate text-center text-xs leading-4 text-[#6b6b7b]"
      >
        {user.email}
      </p>
    </div>

    <!-- Actions -->
    <List
      menuList
      strong={false}
      dividers={false}
      margin="mt-3 mb-0"
      class="!p-0"
    >
      <ListItem
        menuListItem
        link
        href="/me"
        title="Manage your account"
        onclick={close}
        class="!min-h-0 !p-0"
        contentClass="!h-9 !min-h-0 !py-0 !ps-[14px] !pe-[13px] hover:!bg-[rgba(26,24,64,0.08)]"
        innerClass="!py-0 !min-h-0"
        titleClass="!text-[15px] !leading-none !text-[#1a1840]"
        mediaClass="!me-[13px] !text-[#1a1840]"
      >
        {#snippet media()}{@render icon(icons.settings)}{/snippet}
      </ListItem>

      <ListItem
        menuListItem
        link
        href="/me/submissions"
        title="My submissions"
        onclick={close}
        class="!min-h-0 !p-0"
        contentClass="!h-9 !min-h-0 !py-0 !ps-[14px] !pe-[13px] hover:!bg-[rgba(26,24,64,0.08)]"
        innerClass="!py-0 !min-h-0"
        titleClass="!text-[15px] !leading-none !text-[#1a1840]"
        mediaClass="!me-[13px] !text-[#1a1840]"
      >
        {#snippet media()}{@render icon(icons.submissions)}{/snippet}
      </ListItem>

      <ListItem
        menuListItem
        link
        title="Send feedback"
        onclick={openFeedback}
        class="!min-h-0 !p-0"
        contentClass="!h-9 !min-h-0 !py-0 !ps-[14px] !pe-[13px] hover:!bg-[rgba(26,24,64,0.08)]"
        innerClass="!py-0 !min-h-0"
        titleClass="!text-[15px] !leading-none !text-[#1a1840]"
        mediaClass="!me-[13px] !text-[#1a1840]"
      >
        {#snippet media()}{@render icon(icons.feedback)}{/snippet}
      </ListItem>

      <ListItem
        menuListItem
        link
        title="Log out"
        onclick={signout}
        class="!min-h-0 !p-0"
        contentClass="!h-9 !min-h-0 !py-0 !ps-[14px] !pe-[13px] hover:!bg-[rgba(26,24,64,0.08)]"
        innerClass="!py-0 !min-h-0"
        titleClass="!text-[15px] !leading-none !text-[#c2303f]"
        mediaClass="!me-[13px] !text-[#c2303f]"
      >
        {#snippet media()}{@render icon(icons.logout)}{/snippet}
      </ListItem>
    </List>
  </Popover>
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
    .avatar-trigger {
      transition: none;
    }
  }
</style>
