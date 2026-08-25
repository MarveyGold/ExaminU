<script>
  let current = $state("");

  const exams = [
    { name: "Post UTME", code: "asp", description: "Practice past questions for entry screening" },
    { name: "Uniben Exam", code: "b", description: "Course-specific UNIBEN past questions" },
  ];
</script>

<main class="page-wrapper">
  <!-- Use div instead of header to avoid global header position:fixed rule -->
  <div class="top-nav">
    <div class="brand">
      <img src="/favicon.png" alt="logo" class="logo-img" />
      <span class="brand-name">ExaminU</span>
    </div>
    <button class="sign-in-btn">Sign in</button>
  </div>

  <section class="content-container">
    <div class="title-block">
      <h1 class="page-title">Select Exam</h1>
      <p class="subtitle">Choose a category to start practicing</p>
    </div>

    <div class="exam-list">
      {#each exams as exam}
        <a
          href={`/${exam.code}`}
          class="exam-card"
          class:selected={current === exam.code}
          onclick={(e) => {
            e.preventDefault();
            current = exam.code;
          }}
        >
          <div class="card-text">
            <span class="exam-title">{exam.name}</span>
            <span class="exam-desc">{exam.description}</span>
          </div>
          <div class="radio-circle"></div>
        </a>
      {/each}
    </div>
  </section>

  {#if current}
    <footer class="bottom-bar">
      <a href={`/${current}`} class="cta-button"> Get Started </a>
    </footer>
  {/if}
</main>

<style>
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .page-wrapper {
    min-height: 100vh;
    background-color: #0c0914;
    color: #ffffff;
    font-family: system-ui, -apple-system, sans-serif;
    display: flex;
    flex-direction: column;
    padding-bottom: 90px;
  }

  /* Scoped nav class avoiding global fixed header */
  .top-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    width: 100%;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo-img {
    width: 32px;
    height: 32px;
    border-radius: 6px;
  }

  .brand-name {
    font-size: 1.2rem;
    font-weight: 700;
    color: #a78bfa;
  }

  .sign-in-btn {
    background-color: #ffffff;
    color: #000000;
    border: none;
    padding: 8px 18px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
  }

  .content-container {
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    padding: 24px 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .title-block {
    text-align: center;
  }

  .page-title {
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 6px;
  }

  .subtitle {
    color: #9ca3af;
    font-size: 0.95rem;
  }

  .exam-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }

  .exam-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #161026;
    border: 1.5px solid #2d2242;
    border-radius: 14px;
    padding: 18px 20px;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s ease-in-out;
  }

  .exam-card.selected {
    border-color: #7c3aed;
    background-color: #1f1638;
  }

  .card-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .exam-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #ffffff;
  }

  .exam-desc {
    font-size: 0.85rem;
    color: #9ca3af;
  }

  .radio-circle {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid #4c3b80;
    flex-shrink: 0;
  }

  .exam-card.selected .radio-circle {
    border-color: #7c3aed;
    background-color: #7c3aed;
    box-shadow: inset 0 0 0 3.5px #1f1638;
  }

  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px 20px;
    background-color: #0c0914;
    border-top: 1px solid #2d2242;
    display: flex;
    justify-content: center;
  }

  .cta-button {
    width: 100%;
    max-width: 480px;
    background-color: #7c3aed;
    color: #ffffff;
    text-decoration: none;
    text-align: center;
    padding: 14px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 1rem;
  }
</style>
