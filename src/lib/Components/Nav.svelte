<script>
  import Auth from "./AuthIndex.svelte";
  let style = $state("");
  let btnText = $state("≡");

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
 <li><a href="/">Home</a></li>
    <li><a href="#practice">Curriculum</a></li>
    <li><a href="#contact">Feedback</a></li>
    <li class="mobile"><Auth class="mobile" /></li>
   
  </ul>
</nav>

<style>
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex: 1;
  }
.mobile :global(#list) {
  position: static;
  top: auto;
  right: auto;
  box-shadow: none;
  padding: 0;
  background: transparent;
  display: flex !important;
}
  .nav-btn {
    display: none;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    width: 40px;
    height: 40px;
    font-size: 24px;
    background: linear-gradient(135deg, #7a5cfa, #5a3eda);
    color: #fff;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 1001;
    position: relative;
  }

  .nav-btn:hover {
    transform: scale(1.1);
  }

  .nav-btn:active {
    transform: scale(0.95);
  }

  ul {
    display: flex;
    gap: 30px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  ul li a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  ul li a:hover {
    color: #7a5cfa;
  }

  @media (max-width: 768px) {
    .nav-btn {
      display: flex;
    }

    ul {
      display: none;
      flex-direction: column;
      gap: 15px;
      position: absolute;
      right: 0;
      top: 50px;
      width: 55vw;
      background-color: #fff;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      list-style: none;
    }

    ul.active {
      display: flex;
    }

    ul li a {
      color: #333;
      font-size: 16px;
    }

    .mobile {
      display: flex !important;
    }
  }

  @media (max-width: 480px) {
    .nav-btn {
      width: 40px;
      height: 40px;
      font-size: 22px;
    }

    ul {
      width: 70vw;
    }
  }
</style>
