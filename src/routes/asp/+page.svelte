<script lang="ts">
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  let current = $state("");
</script>

<main class="main">
  <h2 class="header">Post-UTME Subjects</h2>
  <div class="container">
    {#each data.subjects as subject}
      <a
        href={`/asp/${subject.toLowerCase()}`}
        class={`course selector ${current === subject ? "selected" : ""}`}
        onclick={(e) => {
          e.preventDefault();
          current = subject.toLowerCase();
        }}
      >
        {subject}
      </a>
    {/each}
  </div>
  {#if current}
    <footer>
      <a class="footerButton" href={`/asp/${encodeURIComponent(current)}`}>
        Get Started
      </a>
    </footer>
  {/if}
</main>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-family: sans-serif;
    width: 80vw;
    position: relative;
    margin-top: 50px;

    margin-bottom: 50px;
  }
  .faculties {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    max-width: 100vw;
    height: 40vh;
    overflow: hidden;
  }
</style>
