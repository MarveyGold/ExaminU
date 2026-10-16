<script>
  import { enhance } from "$app/forms";
  import { page } from "$app/state";
  import AuthCard from "#lib/Components/AuthCard.svelte";
  import PasswordField from "#lib/Components/PasswordField.svelte";

  let { form } = $props();
  let submitting = $state(false);

  const next = $derived(page.url.searchParams.get("redirect"));
  const signupHref = $derived(
    next ? `/signup?redirect=${encodeURIComponent(next)}` : "/signup",
  );
</script>

<svelte:head><title>Log in - ExaminU</title></svelte:head>

<AuthCard
  title="Log in"
  lede="Pick up your practice where you left off."
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

    <PasswordField autocomplete="current-password" />

    <button type="submit" class="submit" disabled={submitting}>
      {submitting ? "Logging in…" : "Log in"}
    </button>
  </form>

  {#snippet footer()}
    New to ExaminU? <a href={signupHref}>Create an account</a>
  {/snippet}
</AuthCard>
