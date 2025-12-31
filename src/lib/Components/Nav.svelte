<script>
  import Auth from "./Auth.svelte"
  let style = $state();
  let btnText = $state("≡");

    function changeStyle() {
     style = style === "" ? "active" : "";
     btnText = btnText === "≡" ? " X " : "≡";
    }
</script>
      <nav>
        <button on:click={changeStyle} class="nav-btn" >{btnText}</button>
        <ul id="list" class={style}>
          <Auth class="mobile" />
          <li><a href="/">Home</a></li>
          <li><a href="#practice">Curriculum</a></li>
          <li><a href="#contact">Feedback</a></li>

        </ul>
      </nav>

