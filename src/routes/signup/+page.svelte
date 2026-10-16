<script>
  import { enhance } from "$app/forms";
  import { page } from "$app/state";
  import AuthCard from "#lib/Components/AuthCard.svelte";
  import PasswordField from "#lib/Components/PasswordField.svelte";

  let { form } = $props();
  let submitting = $state(false);

  const next = $derived(page.url.searchParams.get("redirect"));
  const loginHref = $derived(
    next ? `/login?redirect=${encodeURIComponent(next)}` : "/login",
  );
</script>

<svelte:head><title>Sign up - ExaminU</title></svelte:head>

<AuthCard
  title="Create your account"
  lede="Practise past questions for your courses."
  error={form?.error}
>
  <form
    method="POST"
    use:enhance={() => {
      submitting = true;
      return async ({ update }) => {
        await update();
        submitting = false;
      };
    }}
  >
    <label for="email">Email</label>
    <input
      id="email"
      name="email"
      type="email"
      autocomplete="email"
      inputmode="email"
      value={form?.email ?? ""}
      required
    />

    <PasswordField
      autocomplete="new-password"
      minlength={8}
      describedby="pw-hint"
    />
    <p id="pw-hint" class="hint">At least 8 characters.</p>

    <button type="submit" class="submit" disabled={submitting}>
      {submitting ? "Creating account…" : "Create account"}
    </button>
  </form>

  {#snippet footer()}
    Already have an account? <a href={loginHref}>Log in</a>
  {/snippet}
</AuthCard>
