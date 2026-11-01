<script>
  import { browser } from "$app/env";
  let { text, speed = 28, delay = 0 } = $props();

  let shown = $state("");

  $effect(() => {
    shown = "";
    let i = 0;
    let interval;

    const start = setTimeout(() => {
      interval = setInterval(() => {
        shown = text.slice(0, ++i);
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  });
</script>

{#if browser}
  <!-- content here -->
  <span>{@html shown}</span><span class="cursor">|</span>
{:else}
  <!-- else content here -->
  <span>{@html text}</span>
{/if}

<style>
  .cursor {
    animation: blink 1s steps(1) infinite;
  }
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
</style>
