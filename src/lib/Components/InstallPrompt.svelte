<script>
  import { onMount } from "svelte";

  let { name = "ExaminU" } = $props();

  // 'checking' | 'android' | 'ios' | 'installed' | 'unsupported'
  let platform = $state("checking");
  let deferredPrompt = null;
  let dismissed = $state(false);

  onMount(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;

    if (standalone) {
      platform = "installed";
      return;
    }

    dismissed = sessionStorage.getItem("examinu-install-dismissed") === "1";

    const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream;
    if (isIOS) {
      platform = "ios";
      return;
    }

    // Chrome/Edge/Android fire this when the PWA install criteria are met.
    // Until then (or on browsers that never fire it, like desktop Safari/Firefox),
    // stay 'unsupported' and render nothing rather than a button that can't work.
    platform = "unsupported";

    function onBeforeInstall(e) {
      e.preventDefault();
      deferredPrompt = e;
      platform = "android";
    }

    function onInstalled() {
      platform = "installed";
      deferredPrompt = null;
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  });

  async function install() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    if (outcome === "accepted") platform = "installed";
  }

  function dismiss() {
    dismissed = true;
    sessionStorage.setItem("examinu-install-dismissed", "1");
  }
</script>

{#if !dismissed && (platform === "android" || platform === "ios")}
  <div class="install" role="note">
    <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="2" width="18" height="20" rx="3" />
      <path d="M9 18h6" />
      <path d="M12 6v6m0 0-2.5-2.5M12 12l2.5-2.5" />
    </svg>

    <div class="text">
      {#if platform === "android"}
        <p class="title">Add {name} to your home screen</p>
        <p class="body">One tap to open, no app store, works like any other app on your phone.</p>
      {:else}
        <p class="title">Add {name} to your home screen</p>
        <p class="body">
          Tap
          <svg class="share" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3v12" />
            <path d="m8 7 4-4 4 4" />
            <rect x="5" y="11" width="14" height="10" rx="2" />
          </svg>
          then "Add to Home Screen".
        </p>
      {/if}
    </div>

    {#if platform === "android"}
      <button type="button" class="install-btn" onclick={install}>Add</button>
    {/if}

    <button type="button" class="dismiss" onclick={dismiss} aria-label="Dismiss">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5 19 19M19 5 5 19" /></svg>
    </button>
  </div>
{/if}

<style>
  .install {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    max-width: 30rem;
    padding: 0.875rem 0.75rem 0.875rem 1rem;
    border: 1px solid var(--line);
    border-radius: 12px;
    background: var(--paper);
    box-shadow: 0 10px 24px -18px rgba(27, 23, 64, 0.4);
  }

  .icon {
    flex: none;
    width: 26px;
    height: 26px;
    fill: none;
    stroke: var(--violet);
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .text {
    flex: 1;
    min-width: 0;
    text-align: left;
  }

  .title {
    font-size: 0.9375rem;
    font-weight: 700;
    color: var(--ink);
  }

  .body {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin-top: 0.125rem;
    font-size: 0.8125rem;
    line-height: 1.4;
    color: var(--muted);
  }

  .share {
    flex: none;
    width: 15px;
    height: 15px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    vertical-align: -2px;
  }

  .install-btn {
    flex: none;
    min-height: 40px;
    padding: 0 1rem;
    border: 0;
    border-radius: 999px;
    background: var(--violet);
    color: #fff;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
  }

  .install-btn:hover {
    background: var(--violet-deep);
  }

  .dismiss {
    flex: none;
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: 50%;
    background: none;
    color: var(--muted);
    cursor: pointer;
  }

  .dismiss:hover {
    background: var(--violet-tint);
    color: var(--violet-deep);
  }

  .dismiss svg {
    width: 14px;
    height: 14px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
  }

  button:focus-visible {
    outline: 3px solid var(--violet);
    outline-offset: 2px;
  }
</style>
