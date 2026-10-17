<script>
  import "./layout.css";
  import { page } from "$app/state";
  import "../globals.css";
  import Auth from "#lib/Components/Auth.svelte";
  import { landing } from "#lib/landing.js";
  import { App } from "konsta/svelte";
  let { children } = $props();

  const site = "https://examinu.pxxl.run";
  const isHome = $derived(page.url.pathname === "/");

  const meta = $derived(
    isHome
      ? landing.meta
      : {
          title: "ExaminU",
          description:
            "ExaminU is a web based revision app built to make exam preparation easier for university students using past questions and likely exam questions",
        },
  );

  const url = $derived(`${site}${page.url.pathname}`);
</script>

<svelte:head>
  <link rel="icon" href="/favicon.png" />
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <meta name="theme-color" content="#ffffff" />
  <link rel="manifest" href="/manifest.json" />
  <link rel="canonical" href={url} />

  <!-- Link previews. WhatsApp reads these when someone shares the link. -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="ExaminU" />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:url" content={url} />
  <meta property="og:image" content="{site}/og.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>
<App theme="ios">
  <!-- The landing page has its own header. -->
  {#if !isHome}
    <header>
      <a href="/">
        <img class="uniben" src="/favicon.png" alt="examinu" />
        <h1 class="logo">ExaminU</h1>
      </a>
      <Auth class="mobile" />
    </header>
  {/if}

  {@render children()}
</App>
