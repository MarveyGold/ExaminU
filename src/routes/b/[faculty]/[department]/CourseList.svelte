<script>
  import { goto } from "$app/navigation";
  import { Level } from "$lib/stores";
  let { departmentName, level, courses, faculty, department } = $props();
  let selected = $state();
  $effect(() => {
    Level.set(level);
    console.log($Level);
  });
</script>

<main>
  <div class="title">
    <h1>{departmentName}</h1>
  </div>

  <nav>
    <a href={`/b/${faculty}/${department}/?level=100`}>
      <button
        style={level == 200 ? " opacity: 0.5 " : " opacity: 1 "}
        class="navButton"><h5>100 Level</h5></button
      ></a
    >
    <button
      onclick={() => goto(`/b/${faculty}/${department}/?level=200`)}
      style={level == 200 ? " opacity: 1 " : " opacity: 0.4 "}
      class="navButton"><h5>200 Level</h5></button
    >
  </nav>
  {#if level == "100"}
    {#each courses["100level"] as course}
      {#if !course.hidden}
        <button
          class={`course selector ${selected == course.code ? "selected" : ""}`}
          onclick={() => (selected = course.code)}
          ><b>{course.name} - {course.code.toUpperCase()}</b></button
        >
      {/if}
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
    <a href={`/b/${faculty}/`}
      ><button class={selected ? "left-footerButton" : "footerButton"}
        >Change Department</button
      ></a
    >
    {#if selected}
      <a href={`/b/courses/${selected}`}
        ><button class="footerButton">Start Quiz</button></a
      >
    {/if}
  </footer>
</main>

<style>
  .title {
    position: fixed;
    left: 0;
    top: 13vh;
    width: 95vw;
    display: flex;
    align-items: center;
    justify-content: center;
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
  h1 {
    font-size: 1rem;
  }
</style>
