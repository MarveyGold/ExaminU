<script>
  import { tick } from "svelte";

  let { samples, ctaHref = "/app", ctaLabel = "Practise more like this" } = $props();

  const letters = ["A", "B", "C", "D", "E"];

  let index = $state(0);
  let picked = $state(null);
  let optionsEl = $state();

  const q = $derived(samples[index]);
  const answered = $derived(picked !== null);
  const correct = $derived(answered && picked === q.answer);

  function pick(i) {
    if (answered) return;
    picked = i;
  }

  async function next() {
    index = (index + 1) % samples.length;
    picked = null;
    await tick();
    optionsEl?.querySelector("button")?.focus({ preventScroll: true });
  }
</script>

<article class="sheet" aria-labelledby="demo-question">
  <div class="gutter" aria-hidden="true">
    {#if answered}
      {#key `${index}-${picked}`}
        <svg class="mark" class:wrong={!correct} viewBox="0 0 32 32" fill="none">
          {#if correct}
            <path d="M5 17 C8 19 10 22 12 27 C15 16 20 9 29 4" />
          {:else}
            <path d="M7 7 L25 25" />
            <path d="M25 7 L7 25" />
          {/if}
        </svg>
      {/key}
    {/if}
  </div>

  <div class="body">
    <p class="meta">
      <span>{q.course} sample question</span>
      <span>{index + 1} of {samples.length}</span>
    </p>

    <p class="q" id="demo-question">{q.question}</p>

    <ul class="opts" bind:this={optionsEl}>
      {#each q.options as option, i}
        {@const isAnswer = answered && i === q.answer}
        {@const isMiss = answered && i === picked && i !== q.answer}
        <li>
          <button
            type="button"
            class="opt"
            class:is-correct={isAnswer}
            class:is-miss={isMiss}
            class:is-dim={answered && !isAnswer && !isMiss}
            aria-disabled={answered}
            onclick={() => pick(i)}
          >
            <span class="letter">{letters[i]}</span>
            <span class="text">{option}</span>
            {#if isAnswer}
              <svg class="state" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10.5 8 14.5 16 5.5" /></svg>
              <span class="sr">Correct answer</span>
            {:else if isMiss}
              <svg class="state" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5 15 15M15 5 5 15" /></svg>
              <span class="sr">Your answer, incorrect</span>
            {/if}
          </button>
        </li>
      {/each}
    </ul>

    <div class="result" aria-live="polite">
      {#if !answered}
        <p class="hint">Choose an answer to check it.</p>
      {:else}
        <p class="verdict" class:bad={!correct}>
          {correct ? "Correct." : `Not quite. The answer is ${letters[q.answer]}.`}
        </p>
        <p class="why">{q.why}</p>
        <div class="actions">
          <a class="go" href={ctaHref}>{ctaLabel}</a>
          <button type="button" class="again" onclick={next}>Try another</button>
        </div>
      {/if}
    </div>
  </div>
</article>

<style>
  .sheet {
    --gutter: 44px;
    position: relative;
    display: grid;
    grid-template-columns: var(--gutter) minmax(0, 1fr);
    background: var(--paper);
    border: 1px solid var(--line);
    border-radius: 14px;
    box-shadow: 0 22px 44px -26px rgba(27, 23, 64, 0.38);
    overflow: hidden;
  }

  /* The red margin line of an exercise book. */
  .sheet::before {
    content: "";
    position: absolute;
    inset-block: 0;
    left: var(--gutter);
    width: 1px;
    background: var(--pen);
    opacity: 0.55;
    transform-origin: top;
  }

  .gutter {
    position: relative;
  }

  .body {
    padding: 1.1rem 1.1rem 1.2rem 1rem;
    min-width: 0;
  }

  .meta {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    font-size: 0.8125rem;
    color: var(--muted);
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }

  /* Question text sits on ruled lines, like a printed paper. */
  .q {
    --ff: var(--font-serif);
    font-size: 1.2rem;
    line-height: 32px;
    color: var(--ink);
    text-wrap: pretty;
    background-image: repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 31px,
      var(--rule) 31px,
      var(--rule) 32px
    );
    margin-bottom: 1rem;
  }

  .opts {
    --ff: var(--font-serif);
    display: grid;
    gap: 0.5rem;
    list-style: none;
  }

  .opt {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-height: 48px;
    padding: 0.55rem 0.8rem;
    border: 1.5px solid var(--line);
    border-radius: 10px;
    background: var(--paper);
    color: var(--ink);
    font-size: 1.0625rem;
    text-align: left;
    cursor: pointer;
    transition: border-color 0.15s, background-color 0.15s;
  }

  .opt[aria-disabled="true"] {
    cursor: default;
  }

  .opt:not([aria-disabled="true"]):hover {
    border-color: var(--violet);
    background: var(--violet-tint);
  }

  .letter {
    flex: none;
    width: 1.5rem;
    font-weight: 700;
    color: var(--muted);
  }

  .text {
    flex: 1;
    min-width: 0;
  }

  .state {
    flex: none;
    width: 1.25rem;
    height: 1.25rem;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .is-correct {
    border-color: var(--ok);
    background: var(--ok-tint);
    color: var(--ok);
  }

  .is-correct .letter {
    color: var(--ok);
  }

  .is-miss {
    border-color: var(--pen);
    background: var(--pen-tint);
    color: var(--pen-text);
  }

  .is-miss .text {
    text-decoration: line-through;
    text-decoration-thickness: 1.5px;
  }

  .is-miss .letter {
    color: var(--pen-text);
  }

  .is-dim {
    opacity: 0.7;
  }

  .result {
    margin-top: 1rem;
    min-height: 8.75rem;
  }

  .hint {
    font-size: 0.9375rem;
    color: var(--muted);
  }

  .verdict {
    font-size: 1.0625rem;
    font-weight: 700;
    color: var(--ok);
  }

  .verdict.bad {
    color: var(--pen-text);
  }

  .why {
    margin-top: 0.25rem;
    font-size: 0.9375rem;
    line-height: 1.5;
    color: var(--body);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 1rem;
    margin-top: 0.875rem;
  }

  .go {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0 1.1rem;
    border-radius: 999px;
    background: var(--violet);
    color: #fff;
    font-size: 0.9375rem;
    font-weight: 600;
    transition: background-color 0.15s;
  }

  .go:hover {
    background: var(--violet-deep);
  }

  .again {
    min-height: 44px;
    padding: 0 0.25rem;
    border: 0;
    background: none;
    color: var(--violet-deep);
    font-size: 0.9375rem;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }

  /* The red-pen mark that appears in the margin. */
  .mark {
    position: absolute;
    top: 2.85rem;
    left: 7px;
    width: 30px;
    height: 30px;
    stroke: var(--pen);
    stroke-width: 2.6;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .opt:focus-visible,
  .go:focus-visible,
  .again:focus-visible {
    outline: 3px solid var(--violet);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: no-preference) {
    .sheet {
      animation: sheet-in 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both;
    }

    .sheet::before {
      animation: margin-draw 0.9s cubic-bezier(0.3, 0.6, 0.2, 1) 0.15s both;
    }

    .mark path {
      stroke-dasharray: 60;
      stroke-dashoffset: 60;
      animation: ink 0.45s ease-out 0.05s forwards;
    }

    @keyframes sheet-in {
      from {
        opacity: 0;
        transform: translateY(14px);
      }
    }

    @keyframes margin-draw {
      from {
        transform: scaleY(0);
      }
    }

    @keyframes ink {
      to {
        stroke-dashoffset: 0;
      }
    }
  }

  @media (max-width: 420px) {
    .sheet {
      --gutter: 38px;
    }

    .mark {
      left: 4px;
      width: 28px;
      height: 28px;
    }

    .q {
      font-size: 1.125rem;
    }
  }
</style>
