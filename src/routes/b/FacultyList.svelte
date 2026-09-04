<script>
  let { names, codes } = $props();
  let current = $state("");
  let search = $state("");

  let filtered = $derived(
    names
      .map((f, i) => ({ name: f, abbr: codes[i] }))
      .filter((f) => f.name.toLowerCase().includes(search.toLowerCase())),
  );
</script>

<main class="page-body">
  <div class="header-block">
    <h1 class="page-title">Select Faculty</h1>
    <input
      type="text"
      placeholder="Search faculty..."
      bind:value={search}
      class="search-input"
    />
  </div>

  <div class="faculty-grid">
    {#each filtered as faculty}
      <a
        href={`b/${faculty.abbr}`}
        class="faculty-item"
        class:selected={current === faculty.abbr}
        onclick={(e) => {
          e.preventDefault();
          current = faculty.abbr;
        }}
      >
        <span class="faculty-name">{faculty.name}</span>
      </a>
    {/each}
  </div>

  {#if current}
    <footer class="bottom-footer">
      <a href={`b/${current}`} class="start-link">
        <button class="footerButton">Get Started</button>
      </a>
    </footer>
  {/if}
</main>

<style>
  .page-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 80px 16px 100px;
    box-sizing: border-box;
  }

  .header-block {
    width: 100%;
    text-align: center;
    margin-bottom: 24px;
  }

  .page-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 16px;
  }

  .search-input {
    width: 100%;
    padding: 14px 18px;
    border-radius: 12px;
    border: 1.5px solid #2d2242;
    background-color: #161026;
    color: #ffffff;
    font-size: 0.95rem;
    outline: none;
    box-sizing: border-box;
  }

  .search-input:focus {
    border-color: #7a5cfa;
  }

  .faculty-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  .faculty-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 20px;
    background-color: #20153a;
    border: 1.5px solid transparent;
    border-radius: 14px;
    color: #ffffff;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    box-sizing: border-box;
    transition: all 0.2s ease;
  }

  .faculty-item:hover {
    border-color: #7a5cfa;
  }

  .faculty-item.selected {
    background-color: #3c2572;
    border-color: #7a5cfa;
  }

  .bottom-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    padding: 16px;
    background: linear-gradient(to bottom, rgba(12, 9, 20, 0.8), #0c0914);
    backdrop-filter: blur(8px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 99;
  }

  .start-link {
    width: 100%;
    max-width: 600px;
  }

  .footerButton {
    width: 100%;
    background-color: #7a5cfa;
    color: #ffffff;
    border: none;
    padding: 14px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
  }
</style>
