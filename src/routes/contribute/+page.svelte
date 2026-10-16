<script>
  import {
    getQuizCourses,
    submitQuestions,
    getUploadRules,
    uploadFiles,
  } from "#lib/functions/questions.remote.js";
  import { normalizeQuestion } from "#lib/questionSchema.js";

  const courses = getQuizCourses();
  const rules = getUploadRules();

  const blank = () => ({
    title: "",
    question: "",
    options: ["", "", "", "", ""],
    answer: 0,
    explanation: "",
  });

  let exam = $state("school");
  let single = $state(blank());
  let busy = $state(false);

  let uploading = $state(false);
  let uploadError = $state("");
  let upload = $state(null);

  let outcome = $state(null);
  let message = $state("");

  async function sendSingle(e) {
    e.preventDefault();
    outcome = null;
    message = "";

    const options = single.options.map((o) => o.trim());
    const item = {
      title: single.title,
      question: single.question,
      options: options.filter(Boolean),
      correctAnswer: options[single.answer],
      explanation: single.explanation,
    };
    const r = normalizeQuestion(item);
    if (!r.ok) {
      message = r.errors.join(" ");
      return;
    }

    busy = true;
    try {
      outcome = await submitQuestions({ exam, items: [item] });
      if (outcome.accepted) single = blank();
    } catch (err) {
      message = err?.body?.message ?? "Something went wrong. Please try again.";
    } finally {
      busy = false;
    }
  }

  async function sendFiles(e) {
    e.preventDefault();
    const el = e.currentTarget;

    uploadError = "";
    upload = null;

    const fd = new FormData(el);
    const files = fd
      .getAll("files")
      .filter((f) => f instanceof File && f.size > 0);

    if (!files.length) {
      uploadError = "Choose at least one file.";
      return;
    }

    uploading = true;
    try {
      upload = await uploadFiles({
        exam: fd.get("exam") === "post-utme" ? "post-utme" : "school",
        course: String(fd.get("course") ?? ""),
        note: String(fd.get("note") ?? ""),
        files,
      });
      el.reset(); // only after the command succeeds
    } catch (err) {
      uploadError = err?.body?.message ?? err?.message ?? "Upload failed.";
    } finally {
      uploading = false;
    }
  }
</script>

<svelte:head><title>Contribute questions - ExaminU</title></svelte:head>

