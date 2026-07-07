<script>
  import Nav from "$lib/Components/Nav.svelte";
  import Auth from "$lib/Components/AuthIndex.svelte";
  import Contact from "$lib/Components/Contact.svelte";
  export let data;
</script>

<header class="pageHeader">
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

<style>
  .pageHeader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    max-width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation: slideDown 1s ease-in-out;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 12px 15px;
    background-color: #fff;
    gap: 20px;
    flex-wrap: nowrap;
  }

  .header-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    text-decoration: none;
  }

  .uniben {
    width: 45px;
    height: auto;
    border-radius: 8px;
    flex-shrink: 0;
  }

  .logo {
    font-weight: bold;
    font-size: 22px;
    background: linear-gradient(to right, blue, purple);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }

  :global(.pageHeader nav) {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  :global(.pageHeader nav ul) {
    gap: 30px;
    list-style: none;
  }

  :global(.pageHeader nav ul li a) {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  :global(.pageHeader nav ul li a:hover) {
    color: #7a5cfa;
  }

  :global(.pageHeader .auth-buttons) {
    display: flex;
    gap: 10px;
    z-index: 100;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding: 30px 15px;
    align-items: center;
    background: linear-gradient(to bottom, #fff, #f9f5ff);
    min-height: calc(100vh - 80px);
    margin-top: 70px;
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
    width: 100%;
  }

  .practice:active {
    transform: scale(0.98);
  }

  .imgdesc {
    width: 70px;
    height: auto;
    flex-shrink: 0;
  }

  .title1,
  .title2 {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    align-items: center;
    justify-content: center;
  }

  .title1 h3,
  .title2 h3 {
    font-size: 20px;
    color: #7a5cfa;
    font-weight: 800;
    margin: 0;
  }

  .bod {
    font-size: 14px;
    color: #666;
    line-height: 1.5;
    text-align: center;
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

  @media (min-width: 640px) {
    .pageHeader {
      padding: 15px 30px;
      gap: 40px;
    }

    .header-logo {
      gap: 12px;
    }

    .uniben {
      width: 50px;
    }

    .logo {
      font-size: 26px;
    }

    section {
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
  }

  @media (min-width: 1024px) {
    section {
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
