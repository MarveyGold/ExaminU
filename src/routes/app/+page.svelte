<script>
  let current = $state("");

  const exams = [
    { name: "Post UTME", code: "asp" },
    { name: "Uniben Exam", code: "b" },
  ];
</script>

<main class="main">
  <h1 class="header">Select Exam</h1>

  <div class="container">
    {#each exams as exam}
      <a
        href={`/${exam.code}`}
        class:selected={current === exam.code}
        class="course selector"
        onclick={(e) => {
          if (!current || current !== exam.code) {
            e.preventDefault();
            current = exam.code;
          }
        }}
      >
        {exam.name}
      </a>
    {/each}
  </div>

  {#if current}
    <footer>
      <a href={`/${current}`}>
        <button class="footerButton">Get Started</button>
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