<datalist id="course-list">
  {#each courses.current ?? [] as c (c)}<option value={c}></option>{/each}
</datalist>

<main>
  <div class="page">
    <div class="intro">
      <h1>Contribute questions</h1>
      <p class="lede">
        Submitted questions are reviewed before they appear in quizzes.
      </p>
    </div>

    <div class="exam">
      <label for="exam">Exam type</label>
      <select id="exam" class="control" bind:value={exam}>
        <option value="school">School</option>
        <option value="post-utme">Post-UTME</option>
      </select>
    </div>

    <section class="card">
      <h2>Add one question</h2>
      <form onsubmit={sendSingle}>
        <label for="code">Course code</label>
        <input
          id="code"
          name="code"
          class="control"
          list="course-list"
          autocomplete="off"
          placeholder="ECO111"
          bind:value={single.title}
          required
        />

        <label for="question">Question</label>
        <textarea
          id="question"
          class="control"
          rows="3"
          bind:value={single.question}
          required
        ></textarea>

        <fieldset>
          <legend>Options</legend>
          <p class="hint">
            Select the circle next to the correct option. Options C to E are
            optional.
          </p>
          {#each single.options as _, i}
            <div class="opt">
              <input
                type="radio"
                name="answer"
                value={i}
                bind:group={single.answer}
                aria-label={`Option ${"ABCDE"[i]} is correct`}
              />
              <input
                class="control"
                bind:value={single.options[i]}
                autocomplete="off"
                placeholder={`Option ${"ABCDE"[i]}${i > 1 ? " (optional)" : ""}`}
                required={i < 2}
              />
            </div>
          {/each}
        </fieldset>

        <label for="explanation">Explanation (optional)</label>
        <textarea
          id="explanation"
          class="control"
          rows="2"
          bind:value={single.explanation}
        ></textarea>

        <button class="answerButton" disabled={busy}
          >{busy ? "Submitting…" : "Submit question"}</button
        >
      </form>
    </section>

    <section class="card">
      <h2>Upload files</h2>
      <p class="hint">
        CSV, JSON, PDF or photos of past question papers. Files are saved
        exactly as you send them, and a reviewer turns them into quiz questions.
        Up to five files, 8 MB each.
      </p>

      <form onsubmit={sendFiles} enctype="multipart/form-data">
        <input type="hidden" name="exam" value={exam} />

        <label for="course">Course code (optional)</label>
        <input
          id="course"
          name="course"
          class="control"
          list="course-list"
          autocomplete="off"
          placeholder="ECO111"
        />

        <label for="note">Note for the reviewer (optional)</label>
        <textarea
          id="note"
          name="note"
          class="control"
          rows="2"
          maxlength="500"
          placeholder="For example: 2022/2023 first semester, answers are at the end"
        ></textarea>

        <label for="files" class="sr-only">Choose files</label>
        <input
          id="files"
          name="files"
          type="file"
          multiple
          required
          accept={rules.current?.accept}
        />

        <button class="answerButton" disabled={uploading}>
          {uploading ? "Uploading…" : "Upload files"}
        </button>
      </form>

      {#if uploadError}
        <p class="err" role="alert">{uploadError}</p>
      {/if}
    </section>

    {#if upload}
      <div class="status" role="status">
        <p class="ok">
          {upload.uploaded} file{upload.uploaded === 1 ? "" : "s"} submitted for
          review.
          {#if upload.duplicates}{upload.duplicates} had already been uploaded.{/if}
        </p>
        {#if upload.rejected?.length}
          <ul class="problems">
            {#each upload.rejected as r}<li>{r.name}: {r.reason}</li>{/each}
          </ul>
        {/if}
      </div>
    {/if}

    {#if message}<p class="err status" role="alert">{message}</p>{/if}
    {#if outcome}
      <p class="ok status" role="status">
        {outcome.accepted} submitted for review.
        {#if outcome.duplicates}{outcome.duplicates} already existed.{/if}
        {#if outcome.rejected}{outcome.rejected} were rejected.{/if}
      </p>
    {/if}
  </div>
</main>

<style>
  .review {
    display: grid;
    gap: 0.4rem;
    min-inline-size: 0;
    margin: 0;
    padding: 1rem;
    background: var(--field);
    border: 1px solid var(--line);
    border-radius: 12px;
  }

  .review.bad {
    border-color: rgba(255, 99, 99, 0.55);
  }

  .review legend {
    padding: 0 0.4rem;
    font-weight: 700;
  }

  .choices {
    display: grid;
    gap: 0.5rem;
    margin-top: 0.4rem;
  }

  .review .opt {
    background: var(--card);
  }

  .linkbtn {
    justify-self: start;
    margin-top: 0.4rem;
    padding: 0.3rem 0;
    background: none;
    border: 0;
    color: var(--muted);
    font: inherit;
    font-size: 0.875rem;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }

  .linkbtn:hover {
    color: #fff;
  }

  .sample {
    margin: 0.5rem 0;
    padding: 0.75rem;
    overflow-x: auto;
    background: var(--card);
    border-radius: 8px;
    font-family: ui-monospace, monospace;
    font-size: 0.8rem;
    white-space: pre;
  }

  .page {
    --card: #20153a;
    --field: #110b1f;
    --line: #3c2572;
    --muted: #b4a9d6;
    --brand: #7a5cfa;
    --danger: #ffb4b4;
    --ok: #8fe3bf;

    width: min(100%, 44rem);
    display: grid;
    gap: 1.5rem;
    color-scheme: dark;
  }

  .intro h1 {
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .lede,
  .hint {
    color: var(--muted);
  }

  .hint {
    font-size: 0.9rem;
  }

  .exam {
    display: grid;
    gap: 0.4rem;
    max-width: 14rem;
  }

  .card {
    display: grid;
    gap: 0.75rem;
    padding: 1.5rem;
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 16px;
  }

  h2 {
    font-size: 1.15rem;
    font-weight: 700;
  }

  form {
    display: grid;
    gap: 0.4rem;
  }

  label,
  legend {
    font-size: 0.875rem;
    font-weight: 600;
  }

  label {
    margin-top: 0.4rem;
  }

  .exam label {
    margin-top: 0;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
  }

  .control {
    width: 100%;
    padding: 0.75rem 1rem;
    background: var(--field);
    color: #fff;
    font: inherit;
    border: 1px solid var(--line);
    border-radius: 12px;
    transition:
      border-color 0.15s,
      box-shadow 0.15s;
  }

  textarea.control {
    resize: vertical;
  }

  .control::placeholder {
    color: #8479a8;
  }

  .control:focus-visible {
    outline: 2px solid transparent;
    border-color: var(--brand);
    box-shadow: 0 0 0 3px rgba(122, 92, 250, 0.45);
  }

  fieldset {
    display: grid;
    gap: 0.5rem;
    min-inline-size: 0;
    margin-top: 0.4rem;
    padding: 0;
    border: 0;
  }

  legend {
    padding: 0;
  }

  .opt {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.2rem 0.5rem 0.2rem 0.9rem;
    background: var(--field);
    border: 1px solid var(--line);
    border-radius: 12px;
    transition:
      border-color 0.15s,
      box-shadow 0.15s;
  }

  .opt:has(input[type="radio"]:checked) {
    border-color: var(--brand);
    background: #1a1236;
  }

  .opt:focus-within {
    border-color: var(--brand);
    box-shadow: 0 0 0 3px rgba(122, 92, 250, 0.45);
  }

  input[type="radio"] {
    flex: none;
    width: 1.25rem;
    height: 1.25rem;
    accent-color: var(--brand);
  }

  .opt .control {
    padding: 0.6rem 0.25rem;
    background: transparent;
    border: 0;
    border-radius: 0;
    box-shadow: none;
  }

  input[type="file"] {
    width: 100%;
    color: var(--muted);
    font: inherit;
  }

  input[type="file"]::file-selector-button {
    margin-right: 1rem;
    padding: 0.55rem 1rem;
    background: var(--field);
    color: #fff;
    font: inherit;
    font-weight: 600;
    border: 1px solid var(--line);
    border-radius: 12px;
    cursor: pointer;
  }

  input[type="file"]::file-selector-button:hover {
    border-color: var(--brand);
  }

  code {
    padding: 0.1em 0.35em;
    background: var(--field);
    border-radius: 6px;
    font-family: ui-monospace, monospace;
    font-size: 0.85em;
  }

  details {
    padding: 0.75rem 1rem;
    background: var(--field);
    border: 1px solid var(--line);
    border-radius: 12px;
  }

  summary {
    cursor: pointer;
    font-weight: 600;
  }

  .problems {
    display: grid;
    gap: 0.3rem;
    margin-top: 0.6rem;
    font-size: 0.9rem;
    color: var(--danger);
  }

  .answerButton {
    justify-self: start;
    margin-top: 0.75rem;
  }

  .answerButton:disabled {
    opacity: 0.65;
    cursor: progress;
    transform: none;
  }

  .err,
  .ok {
    padding: 0.7rem 0.9rem;
    border-radius: 12px;
    font-size: 0.9rem;
  }

  .err {
    background: #3a1824;
    border: 1px solid rgba(255, 99, 99, 0.5);
    color: var(--danger);
  }

  .ok {
    background: #10301f;
    border: 1px solid rgba(143, 227, 191, 0.5);
    color: var(--ok);
  }

  .status {
    position: sticky;
    bottom: 1rem;
    z-index: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .control,
    .opt {
      transition: none;
    }
  }
</style>
