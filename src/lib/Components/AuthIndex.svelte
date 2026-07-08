<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { prev } from "$lib/stores";
  import Me from "$lib/Icons/me.svelte";
  let { class: className = "", data, ...props } = $props();
  const user = $page.data.user;
  //console.log(user);
  function Auth(a) {
    document.cookie = `prev=${$page.url.href};  path=${`/${a}`} `;
    goto(`/${a}?redirect=${$page.url.href}`);
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

{#if user}
  <li class="auth-row {className}">
    <div role="button" class="icon-toggle" onclick={changeStyle}><Me /></div>
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

<style>
  ul {
    display: none;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 15px;
    right: 0;
    top: 10dvh;
    background-color: #fff;
    padding: 20px;
    position: absolute;
  }

  .active {
    display: flex;
  }
  @media (max-width: 768px) {
    ul {
      top: 18dvh;
      z-index: -1;
    }
    .email {
      display: none;
    }
    ul li button {
      width: 45vw;
      right: 0;
      position: absolute;
    }
  }
</style>
