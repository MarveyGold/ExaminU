<script>
  let current = $state("");

  const exams = [
    { name: "Post UTME", code: "asp", description: "Practice past questions for entry screening" },
    { name: "Uniben Exam", code: "b", description: "Course-specific UNIBEN past questions" },
  ];
</script>

<main class="main">
  <header class="page-header">
    <h1>Select Exam</h1>
    <p class="subtitle">Choose a category to start practicing</p>
  </header>

  <div class="exam-grid">
    {#each exams as exam}
      <a
href={`/${exam.code}`}
        class="exam-card"
        class:selected={current === exam.code}
        onclick={() => (current = exam.code)}
      >
        <div class="card-content">
          <span class="exam-title">{exam.name}</span>
          <span class="exam-desc">{exam.description}</span>
        </div>
        <div class="radio-indicator"></div>
      </a>
    {/each}
  </div>

  {#if current}
    <footer class="action-footer">
      <a href={`/${current}`} class="start-btn"> Get Started </a>
    </footer>
  {/if}
</main>

<style>
  :global(body) {
    background-color: #0d0a1a;
    color: #ffffff;
    font-family: system-ui, -apple-system, sans-serif;
    margin: 0;
  }

  .main {
    max-width: 500px;
    margin: 0 auto;
    padding: 24px 16px 100px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    box-sizing: border-box;
  }

  .page-header {
    text-align: center;
    margin-top: 32px;
    margin-bottom: 32px;
  }

  h1 {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 8px;
  }

  .subtitle {
    color: #9ca3af;
    font-size: 0.9rem;
    margin: 0;
  }

  .exam-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }

  .exam-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #18132a;
    border: 2px solid #282042;
    border-radius: 12px;
    padding: 20px;
    text-align: left;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .exam-card:hover {
    border-color: #4c3b80;
  }

  .exam-card.selected {
    border-color: #7c3aed;
    background: #21193d;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .exam-title {
    font-size: 1.1rem;
    font-weight: 600;
  }

  .exam-desc {
    font-size: 0.825rem;
    color: #9ca3af;
  }

  .radio-indicator {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #4c3b80;
    box-sizing: border-box;
  }

  .exam-card.selected .radio-indicator {
    border-color: #7c3aed;
    background-color: #7c3aed;
    box-shadow: inset 0 0 0 3px #21193d;
  }

  .action-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    background: #0d0a1a;
    border-top: 1px solid #282042;
    display: flex;
    justify-content: center;
  }

  .start-btn {
    width: 100%;
    max-width: 500px;
    background: #7c3aed;
    color: #ffffff;
    text-decoration: none;
    text-align: center;
    padding: 14px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
  }
</style>
