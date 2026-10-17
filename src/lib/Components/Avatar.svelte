<script>
  import { initials } from "#lib/profile.js";

  let { name = "", email = "", size = 88 } = $props();
  const text = $derived(initials(name, email));
</script>

<div class="avatar" style:--size={`${size}px`} aria-hidden="true">{text}</div>

<style>
  .avatar {
    display: grid;
    place-items: center;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: linear-gradient(135deg, #7a5cfa, #5a3eda);
    border: 3px solid #3c2572;
    color: #fff;
    font-weight: 700;
    font-size: calc(var(--size) * 0.38);
    letter-spacing: 0.02em;
    user-select: none;
  }
</style>
