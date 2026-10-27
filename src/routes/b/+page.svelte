<script>
  import {
    Page,
    Navbar,
    NavbarBackLink,
    Button,
    Searchbar,
    List,
    ListItem,
  } from "konsta/svelte";
  let { data } = $props();
  let names = $derived(data.names);
  let codes = $derived(data.codes);
  let current = $state("");
  let searchQuery = $state("");

  function handleSearch(e) {
    searchQuery = e.target.value;
  }
  function handleDisable() {
    console.log("Disable");
  }
  function handleClear() {
    searchQuery = "";
  }
  let filtered = $derived(
    names
      .map((f, i) => ({ name: f, abbr: codes[i] }))
      .filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase())),
  );
</script>

<main class="page-body">
  <div class="header-block">
    <Navbar
      title="Select Faculty"
      class="!bg-[transparent]"
      colors={{
        bgIos: "!bg-[#0c0914]",
        bgMaterial: "!bg-[#0c0914]",
        textIos: "!text-white",
        textMaterial: "!text-white",
      }}
      titleClass="!font-bold !text-white"
    />
    <Searchbar
      onInput={handleSearch}
      value={searchQuery}
      onClear={handleClear}
      class="  !bg-[#161026] max-w-150 !mx-auto rounded-3xl"
      disableButton={!searchQuery}
      disableButtonText="Cancel"
      onDisable={handleDisable}
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
    margin: 0 auto;
    padding: 80px 16px 20dvh;
    box-sizing: border-box;
  }
  :global(.bg-gradient-to-b) {
    display: none;
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
    max-width: 600px;
    margin: auto;
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
    justify-content: center;
    width: 100%;
    max-width: 600px;
    margin: auto;
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
  :global(.k-searchbar input) {
    padding-left: 44px !important;
  }

  :global(.k-searchbar svg) {
    width: 16px;
    height: 16px;
  }
  :global(.k-searchbar input) {
    color: #fff !important;
    font-size: 14px !important;
    line-height: 1.5;
  }

  :global(.k-searchbar input::placeholder) {
    color: rgb(255 255 255 / 55%) !important;
    opacity: 1 !important;
  }

  :global(.k-searchbar .k-glass > span svg) {
    width: 18px !important;
    height: 18px !important;
    opacity: 0.7 !important;
  }
  .start-link {
    width: 100%;
    max-width: 600px;
  }
  :global(.k-searchbar .k-glass) {
    background: #161026 !important;
    box-shadow: none !important;
  }
  :global(.footerButton) {
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
