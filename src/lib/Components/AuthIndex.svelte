<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Me from "$lib/Icons/me.svelte";

  let { class: className = "", data, ...props } = $props();
  const user = $derived($page.data.user);

  function Auth(a) {
    document.cookie = `prev=${$page.url.href}; path=/${a}`;
    goto(`/${a}?redirect=${encodeURIComponent($page.url.href)}`);
  }

  let style = $state("");

  function changeStyle() {
    style = style === "" ? "active" : "";
  }

  async function signout() {
    const res = await fetch("/api/logout");
    if (res.ok) {
      window.location.href = $page.url.href;
    }
  }
</script>

<ul class="auth-container">
  {#if user}
    <li class="auth-row {className}">
      <button class="icon-toggle" onclick={changeStyle} aria-label="User menu">
        <Me />
      </button>
      {#if style === "active"}
        <span class="email">{user.email}</span>
      {/if}
      <button class="signup" onclick={signout}>Sign Out</button>
    </li>
  {:else}
    <li class="auth-row {className}">
      <button class="login" onclick={() => Auth("login")}>Sign in</button>
      <button class="signup" onclick={() => Auth("signup")}>Sign up</button>
    </li>
  {/if}
</ul>

<style>
  .auth-container {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .auth-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .icon-toggle {
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .email {
    font-size: 14px;
    color: #333;
  }

  .login {
    background: transparent;
    border: 1px solid #ddd;
    color: #333;
    padding: 8px 18px;
    border-radius: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .login:hover {
    border-color: #7a5cfa;
    color: #7a5cfa;
  }

  .signup {
    background: #7a5cfa;
    color: #fff;
    border: none;
    padding: 8px 18px;
    border-radius: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .signup:hover {
    background: #5a3eda;
  }

  @media (max-width: 768px) {
    .email {
      display: none;
    }
  }
</style>
