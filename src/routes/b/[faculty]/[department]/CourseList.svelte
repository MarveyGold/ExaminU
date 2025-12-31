<script>
  let { departmentName, level, courses, faculty } = $props();
  let selected = $state();
</script>

<main>
  <div class="title">
    <h2>{departmentName}</h2>
  </div>

  <nav>
    <a href="?level=100"
      ><button
        style={level == 200 ? " opacity: 0.5 " : " opacity: 1 "}
        class="navButton"><h3>100 Level</h3></button
      ></a
    >
    <a href="?level=200"
      ><button
        style={level == 200 ? " opacity: 1 " : " opacity: 0.4 "}
        class="navButton"><h3>200 Level</h3></button
      ></a
    >
  </nav>
  {#if level == "100"}
    {#each courses["100level"] as course}
      <button
        class={`course selector ${selected == course.code ? "selected" : ""}`}
        onclick={() => (selected = course.code)}
        ><b>{course.name} - {course.code.toUpperCase()}</b></button
      >
    {/each}
  {:else if level == "200"}
    {#each courses["200level"] as course}
      <button
        class={`course selector ${selected == course.code ? "selected" : ""}`}
        onclick={() => (selected = course.code)}
        ><b>{course.name} - {course.code.toUpperCase()}</b></button
      >
    {/each}
  {/if}
  <footer>
    <a href={`/b/${faculty}`}
      ><button class="footerButton">Change Department</button></a
    >
  </footer>
</main>

<style>
  .title {
    position: fixed;
    top: 13vh;
    left: 42vw;
  }

  .navButton {
    transform: translateY(-50%);
    background: none;
    border: none;
    border-radius: 50%;
    padding: 8px 12px;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  .navButton:active {
    transform: translateY(-50%) scale(0.98);
  }
  .navButton:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.06);
  }
  nav {
    z-index: 5000;
  }
</style>
