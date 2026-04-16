<script>
  export let data;
</script>

<main>
  <h1>Sign Up</h1>

  <form method="POST">
    <input name="email" type="email" placeholder="Email" required />
    <input name="password" type="password" placeholder="Password" required />
    <button type="submit" class="footerButton">Sign Up</button>
  </form>

  {#if data?.error}
    <p class="error">{data.error}</p>
  {/if}

  <p>
    Already have an account? <a href="/login">Login</a>
  </p>
</main>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 250px;
  }
  input {
    padding: 12px;
    border-radius: 1.7rem;
    background-color: #20153a;
    color: white;
    margin-top: 5px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    gap: 2px;
  }
  button {
    padding: 10px;
    cursor: pointer;
  }
  .error {
    color: red;
  }
</style>
