<script>
  import { getQuizCourses, submitQuestions } from "#lib/functions/questions.remote.js";
  import { normalizeQuestion } from "#lib/questionSchema.js";

  const courses = getQuizCourses();
  const blank = () => ({ title: "", question: "", options: ["", "", "", "", ""], answer: 0, explanation: "" });

  let exam = $state("school");
  let items = $state([]);
  let fileName = $state("");
  let fileError = $state("");
  let busy = $state(false);
  let outcome = $state(null);
  let message = $state("");
  let single = $state(blank());

  const checked = $derived(items.map((raw, index) => ({ index, ...normalizeQuestion(raw) })));
  const valid = $derived(checked.filter((c) => c.ok));
  const invalid = $derived(checked.filter((c) => !c.ok));

  async function onFile(e) {
    const file = e.currentTarget.files?.[0];
    fileError = ""; outcome = null; message = ""; items = [];
    if (!file) return;
    if (file.size > 2_000_000) { fileError = "That file is over 2 MB."; return; }
    try {
      const data = JSON.parse(await file.text());
      const list = Array.isArray(data) ? data : data?.questions;
      if (!Array.isArray(list) || !list.length) throw new Error();
      items = list;
      fileName = file.name;
    } catch {
      fileError = "Could not read that file. Upload a JSON array of questions.";
    }
  }

  async function send(list) {
    busy = true; outcome = null; message = "";
    const total = { accepted: 0, duplicates: 0, rejected: 0 };
    try {
      for (let i = 0; i < list.length; i += 100) {
        const res = await submitQuestions({ exam, items: list.slice(i, i + 100) });
        total.accepted += res.accepted;
        total.duplicates += res.duplicates;
        total.rejected += res.rejected;
      }
      outcome = total;
    } catch (err) {
      message = err?.body?.message ?? "Something went wrong. Please try again.";
    } finally {
      busy = false;
    }
  }

  const sendFile = () => send(valid.map((c) => items[c.index]));

  async function sendSingle(e) {
    e.preventDefault();
    const options = single.options.map((o) => o.trim());
    const item = {
      title: single.title,
      question: single.question,
      options: options.filter(Boolean),
      correctAnswer: options[single.answer],
      explanation: single.explanation,
    };
    const r = normalizeQuestion(item);
    if (!r.ok) { message = r.errors.join(" "); outcome = null; return; }
    await send([item]);
    if (outcome?.accepted) single = blank();
  }
</script>

<svelte:head><title>Contribute questions · ExaminU</title></svelte:head>
 <datalist id="course-list">
    {#each courses.current ?? [] as c (c)}<option value={c}></option>{/each}
  </datalist>
<div class="page">
  <h1>Contribute questions</h1>
  <p>Submitted questions are reviewed before they appear in quizzes.</p>

  <label class="row">Exam type
    <select bind:value={exam}>
      <option value="school">School</option>
      <option value="post-utme">Post-UTME</option>
    </select>
  </label>

    <section>
    <h2>Add one question</h2>
    <form onsubmit={sendSingle}>
      <label>Course code
        <input list="course-list"  name="code" id="code" bind:value={single.title} placeholder="ECO111" required />
      </label>
      <label>Question
        <textarea rows="3" bind:value={single.question} required></textarea>
      </label>
      {#each single.options as _, i}
        <div >
          <input type="radio" name="answer" value={i} bind:group={single.answer}
                 aria-label={`Option ${"ABCDE"[i]} is correct`} />
          <input class="opta" bind:value={single.options[i]} placeholder={`Option ${"ABCDE"[i]}${i > 1 ? " (optional)" : ""}`}
                 required={i < 2} />
        </div>
      {/each}
      <label>Explanation (optional)
        <textarea rows="2" bind:value={single.explanation}></textarea>
      </label>
      <button disabled={busy} class="answerButton">{busy ? "Submitting…" : "Submit question"}</button>
    </form>
  </section>

  <section>
    <h2>Upload many (JSON)</h2>
    <p class="hint">
      A JSON array of objects with <code>title</code>, <code>question</code>, <code>options</code>,
      <code>correctAnswer</code> and optional <code>explanation</code>. The answer can be the option text or a letter A–E.
    </p>
    <input type="file" accept=".json,application/json" onchange={onFile} />
    {#if fileError}<p class="err">{fileError}</p>{/if}

    {#if items.length}
      <p><strong>{fileName}</strong>: {valid.length} ready, {invalid.length} with problems.</p>
      {#if invalid.length}
        <details open>
          <summary>Fix these in the file (they will be skipped)</summary>
          <ul class="problems">
            {#each invalid.slice(0, 15) as p (p.index)}
              <li>#{p.index + 1}: {p.errors.join(" ")}</li>
            {/each}
          </ul>
          {#if invalid.length > 15}<p class="hint">…and {invalid.length - 15} more.</p>{/if}
        </details>
      {/if}
      <button onclick={sendFile} disabled={busy || !valid.length}>
        {busy ? "Submitting…" : `Submit ${valid.length} question${valid.length === 1 ? "" : "s"}`}
      </button>
    {/if}
  </section>

  {#if message}<p class="err" role="alert">{message}</p>{/if}
  {#if outcome}
    <p class="ok" role="status">
      {outcome.accepted} submitted for review.
      {#if outcome.duplicates}{outcome.duplicates} already existed.{/if}
      {#if outcome.rejected}{outcome.rejected} were rejected.{/if}
    </p>
  {/if}
</div>

<style>
  .page { max-width: 44rem; margin: 0 auto; padding: 1.5rem 1rem 4rem; display: grid; gap: 1.5rem; }
  section, form { display: grid; gap: 0.75rem; }
  label { display: grid; gap: 0.25rem; font-weight: 600; }
  .row { max-width: 14rem; }
  .opt { display: flex; gap: 0.5rem; align-items: center; }
  .opt input[type="text"], .opt input:not([type]) { flex: 1; }
  input, textarea, select { font: inherit; padding: 0.5rem; }
  .hint { opacity: 0.75; font-size: 0.9rem; }
  .problems { padding-left: 1.25rem; font-size: 0.9rem; }
  .err { color: #d93a41; }
  .ok { color: #0d7a53; }
.opts {
    --ff: var(--font-serif);
    display: flex;
    gap: 0.5rem;
    list-style: none;
  }

  .opt input {
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

</style>
