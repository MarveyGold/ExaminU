<script>
  import { Tween } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  let { target = 1000, duration = 2000 } = $props();
  const count = new Tween(0, { duration, easing: cubicOut });

  function inView(node) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        count.target = target;
        observer.disconnect();
      }
    });
    observer.observe(node);
    return { destroy: () => observer.disconnect() };
  }
</script>

<span use:inView>{Math.round(count.current).toLocaleString()}</span>
