<script>
  import Nav from "$lib/Components/Nav.svelte";
  import Auth from "$lib/Components/AuthIndex.svelte";
  import Contact from "$lib/Components/Contact.svelte";
  export let data;
</script>

<div class="index">
  <header class="indexHeader">
    <a href="/">
      <img class="uniben" src="/favicon.png" alt="examinu" />
      <div class="logo">ExaminU</div>
    </a>
    <Nav />
    <Auth class="desktop" {data} />
  </header>
  <section class="hero">
    <div class="background">
      <div class="hero-text">
        <h1>Get Started with your mock Exam Practice</h1>
        <p>Ace your next exam with smarter practices not more hours</p>
        <a href="/app"><button>Get Started</button></a>
      </div>
      <div class="hero-image">
        <img
          alt="book"
          class="book float"
          src="3d-illustration-reading-with-book-esssential_23-2151295086.png"
        />
        <img
          class="man float"
          src="man-removebg-preview.png"
          alt="3D students illustration"
        />
      </div>
    </div>
    <div class="others">
      <div class="practice" id="practice">
        <img class="imgdesc" src="857524.png" alt="Browse Courses" />
        <div class="title1">
          <h3>Browse Courses</h3>
          <div class="bod">
            Find and browse over 20 available courses with ease
          </div>
        </div>
      </div>
      <div class="practice">
        <img class="imgdesc" src="4690558-200.png" alt="Practice Questions" />
        <div class="title2">
          <h3>Practice PQ</h3>
          <div class="bod">
            Answer previous sessions' questions on one click
          </div>
        </div>
      </div>
    </div>
    <Contact />
  </section>
</div>

