<script>
  let { data } = $props();
  let current = $state();
  const names = {
    bio: "Biology",
    chem: "Chemistry",
    econs: "Economics",
    eng: "English",
    gov: "Government",
    phy: "Physics",
  };
</script>

<main class="main">
  <h2 class="header">Post-UTME Subjects</h2>
  <div class="container">
    {#each data.subjects as subject}
      <a
        href={`/asp/${names[subject].toLowerCase()}`}
        class={`course selector ${current === subject ? "selected" : ""}`}
        onclick={(e) => {
          e.preventDefault();
          current = names[subject].toLowerCase();
        }}
      >
        {names[subject] ?? subject}
      </a>
    {/each}
  </div>
  {#if current}
    <footer>
      <a href={`asp/${current}`}
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
