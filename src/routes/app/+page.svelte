<script lang="ts">
  import {
    Page,
    Navbar,
    NavbarBackLink,
    Radio,
    Card,
    ListItem,
  } from "konsta/svelte";
  let current = $state("");

  const exams = [
    {
      name: "Post UTME",
      code: "asp",
      description: "Practice past questions for entry screening",
    },
    {
      name: "Uniben Exam",
      code: "b",
      description: "Course-specific UNIBEN past questions",
    },
  ];
</script>

<Page class="page-wrapper">
  <!-- Use div instead of header to avoid global header position:fixed rule -->
  <section class="content-container">
    <div class="title-block">
      <Navbar
        title="Select Exam"
        subtitle="Choose a category to start practicing "
        class="!bg-[transparent]"
        colors={{
          bgIos: "!bg-[#0c0914]",
          bgMaterial: "!bg-[#0c0914]",
          textIos: "!text-white",
          textMaterial: "!text-white",
        }}
        titleClass="!font-bold !text-white"
      />
    </div>

    <div class="exam-list">
      {#each exams as o (o.code)}
        <Card
          component="a"
          href={o.code}
          onclick={(e) => {
            e.preventDefault();
            current = o.code;
          }}
          class="!bg-[#1c1828] !rounded-2xl block no-underline"
          contentWrapClass="!p-0"
        >
          <div class="flex w-full items-center justify-between gap-6 p-4">
            <div class="min-w-0 flex-1">
              <h3 class="font-semibold text-white">{o.name}</h3>
              <p class="text-sm text-gray-400">{o.description}</p>
            </div>
            <Radio
              component="div"
              class="pointer-events-none shrink-0"
              value="post-utme"
              checked={current === o.code}
              onChange={(e) => {
                e.preventDefault();
                current = "post-utme";
              }}
            />
          </div>
        </Card>
      {/each}
    </div>
  </section>

  {#if current}
    <footer class="bottom-bar">
      <a href={`/${current}`} class=" footerButton cta-button"> Get Started </a>
    </footer>
  {/if}
</Page>

<style>
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(.k-page) {
    background-color: #0c0914;
    color: #ffffff;
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

  :global(.k-card) {
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

  :global(.k-radio) {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .exam-card.selected .radio-circle {
    border-color: #7c3aed;
    background-color: #7c3aed;
    box-shadow: inset 0 0 0 3.5px #1f1638;
  }

  .bottom-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    padding: 16px;
    background: linear-gradient(to bottom, rgba(12, 9, 20, 0.8), #0c0914);
    backdrop-filter: blur(8px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 99;
  }

  .cta-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 480px;
    color: #ffffff;
    text-decoration: none;
    text-align: center;
    padding: 14px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 1rem;
  }
</style>
