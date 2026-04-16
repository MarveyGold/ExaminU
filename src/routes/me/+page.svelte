<script>
  let { data } = $props();
  let user = $state(data.user);
  async function logout() {
    await fetch("/api/logout");
  }
</script>

<main>
  {#if user}
    <!-- content here -->
    <h2>{user.email}</h2>
    <button class="footerButton" onclick={logout}>Log Out</button>
  {:else}
    <!-- else content here -->
    <h4>Please <a href="/login"> Log in</a></h4>
  {/if}
</main>
