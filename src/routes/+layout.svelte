<script>
  import favicon from "$lib/assets/favicon.svg";
 import { page } from '$app/state';
  import "../globals.css";
  import Auth from "$lib/Components/Auth.svelte";
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href="/favicon.png" />
  <title>ExaminU</title>
<meta name="description" content="ExaminU is a web based revision app built to make exam preparation easier for university students using past questions and likely exam questions" />
  <meta name="theme-color" content="#ffffff" />
  <link rel="manifest" href="/manifest.json" />
  <link rel="canonical" href={`https://examinu.pxxl.run${page.url.pathname}`} />
</svelte:head>

<header>
  <a href="/">
    <img class="uniben" src="/favicon.png" alt="examinu" />
    <h1 class="logo">ExaminU</h1>
  </a>
  <Auth class="mobile" />
</header>

{@render children()}
