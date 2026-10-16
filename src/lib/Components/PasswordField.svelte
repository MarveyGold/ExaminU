<script>
  let {
    id = "password",
    name = "password",
    label = "Password",
    autocomplete = "current-password",
    minlength,
    describedby,
  } = $props();

  let show = $state(false);
  let jsReady = $state(false);
  $effect(() => { jsReady = true; }); // the toggle only appears when it can work
</script>

<label for={id}>{label}</label>
<div class="field">
  <input
    {id}
    {name}
    type={show ? "text" : "password"}
    {autocomplete}
    {minlength}
    aria-describedby={describedby}
    required
  />
  {#if jsReady}
    <button type="button" class="toggle" aria-pressed={show} onclick={() => (show = !show)}>
      {show ? "Hide" : "Show"}
    </button>
  {/if}
</div>

<style>
  .field {
    position: relative;
  }

  .field input {
    padding-right: 4.5rem;
  }

  .toggle {
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
    padding: 0.4rem 0.6rem;
    background: none;
    border: 0;
    border-radius: 8px;
    color: #b4a9d6;
    font: inherit;
    font-size: 0.875rem;
    cursor: pointer;
  }

  .toggle:hover {
    color: #fff;
  }

  .toggle:focus-visible {
    outline: 2px solid #7a5cfa;
  }
</style>