<style>
  :global(body) {
    background: #fff;
  }

  .index {
    color: #3c2572;
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #fff;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  :global(.index header) {
    position: static !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    gap: 40px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    flex-wrap: wrap;
    animation: none !important;
    z-index: 100;
    margin-top: 70px;
  }

  :global(.index header a) {
    display: flex;
    align-items: center;
    gap: 15px;
    font-weight: bold;
  }

  :global(.index .uniben) {
    width: 50px;
    height: auto;
    border-radius: 8px;
  }

  :global(.index .logo) {
    font-size: 28px;
    background: linear-gradient(to right, blue, purple);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-family: Georgia, 'Times New Roman', Times, serif;
    position: static !important;
    top: auto !important;
    left: auto !important;
  }

  :global(.index nav) {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(.index nav ul) {
    display: flex;
    gap: 40px;
    list-style: none;
  }

  :global(.index nav ul li a) {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  :global(.index nav ul li a:hover) {
    color: #7a5cfa;
  }

  .hero {
    display: flex;
    flex-direction: column;
    gap: 80px;
    padding: 60px 20px;
    align-items: center;
    animation: fadeIn 1.5s ease-in-out;
    background: linear-gradient(to bottom, #fff, #f9f5ff);
  }

  .background {
    background-image: linear-gradient(135deg, rgb(252, 235, 248), rgb(238, 188, 225));
    width: 100%;
    max-width: 1000px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    border-radius: 24px;
    padding: 50px 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 50px;
    position: static !important;
    top: auto !important;
  }

  .hero-text {
    flex: 1;
    min-width: 300px;
  }

  .hero-text h1 {
    font-size: 2.8rem;
    margin-bottom: 20px;
    color: #333;
    line-height: 1.2;
    font-weight: 800;
  }

  .hero-text p {
    font-size: 18px;
    color: #666;
    margin-bottom: 30px;
    line-height: 1.6;
  }

  .hero-text button {
    background-color: #7a5cfa;
    color: white;
    padding: 14px 40px;
    border: none;
    border-radius: 28px;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(122, 92, 250, 0.3);
  }

  .hero-text button:hover {
    background-color: #5a3eda;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(122, 92, 250, 0.4);
  }

  .hero-image {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  .book {
    width: 140px;
    height: auto;
    animation: zoomIn 1.5s ease;
  }

  .man {
    width: 180px;
    height: auto;
    animation: zoomIn 1.5s ease;
  }

  .others {
    width: 100%;
    max-width: 1000px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 40px;
    padding: 0 20px;
    margin: 40px 0;
    position: static !important;
    right: auto !important;
    top: auto !important;
  }

  .practice {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    border-radius: 20px;
    background: white;
    padding: 50px 30px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    text-align: center;
    width: auto !important;
    height: auto !important;
  }

  .practice:hover {
    transform: translateY(-12px);
    box-shadow: 0 12px 35px rgba(122, 92, 250, 0.15);
    border: 2px solid #7a5cfa;
  }

  .imgdesc {
    width: 80px;
    height: auto;
    margin: 0 !important;
  }

  .title1,
  .title2 {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    position: static !important;
    top: auto !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .title1 h3,
  .title2 h3 {
    font-size: 24px;
    color: #7a5cfa;
    font-weight: 800;
    margin: 0 !important;
    margin-left: 0 !important;
  }

  .bod {
    font-size: 16px;
    color: #666;
    line-height: 1.6;
    width: auto !important;
    margin-left: 0 !important;
    text-align: center;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes zoomIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @media (max-width: 1024px) {
    .background {
      flex-direction: column;
      padding: 40px;
    }

    .hero {
      gap: 60px;
      padding: 40px 20px;
    }

    :global(.index header) {
      gap: 20px;
    }

    :global(.index nav ul) {
      gap: 25px;
    }
  }

  @media (max-width: 768px) {
    :global(.index header) {
      flex-direction: column;
      padding: 15px;
      gap: 15px;
      margin-top: 70px;
    }

    :global(.index header a) {
      gap: 10px;
      justify-content: center;
    }

    :global(.index .uniben) {
      width: 40px;
    }

    :global(.index .logo) {
      font-size: 22px;
    }

    :global(.index nav) {
      width: 100%;
    }

    :global(.index nav ul) {
      display: none;
      flex-direction: column;
      gap: 10px;
      position: absolute;
      right: 10px;
      top: 140px;
      width: 50vw;
      background-color: #fff;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }

    :global(.index nav ul.active) {
      display: flex;
    }

    :global(.index nav ul li a) {
      color: #333;
    }

    .hero {
      gap: 40px;
      padding: 30px 15px;
    }

    .background {
      padding: 30px;
      border-radius: 16px;
    }

    .hero-text h1 {
      font-size: 2rem;
    }

    .hero-text p {
      font-size: 16px;
    }

    .hero-text button {
      padding: 12px 30px;
      font-size: 15px;
    }

    .book {
      width: 100px;
    }

    .man {
      width: 140px;
    }

    .others {
      grid-template-columns: 1fr;
      gap: 25px;
      margin: 30px 0;
    }

    .practice {
      padding: 35px 25px;
    }

    .imgdesc {
      width: 60px;
    }

    .title1 h3,
    .title2 h3 {
      font-size: 20px;
    }

    .bod {
      font-size: 15px;
    }
  }

  @media (max-width: 480px) {
    :global(.index header) {
      padding: 10px;
      gap: 10px;
    }

    :global(.index header a) {
      gap: 8px;
    }

    :global(.index .uniben) {
      width: 35px;
    }

    :global(.index .logo) {
      font-size: 18px;
    }

    :global(.index nav ul) {
      width: 60vw;
      right: 5px;
      top: 110px;
    }

    .hero {
      gap: 30px;
      padding: 20px 10px;
    }

    .background {
      padding: 20px;
      border-radius: 12px;
    }

    .hero-text h1 {
      font-size: 1.6rem;
    }

    .hero-text p {
      font-size: 14px;
    }

    .hero-text button {
      padding: 10px 24px;
      font-size: 14px;
    }

    .book {
      width: 80px;
    }

    .man {
      width: 110px;
    }

    .others {
      gap: 15px;
      margin: 20px 0;
    }

    .practice {
      padding: 25px 15px;
    }

    .imgdesc {
      width: 50px;
    }

    .title1 h3,
    .title2 h3 {
      font-size: 18px;
    }

    .bod {
      font-size: 13px;
    }
  }
</style>
