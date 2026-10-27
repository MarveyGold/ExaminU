<script>
  import { enhance } from "$app/forms";
  import {
    Page,
    Navbar,
    NavbarBackLink,
    Button,
    Searchbar,
    List,
    ListItem,
  } from "konsta/svelte";
  import { chooseDepartment } from "#lib/functions/department.remote.js";
  let { data } = $props();
  const faculty = $derived(data.faculty);
  let selected = $state(null);
  let saving = $state(false);
  let departments = $derived(
    data.departmentNames.map((name, i) => ({
      name,
      code: data.departmentList[i],
    })),
  );
</script>

<svelte:head>
  <title>{data.facultyName} | ExaminU</title>
  <meta
    name="description"
    content={`Browse departments under ${data.facultyName} on ExaminU and find past questions to help you prepare for your exams.`}
  />
</svelte:head>
<main class="page-body">
  <Navbar
    title={data.facultyName}
    subtitle="Select Department"
    titleClass="!font-bold !text-white"
    colors={{
      bgIos: "!bg-[#0c0914]",
      bgMaterial: "!bg-[#0c0914]",
      textIos: "!text-white",
      textMaterial: "!text-white",
    }}
    centerTitle
  ></Navbar>

  <div class="department-list">
    {#each departments as department}
      <a
        href="#select"
        class="department-card"
        class:selected={selected === department.code}
        onclick={(e) => {
          e.preventDefault();
          selected = department.code;
        }}
      >
        <span>{department.name}</span>
      </a>
    {/each}
  </div>

  <footer class="bottom-footer">
    <div class="footer-actions">
      <a href="/b?change" class="footer-action secondary">Change Faculty</a>

      {#if selected}
        <form {...chooseDepartment} class="choose">
          <input {...chooseDepartment.fields.faculty.as("hidden", faculty)} />
          <input
            {...chooseDepartment.fields.department.as("hidden", selected)}
          />
          <button
            class="footer-action primary"
            disabled={chooseDepartment.pending > 0}
          >
            {chooseDepartment.pending > 0 ? "Saving…" : "Continue"}
          </button>
        </form>
      {/if}
    </div>
  </footer>
</main>

<style>
  h1 {
    font-size: 1.2rem;
  }
  h2 {
    font-size: 1rem;
  }
  .choose {
    flex: 1;
    display: flex;
  }

  button.footer-action {
    width: 100%;
    border: 0;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
  }

  button.footer-action:disabled {
    opacity: 0.65;
    cursor: progress;
  }
  .page-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    padding: 80px 16px 120px;
    box-sizing: border-box;
  }

  .header-block {
    text-align: center;
    margin-bottom: 24px;
  }

  .page-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 6px;
  }

  .subtitle {
    color: #9ca3af;
    font-size: 0.95rem;
  }

  .department-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  .department-card {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    margin: auto;
    padding: 16px 20px;
    background-color: #20153a;
    border: 1.5px solid transparent;
    border-radius: 14px;
    color: #ffffff;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    box-sizing: border-box;
    transition: all 0.2s ease;
  }

  .department-card:hover {
    border-color: #7a5cfa;
  }

  .department-card.selected {
    background-color: #3c2572;
    border-color: #7a5cfa;
  }

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

  .footer-action {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    transition: all 0.2s ease;
    box-sizing: border-box;
  }

  .footer-action.primary {
    background-color: #7a5cfa;
    color: #ffffff;
  }

  .footer-action.secondary {
    background-color: #161026;
    color: #9ca3af;
    border: 1px solid #2d2242;
  }

  .footer-action.secondary:hover {
    color: #ffffff;
    border-color: #4c3b80;
  }
</style>
