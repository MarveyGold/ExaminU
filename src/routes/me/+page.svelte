<script>
  import Avatar from "#lib/Components/Avatar.svelte";
  import ProfileShell from "#lib/Components/ProfileShell.svelte";
  import { getProfile, logout } from "#lib/functions/profile.remote.js";
  import { displayName } from "#lib/profile.js";

  const since = (iso) =>
    iso
      ? new Date(iso).toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        })
      : "";
</script>

<svelte:head><title>Profile - ExaminU</title></svelte:head>

<ProfileShell title="Profile" backHref="/">
  {@const p = await getProfile()}

  <section class="hero">
    <Avatar name={p.name} email={p.email} size={96} />
    <h2>{displayName(p.name, p.email)}</h2>
    <p class="handle">{p.username ? `@${p.username}` : p.email}</p>
    <a class="answerButton" href="/me/edit">Edit profile</a>
  </section>

  <dl class="stats">
    <div>
      <dt>Level</dt>
      <dd>{p.level}</dd>
    </div>
    <div>
      <dt>Submitted</dt>
      <dd>{p.submitted}</dd>
    </div>
    <div>
      <dt>Approved</dt>
      <dd>{p.approved}</dd>
    </div>
  </dl>

  <nav class="menu" aria-label="Account">
    <ul>
      <li>
        <a class="row" href="/b?change">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path
              d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
            />
          </svg>
          <span>
            Department
            <small>
              {#if p.departmentName}
                {p.departmentName}{p.facultyName ? ` · ${p.facultyName}` : ""}
              {:else}
                Not chosen yet
              {/if}
            </small>
          </span>
          <svg
            class="chev"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg
          >
        </a>
      </li>
      <li>
        <a class="row" href="/contribute">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" />
          </svg>
          <span>Contribute questions</span>
          <svg
            class="chev"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg
          >
        </a>
      </li>
      <li>
        <a class="row" href="/me/password">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <rect x="5" y="11" width="14" height="9" rx="2" /><path
              d="M8 11V8a4 4 0 018 0v3"
            />
          </svg>
          <span>Change password</span>
          <svg
            class="chev"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg
          >
        </a>
      </li>
    </ul>

    <hr class="divider" />

    <form {...logout}>
      <button class="row" type="submit">
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><path
            d="M16 17l5-5-5-5M21 12H9"
          />
        </svg>
        <span>Log out</span>
      </button>
    </form>
  </nav>

  {#if p.joined}<p class="since">Member since {since(p.joined)}</p>{/if}
</ProfileShell>

<style>
  .hero {
    display: grid;
    justify-items: center;
    gap: 0.35rem;
    text-align: center;
  }

  .hero h2 {
    margin-top: 0.6rem;
    font-size: 1.25rem;
    font-weight: 700;
    overflow-wrap: anywhere;
  }

  .handle {
    color: #b4a9d6;
    font-size: 0.9rem;
    overflow-wrap: anywhere;
  }

  .hero .answerButton {
    margin-top: 0.9rem;
    min-width: 11rem;
    text-align: center;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem;
  }

  .stats div {
    padding: 0.8rem 0.5rem;
    background: #20153a;
    border: 1px solid #3c2572;
    border-radius: 14px;
    text-align: center;
  }

  dt {
    color: #b4a9d6;
    font-size: 0.75rem;
  }

  dd {
    margin-top: 0.15rem;
    font-size: 1.25rem;
    font-weight: 700;
  }

  .menu {
    background: #20153a;
    border: 1px solid #3c2572;
    border-radius: 16px;
    overflow: hidden;
  }

  .menu .divider {
    margin: 0;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    width: 100%;
    padding: 1rem 1.1rem;
    background: none;
    border: 0;
    color: #fff;
    font: inherit;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.15s;
  }

  .row span {
    flex: 1;
  }

  .row small {
    display: block;
    color: #b4a9d6;
    font-size: 0.8rem;
  }

  .row:hover {
    background: rgba(122, 92, 250, 0.14);
  }

  .row:focus-visible {
    outline: 3px solid rgba(184, 168, 255, 0.8);
    outline-offset: -3px;
  }

  .chev {
    color: #b4a9d6;
  }

  .since {
    text-align: center;
    color: #b4a9d6;
    font-size: 0.8rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .row {
      transition: none;
    }
  }
</style>
