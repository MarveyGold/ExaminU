
<script>
  const slides = ["School Exam", "Post Utme"];
  const links = ["b", "asp"];
  let index = 0;

  let startX = 0;

  function handleTouchStart(e) {
    startX = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50 && index < slides.length - 1) index++; 
    if (diff < -50 && index > 0) index--;               
  }
</script>

<div class="container">
  <h1>Select Exam</h1>
  <span>
 <button class="navButton left" on:click={() => index > 0 && index--}>&#8592;</button>
<div
    class="card"
    on:touchstart={handleTouchStart}
    on:touchend={handleTouchEnd}
  >  <span class="slideContent"><h3>{slides[index]}</h3></span>
</div>
<button class="navButton right" on:click={() => index < slides.length - 1 && index++}>&#8594;</button>

  </span>
     
    <p class="counter">{index + 1} of {slides.length}</p>

  <footer>
    <a href={links[index]}><button class="footerButton">Get Started</button></a>
  </footer>
</div>
<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    position: absolute;
    color: #fff;
    font-family: sans-serif;
    background: linear-gradient(black, rgb(46, 1, 86), black);
  }

  .card {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(37, 3, 70);
    box-shadow: 0 4px 12px rgba(0,0,0,0.6);
    overflow: hidden;
    z-index: 6;
    touch-action: none;
    user-select: none;
  }

  .slideContent {
    font-size: 3rem;
    font-weight: bold;
  }

  .navButton {
    transform: translateY(-50%);
    background: none;
    border: none;
    border-radius: 50%;
    padding: 8px 12px;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .navButton:active {
    transform: translateY(-50%) scale(0.98);
  }

  .navButton:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.06);
  }

  .left { left: 1vw; }
  .right { right: 1vw; }

  .footerButton {
    background: rgb(46, 1, 86);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 16px;
    cursor: pointer;
    font-size: 1rem;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

