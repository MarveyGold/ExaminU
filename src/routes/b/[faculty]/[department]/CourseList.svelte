<script>
  import { goto } from "$app/navigation";
  import { Level } from "$lib/stores";

  let { departmentName, level, courses, faculty, department } = $props();
  let selected = $state(null);

  $effect(() => {
    Level.set(level);
  });
</script>

<main class="page-body">
  <div class="header-block">
    <h1 class="page-title">{departmentName}</h1>
    
    <!-- Level Switcher Tabs -->
    <nav class="level-tabs">
      <a
        href={`/b/${faculty}/${department}/?level=100`}
        class="tab-link"
        class:active={level == "100"}
      >
        100 Level
      </a>

      <a
        href={`/b/${faculty}/${department}/?level=200`}
        class="tab-link"
        class:active={level == "200"}
      >
        200 Level
      </a>
    </nav>
  </div>

  <!-- Course List using intercepted anchor tags -->
  <div class="course-list">
    {#if level == "100"}
      {#each courses["100level"] || [] as course}
        {#if !course.hidden}
          <a
            href={`/b/courses/${course.code}`}
            class="course-card"
            class:selected={selected === course.code}
            onclick={(e) => {
              e.preventDefault();
              selected = course.code;
            }}
          >
            <span class="course-info">{course.name}</span>
            <span class="course-code">{course.code.toUpperCase()}</span>
          </a>
        {/if}
      {/each}
    {:else if level == "200"}
      {#each courses["200level"] || [] as course}
        <a
          href={`/b/courses/${course.code}`}
          class="course-card"
          class:selected={selected === course.code}
          onclick={(e) => {
            e.preventDefault();
            selected = course.code;
          }}
        >
          <span class="course-info">{course.name}</span>
          <span class="course-code">{course.code.toUpperCase()}</span>
        </a>
      {/each}
    {/if}
  </div>

  <!-- Action Links Footer -->
  <footer class="bottom-footer">
    <div class="footer-actions">
      <a href={`/b/${faculty}/`} class="footer-link secondary">
        Change Department
      </a>

      {#if selected}
        <a href={`/b/courses/${selected}`} class="footer-link primary">
          Start Quiz
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
    max-width: 600px;
    margin: 0 auto;
    padding: 20px 16px 120px;
    box-sizing: border-box;
  }

  .header-block {
    width: 100%;
    text-align: center;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .page-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
  }

  /* Segmented Level Navigation */
  .level-tabs {
    display: flex;
    background-color: #161026;
    padding: 4px;
    border-radius: 12px;
    border: 1px solid #2d2242;
    width: 100%;
    max-width: 320px;
  }

  .tab-link {
    flex: 1;
    text-decoration: none;
    text-align: center;
    color: #9ca3af;
    padding: 10px 16px;
    font-size: 0.9rem;
    font-weight: 600;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .tab-link.active {
    background-color: #7a5cfa;
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(122, 92, 250, 0.3);
  }

  /* Course Cards */
  .course-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  .course-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 16px 20px;
    background-color: #20153a;
    border: 1.5px solid transparent;
    border-radius: 14px;
    color: #ffffff;
    text-decoration: none;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    box-sizing: border-box;
  }

  .course-card:hover {
    border-color: #7a5cfa;
  }

  .course-card.selected {
    background-color: #3c2572;
    border-color: #7a5cfa;
  }

  .course-info {
    font-weight: 500;
  }

  .course-code {
    font-weight: 700;
    color: #a78bfa;
    font-size: 0.85rem;
    background-color: rgba(167, 139, 250, 0.1);
    padding: 4px 8px;
    border-radius: 6px;
  }

  /* Fixed Bottom Bar */
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
