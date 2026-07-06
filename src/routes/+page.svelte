<script>
  import Nav from "$lib/Components/Nav.svelte";
  import Auth from "$lib/Components/AuthIndex.svelte";
  import Contact from "$lib/Components/Contact.svelte";
  export let data;
</script>

<div class="index">
  <header class="indexHeader">
    <a href="/" class="header-logo">
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
  .index {
    color: #3c2572;
    font-family: 'Open Sans', sans-serif;
    background: #fff;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  :global(.indexHeader) {
    position: static !important;
    top: auto !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
    gap: 20px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    flex-wrap: nowrap;
    animation: none !important;
    z-index: 100;
    margin-top: 0 !important;
    width: 100%;
    box-sizing: border-box;
  }

  .header-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    text-decoration: none;
  }

  :global(.indexHeader .uniben) {
    width: 45px;
    height: auto;
    border-radius: 8px;
    flex-shrink: 0;
  }

  :global(.indexHeader .logo) {
    font-size: 22px;
    background: linear-gradient(to right, blue, purple);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-family: Georgia, 'Times New Roman', Times, serif;
    position: static !important;
    top: auto !important;
    left: auto !important;
    font-weight: bold;
  }

  :global(.indexHeader nav) {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  :global(.indexHeader nav ul) {
    display: flex;
    gap: 30px;
    list-style: none;
  }

  :global(.indexHeader nav ul li a) {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  :global(.indexHeader nav ul li a:hover) {
    color: #7a5cfa;
  }

  :global(.indexHeader .auth-buttons) {
    display: flex;
    gap: 10px;
    z-index: 100;
  }

  .hero {
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding: 30px 15px;
    align-items: center;
    background: linear-gradient(to bottom, #fff, #f9f5ff);
    flex: 1;
  }

  .background {
    background-image: linear-gradient(135deg, rgb(252, 235, 248), rgb(238, 188, 225));
    width: 100%;
    max-width: 100%;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    position: static !important;
    top: auto !important;
  }

  .hero-text {
    width: 100%;
    text-align: center;
  }

  .hero-text h1 {
    font-size: 1.8rem;
    margin-bottom: 15px;
    color: #333;
    line-height: 1.3;
    font-weight: 800;
  }

  .hero-text p {
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
    line-height: 1.5;
  }

  .hero-text button {
    background-color: #7a5cfa;
    color: white;
    padding: 12px 35px;
    border: none;
    border-radius: 25px;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(122, 92, 250, 0.3);
  }

  .hero-text button:active {
    transform: scale(0.98);
  }

  .hero-text button:hover {
    background-color: #5a3eda;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(122, 92, 250, 0.4);
  }

  .hero-image {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  .book {
    width: 120px;
    height: auto;
    animation: zoomIn 1.5s ease;
  }

  .man {
    width: 150px;
    height: auto;
    animation: zoomIn 1.5s ease;
  }

  .others {
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    gap: 25px;
    padding: 0;
    margin: 20px 0;
    position: static !important;
    right: auto !important;
    top: auto !important;
  }

  .practice {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border-radius: 16px;
    background: white;
    padding: 30px 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    text-align: center;
    width: 100% !important;
    height: auto !important;
  }

  .practice:active {
    transform: scale(0.98);
  }

  .imgdesc {
    width: 70px;
    height: auto;
    margin: 0 !important;
    flex-shrink: 0;
  }

  .title1,
  .title2 {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    position: static !important;
    top: auto !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .title1 h3,
  .title2 h3 {
    font-size: 20px;
    color: #7a5cfa;
    font-weight: 800;
    margin: 0 !important;
    margin-left: 0 !important;
  }

  .bod {
    font-size: 14px;
    color: #666;
    line-height: 1.5;
    width: 100% !important;
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

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (min-width: 640px) {
    .hero {
      gap: 60px;
      padding: 40px 25px;
    }

    .background {
      padding: 40px;
      flex-direction: row;
    }

    .hero-text {
      flex: 1;
      text-align: left;
    }

    .hero-text h1 {
      font-size: 2.2rem;
    }

    .hero-image {
      flex: 1;
    }

    .book {
      width: 130px;
    }

    .man {
      width: 160px;
    }

    .others {
      flex-direction: row;
      gap: 30px;
    }

    .practice {
      flex: 1;
      padding: 40px 25px;
    }

    .title1 h3,
    .title2 h3 {
      font-size: 22px;
    }

    .bod {
      font-size: 15px;
    }

    :global(.indexHeader) {
      padding: 15px 30px;
      gap: 40px;
    }

    .header-logo {
      gap: 12px;
    }

    :global(.indexHeader .uniben) {
      width: 50px;
    }

    :global(.indexHeader .logo) {
      font-size: 26px;
    }
  }

  @media (min-width: 1024px) {
    .hero {
      gap: 80px;
      padding: 50px 30px;
    }

    .background {
      padding: 50px;
      max-width: 1100px;
    }

    .hero-text h1 {
      font-size: 2.8rem;
    }

    .hero-text p {
      font-size: 18px;
    }

    .book {
      width: 140px;
    }

    .man {
      width: 180px;
    }

    .others {
      max-width: 1100px;
      gap: 40px;
    }

    .imgdesc {
      width: 80px;
    }

    .practice {
      padding: 50px 30px;
    }

    .practice:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 30px rgba(122, 92, 250, 0.15);
    }

    .title1 h3,
    .title2 h3 {
      font-size: 24px;
    }
  }
</style>
