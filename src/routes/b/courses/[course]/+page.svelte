<script>
  import { Button } from "konsta/svelte";
  import { Level, faculty, department } from "#lib/stores.js";
  import { page } from "$app/state";

  let { data } = $props();

  let option = $state("");
  let checked = $state(false);
  let jsReady = $state(false);
  $effect(() => {
    jsReady = true;
  }); // "Check answer" only appears when it can work

  const quiz = $derived(data.quiz?.[0]);
  const course = $derived(data.course);
  const next = $derived(data.next);
  const options = $derived((quiz?.options ?? []).filter((o) => o?.trim()));

  const verdict = $derived(
    !checked
      ? ""
      : !option
        ? "revealed"
        : option === quiz?.correctAnswer
          ? "correct"
          : "wrong",
  );

  function check(e) {
    e.preventDefault();
    checked = true;
  } // New question: clear the previous pick once the data actually changes
  $effect.pre(() => {
    void quiz;
    option = "";
    checked = false;
  });

  const description = $derived(
    `Practice ${data.course} past questions and likely exam questions on ExaminU. Test yourself and prepare smarter for your exams.`,
  );
</script>

<svelte:head>
  <title>{data.course} Past Questions | ExaminU</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={page.url.origin + page.url.pathname} />

  <meta
    property="og:title"
    content={`${data.course} Past Questions | ExaminU`}
  />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={page.url.origin + page.url.pathname} />
  <meta property="og:site_name" content="ExaminU" />
</svelte:head>

<main class="page-body">
  {#if quiz}
    <div class="quiz-card">
      <div class="header-block">
        <h1 class="quiz-title">{quiz.title}</h1>
        {#if quiz.instruction}
          <p class="instruction-box">{quiz.instruction}</p>
        {/if}
        <h2 class="question-text">{quiz.question}</h2>
      </div>

      <form class="quiz-form" onsubmit={check}>
        <div class="options-group">
          {#each options as opt}
            <label class="option-card" class:selected={option === opt}>
              <input
                type="radio"
                name="quiz-option"
                value={opt}
                bind:group={option}
                onchange={() => (checked = false)}
                class="sr-only"
              />
              <span class="option-text">{opt}</span>
              <span class="radio-indicator" aria-hidden="true"></span>
            </label>
          {/each}
        </div>

        {#if jsReady}
          <button type="submit" class="submit-btn" disabled={checked}>
            Check answer
          </button>
        {/if}
      </form>

      <div role="status" aria-live="polite">
        {#if verdict}
          <div
            class="result-banner"
            class:correct={verdict === "correct"}
            class:revealed={verdict === "revealed"}
          >
            {verdict === "correct"
              ? "Correct. "
              : verdict === "wrong"
                ? "Not quite. "
                : ""}The answer is {quiz.correctAnswer}.
          </div>
          {#if quiz.explanation}
            <p class="explanation">{quiz.explanation}</p>
          {/if}
        {/if}
      </div>
    </div>
  {:else}
    <p class="instruction-box">We couldn't find that question.</p>
  {/if}

  <!-- Bottom Navigation Bar -->
  <footer class="bottom-footer">
    <div class="footer-actions">
      <a
        href={$department
          ? `/b/${$faculty}/${$department}?level=${$Level}`
          : "/b"}
        class="footer-link secondary"
      >
        Change course
      </a>

      {#if next}
        <a
          href={`/b/courses/${encodeURIComponent(course)}?q=${encodeURIComponent(next)}`}
          class="footer-link primary"
        >
          Next question
        </a>
      {/if}
    </div>
  </footer>
</main>

<style>
  .page-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    padding: 80px 16px 120px;
    box-sizing: border-box;
  }

  .quiz-card {
    width: 100%;
    max-width: 600px;
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
    white-space: pre-wrap;
  }

  .question-text {
    font-size: 1.1rem;
    color: #ffffff;
    font-weight: 600;
    line-height: 1.4;
    margin: 0;
    white-space: pre-wrap; /* keeps line breaks in code questions */
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
    position: relative; /* anchors the visually hidden radio */
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
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

  /* :has() keeps the highlight working even without JavaScript */
  .option-card.selected,
  .option-card:has(input:checked) {
    background-color: #3c2572;
    border-color: #7a5cfa;
  }

  .option-card:has(input:focus-visible) {
    outline: 3px solid rgba(184, 168, 255, 0.8);
    outline-offset: 2px;
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
    flex: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #4c3b80;
    box-sizing: border-box;
    transition: all 0.2s ease;
  }

  .option-card.selected .radio-indicator,
  .option-card:has(input:checked) .radio-indicator {
    border-color: #7a5cfa;
    background-color: #7a5cfa;
    box-shadow: inset 0 0 0 3px #3c2572;
  }

  /* Check answer button */
  .submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 14px;
    background-color: #7a5cfa;
    color: #ffffff;
    font: inherit;
    font-weight: 600;
    border: none;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .submit-btn:hover:not(:disabled) {
    background-color: #6842f8;
  }

  .submit-btn:focus-visible {
    outline: 3px solid rgba(184, 168, 255, 0.8);
    outline-offset: 2px;
  }

  .submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

  .explanation {
    margin-top: 12px;
    padding: 12px 14px;
    background-color: #161026;
    border: 1px solid #2d2242;
    border-radius: 10px;
    color: #d1d5db;
    font-size: 0.9rem;
    line-height: 1.5;
    white-space: pre-wrap;
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

  .footer-link.primary:hover {
    background-color: #6842f8;
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

  .footer-link:focus-visible {
    outline: 3px solid rgba(184, 168, 255, 0.8);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    .option-card,
    .radio-indicator,
    .submit-btn,
    .footer-link {
      transition: none;
    }
  }
</style>
