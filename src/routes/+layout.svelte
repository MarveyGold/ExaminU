<script>
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href="favicon.png" />
  <title>ExaminU</title>
  <meta name="theme-color" content="#ffffff" />
  <link rel="manifest" href="/manifest.json" />
</svelte:head>
<header>
  <a href="/">
    <img class="uniben" src="/favicon.png" alt="examinu" />
    <div class="logo">ExaminU</div>
  </a>
</header>
{@render children()}
