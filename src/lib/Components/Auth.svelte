<script>
  let {class: className = "", ...props} = $props()
</script>

 <div class={`auth-buttons ${className}`} {...props}>
      <button class="login">Login</button>
      <button class="signup">Sign up</button>
    </div>
