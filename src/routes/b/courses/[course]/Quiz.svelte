<script>
  import { goto } from "$app/navigation";
  import { Level, faculty, department } from "$lib/stores";

  let { Quiz, next, course } = $props();
  let result = $state("");
  let option = $state("");

  function newQuiz(e) {
    e.preventDefault();
    goto(`/b/courses/${course}/?q=${encodeURIComponent(next)}`);
    result = "";
    option = "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!option) return;

    if (option === Quiz.correctAnswer) {
      result = `Correct!! The answer is ${Quiz.correctAnswer}`;
    } else {
      result = `Wrong!!! The answer is ${Quiz.correctAnswer}`;
    }
  }
</script>

<main class="page-body">
  <div class="quiz-card">
    <div class="header-block">
      <h1 class="quiz-title">{Quiz.title}</h1>
      {#if Quiz.instruction}
        <code class="instruction-box">{Quiz.instruction}</code>
      {/if}
      <h2 class="question-text">{Quiz.question}</h2>
    </div>

    <!-- Radio Group inside a Form -->
    <form onsubmit={handleSubmit} class="quiz-form">
      <div class="options-group">
        {#each Quiz.options ?? [] as opt}
          <label class="option-card" class:selected={option === opt}>
            <input
              type="radio"
              name="quiz-option"
              value={opt}
              bind:group={option}
              class="sr-only"
            />
            <span class="option-text">{opt}</span>
            <div class="radio-indicator"></div>
          </label>
        {/each}
      </div>

      {#if option}
        <a href="#submit" class="submit-btn" onclick={handleSubmit}>
          Check The Answer
        </a>
      {/if}
    </form>

    {#if result}
      <div class="result-banner" class:correct={result.startsWith("Correct")}>
        {result}
      </div>
    {/if}
  </div>

  <!-- Bottom Navigation Bar -->
  <footer class="bottom-footer">
    <div class="footer-actions">
      {#if $department}
        <a
          href={`/b/${$faculty}/${$department}?level=${$Level}`}
          class="footer-link secondary"
        >
          Change Course
        </a>
      {:else}
        <a href="/b/" class="footer-link secondary">
          Change Course
        </a>
      {/if}

      <a href="#change-question" class="footer-link primary" onclick={newQuiz}>
        Next Question
      </a>
    </div>
  </footer>
</main>

<style>
  .page-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px 16px 120px;
    box-sizing: border-box;
  }

  .quiz-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .header-block {
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }

  .quiz-title {
    font-size: 1.25rem;
    color: #a78bfa;
    font-weight: 800;
    margin: 0;
  }

  .instruction-box {
    background-color: #161026;
    border: 1px dashed #2d2242;
    padding: 8px 12px;
    border-radius: 8px;
    color: #9ca3af;
    font-size: 0.85rem;
    text-align: left;
  }

  .question-text {
    font-size: 1.1rem;
    color: #ffffff;
    font-weight: 600;
    line-height: 1.4;
    margin: 0;
  }

  .quiz-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }

  .options-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  /* Label Card for Radio Inputs */
  .option-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 16px 20px;
    background-color: #20153a;
    border: 1.5px solid transparent;
    border-radius: 14px;
    color: #ffffff;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s ease;
    box-sizing: border-box;
  }

  .option-card:hover {
    border-color: #7a5cfa;
  }

  .option-card.selected {
    background-color: #3c2572;
    border-color: #7a5cfa;
  }

  /* Visually hides native radio inputs */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Custom styled radio indicator */
  .radio-indicator {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #4c3b80;
    box-sizing: border-box;
    transition: all 0.2s ease;
  }

  .option-card.selected .radio-indicator {
    border-color: #7a5cfa;
    background-color: #7a5cfa;
    box-shadow: inset 0 0 0 3px #3c2572;
  }

  /* Submit Action Link */
  .submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 14px;
    background-color: #7a5cfa;
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
    border-radius: 10px;
    text-align: center;
    transition: background-color 0.2s ease;
  }

  .submit-btn:hover {
    background-color: #6842f8;
  }

  .result-banner {
    padding: 14px;
    border-radius: 10px;
    background-color: rgba(239, 68, 68, 0.15);
    border: 1px solid #ef4444;
    color: #fca5a5;
    font-weight: 600;
    text-align: center;
  }

  .result-banner.correct {
    background-color: rgba(34, 197, 94, 0.15);
    border-color: #22c55e;
    color: #86efac;
  }

  /* Bottom Navigation Footer */
  .bottom-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    padding: 16px 20px;
    background: linear-gradient(to bottom, rgba(12, 9, 20, 0.8), #0c0914);
    backdrop-filter: blur(8px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 99;
  }

  .footer-actions {
    display: flex;
    gap: 12px;
    width: 100%;
    max-width: 600px;
  }

  .footer-link {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    text-align: center;
    transition: background-color 0.2s ease;
  }

  .footer-link.primary {
    background-color: #7a5cfa;
    color: #ffffff;
  }

  .footer-link.secondary {
    background-color: #161026;
    color: #9ca3af;
    border: 1px solid #2d2242;
  }

  .footer-link.secondary:hover {
    color: #ffffff;
    border-color: #4c3b80;
  }
</style>
