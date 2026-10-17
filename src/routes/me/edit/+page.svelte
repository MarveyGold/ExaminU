<script>
  import Avatar from "#lib/Components/Avatar.svelte";
  import ProfileShell from "#lib/Components/ProfileShell.svelte";
  import { getProfile, updateProfile } from "#lib/functions/profile.remote.js";
  import { LEVELS, displayName } from "#lib/profile.js";

  const f = updateProfile.fields;
</script>

<svelte:head><title>Edit profile - ExaminU</title></svelte:head>

<ProfileShell title="Edit profile" backHref="/me">
  {@const p = await getProfile()}
  {@const name = f.name.value() ?? p.name}
  {@const username = f.username.value() ?? p.username}
  {@const level = f.level.value() ?? p.level}

  <section class="hero">
    <Avatar {name} email={p.email} size={88} />
    <h2>{displayName(name, p.email)}</h2>
    <p class="handle">{username ? `@${username}` : p.email}</p>
  </section>

  <hr class="divider" />

  <form {...updateProfile} class="stack">
    <div class="field">
      <label for="name">Full name</label>
      <input
        {...f.name.as("text", p.name)}
        id="name"
        autocomplete="name"
        maxlength="60"
      />
    </div>
    {#each f.name.issues() ?? [] as issue}<p class="notice error" role="alert">
        {issue.message}
      </p>{/each}

    <div class="field">
      <label for="username">Username</label>
      <div class="at">
        <span aria-hidden="true">@</span>
        <input
          {...f.username.as("text", p.username)}
          id="username"
          autocomplete="username"
          autocapitalize="none"
          spellcheck="false"
          maxlength="20"
          aria-describedby="username-help"
        />
      </div>
    </div>
    {#each f.username.issues() ?? [] as issue}<p
        class="notice error"
        role="alert"
      >
        {issue.message}
      </p>{/each}
    <p id="username-help" class="help">
      3 to 20 letters, numbers or underscores. Leave empty to hide it.
    </p>

    <div class="field">
      <label for="level">Level</label>
      <select {...f.level.as("select", p.level)} id="level">
        {#each LEVELS as l}
          <option value={l} selected={l === (f.level.value() ?? p.level)}
            >{l} level</option
          >
        {/each}
      </select>
    </div>
    {#each f.level.issues() ?? [] as issue}<p class="notice error" role="alert">
        {issue.message}
      </p>{/each}

    <div class="field readonly">
      <label for="email">Email</label>
      <input
        id="email"
        value={p.email}
        readonly
        aria-describedby="email-help"
      />
    </div>
    <p id="email-help" class="help">Your email can't be changed yet.</p>

    {#if updateProfile.result?.success}<p class="notice ok" role="status">
        Profile saved.
      </p>{/if}

    <button class="answerButton block" disabled={updateProfile.pending > 0}>
      {updateProfile.pending > 0 ? "Saving…" : "Save"}
    </button>
  </form>
</ProfileShell>

<style>
  .hero {
    display: grid;
    justify-items: center;
    gap: 0.35rem;
    text-align: center;
  }

  .hero h2 {
    margin-top: 0.5rem;
    font-size: 1.15rem;
    font-weight: 700;
    overflow-wrap: anywhere;
  }

  .handle {
    color: #b4a9d6;
    font-size: 0.9rem;
    overflow-wrap: anywhere;
  }

  .at {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .at span {
    color: #b4a9d6;
  }
</style>
