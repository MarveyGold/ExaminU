<script>
  import Auth from "./AuthIndex.svelte";
  let style = $state();
  let btnText = $state("y≡");

  function changeStyle() {
    style = style === "" ? "active" : "";
  }
  $effect(() => {
    if (style == "active") {
      btnText = "X";
    } else {
      btnText = "≡";
    }
  });
</script>

<nav>
  <button onclick={changeStyle} class="nav-btn">{btnText}</button>
  <ul id="list" class={style}>
    <li class="mobile"><Auth class="mobile" /></li>
    <li><a href="/">Home</a></li>
    <li><a href="#practice">Curriculum</a></li>
    <li><a href="#contact">Feedback</a></li>
  </ul>
</nav>
