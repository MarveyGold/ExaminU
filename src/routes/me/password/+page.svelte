<script>
  import ProfileShell from "#lib/Components/ProfileShell.svelte";
  import { changePassword } from "#lib/functions/profile.remote.js";

  const f = changePassword.fields;
</script>

<svelte:head><title>Change password - ExaminU</title></svelte:head>

<ProfileShell title="Change password" backHref="/me">
  <form {...changePassword} class="stack">
    <div class="field">
      <label for="current">Current password</label>
      <input
        {...f._current.as("password")}
        id="current"
        autocomplete="current-password"
      />
    </div>
    {#each f._current.issues() ?? [] as issue}<p
        class="notice error"
        role="alert"
      >
        {issue.message}
      </p>{/each}

    <div class="field">
      <label for="next">New password</label>
      <input
        {...f._next.as("password")}
        id="next"
        autocomplete="new-password"
        aria-describedby="pw-help"
      />
    </div>
    {#each f._next.issues() ?? [] as issue}<p class="notice error" role="alert">
        {issue.message}
      </p>{/each}
    <p id="pw-help" class="help">At least 8 characters.</p>

    <div class="field">
      <label for="confirm">Confirm new password</label>
      <input
        {...f._confirm.as("password")}
        id="confirm"
        autocomplete="new-password"
      />
    </div>
    {#each f._confirm.issues() ?? [] as issue}<p
        class="notice error"
        role="alert"
      >
        {issue.message}
      </p>{/each}

    {#if changePassword.result?.success}
      <p class="notice ok" role="status">
        Password updated. You've been signed out on your other devices.
      </p>
    {/if}

    <button class="answerButton block" disabled={changePassword.pending > 0}>
      {changePassword.pending > 0 ? "Updating…" : "Update password"}
    </button>
  </form>
</ProfileShell>/ProfileShell>
