<script>
  let { names, codes } = $props();
  let current = $state();
  let search = $state("");
  let filtered = $state(names.map((f, i) => ({ name: f, abbr: codes[i] })));
  $effect(() => {
    filtered = names
      .map((f, i) => ({ name: f, abbr: codes[i] }))
      .filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));
  });
</script>

<main class="main">
  <h1 class="header">Select Faculty</h1>
  <div class="container">
    <input
      type="text"
      placeholder="Search"
      bind:value={search}
      class="selector"
    />
    {#each filtered as faculty}
      <button
        class={`course selector ${current === faculty.abbr ? "selected" : ""}`}
        onclick={() => (current = faculty.abbr)}
      >
        {faculty.name}</button
      >
    {/each}
  </div>
  {#if current}
    <footer>
      <a href={`b/${current}`}
        ><button class="footerButton">Get Started</button></a
      >
    </footer>
  {/if}
</main>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
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
