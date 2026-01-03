<script>
  import { goto } from "$app/navigation";
  import { level, faculty, department } from "$lib/stores";
  let { Quiz, length, course } = $props();
  let result = $state("");
  let option = $state("");
  function newQuiz() {
    const randomIndex = Math.floor(Math.random() * length);

    goto(`/b/courses/${course}/?q=${randomIndex}`);
    result = "";
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (option == Quiz.correctAnswer) {
      result = `Correct!! The answer is ${Quiz.correctAnswer}`;
    } else {
      result = `Wrong!!! The answer is ${Quiz.correctAnswer}`;
    }
    //goto(``);
  }
</script>

<main>
  <div class="home">
    <div class="title">
      {Quiz.title}
    </div>
    {#if Quiz.instruction}
      <code>
        {Quiz.instruction}
      </code>
    {/if}

    <h4>
      {Quiz.question}
    </h4>

    <form onsubmit={handleSubmit}>
      <div>
        <label class="selector">
          <input
            type="radio"
            name="Option"
            value={Quiz.optionA}
            bind:group={option}
          />
          {Quiz.optionA}
        </label>

        <label class="selector">
          <input
            type="radio"
            name="Option"
            value={Quiz.optionB}
            bind:group={option}
          />
          {Quiz.optionB}
        </label>
        <label class="selector">
          <input
            type="radio"
            name="Option"
            value={Quiz.optionC}
            bind:group={option}
          />
          {Quiz.optionC}
        </label>
        <label class="selector">
          <input
            type="radio"
            name="Option"
            value={Quiz.optionD}
            bind:group={option}
          />
          {Quiz.optionD}
        </label>
        {#if Quiz.optionE}
          <label class="selector">
            <input
              type="radio"
              name="Option"
              value={Quiz.optionE}
              bind:group={option}
            />
            {Quiz.optionE}
          </label>
        {/if}
      </div>
      <div class="ans">
        <button type="submit" class="answerButton">Check The Answer</button>
      </div>
    </form>
    <h5>{result}</h5>

    <div id="preFooter"></div>
    <footer>
      {#if $department}
        <a href={`/b/${$faculty}/${$department}?level=${$level}`}
          ><button class="footerButton"><h5>Change Course</h5></button></a
        >
      {:else}
        <a href={`/b/`}
          ><button class="footerButton"><h5>Change Course</h5></button></a
        >
      {/if}
      <button class="footerButton" onclick={newQuiz}>Change Question</button>
    </footer>
  </div>
</main>

<style>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    color: #fff;
    font-family: sans-serif;
    width: 80vw;
    position: absolute;
    top: 5px;

    margin-bottom: 50px;
  }
  .title {
    font-size: 20px;
    display: flex;
    color: blueviolet;
    font: bold;
    font-weight: 800;
    margin-bottom: 50px;
  }
  .footerButton {
    width: 35vw;
    height: 45px;
    border-radius: 20px;
    color: white;
    background: linear-gradient(blueviolet, blue);
    border: none;
    position: relative;
  }
  .footerButton:hover {
    background: linear-gradient(purple, rgb(102, 0, 255));
  }
</style>
