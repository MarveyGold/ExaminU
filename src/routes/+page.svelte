<script>
  import Nav from "$lib/Components/Nav.svelte";
  import Auth from "$lib/Components/AuthIndex.svelte";
  import Contact from "$lib/Components/Contact.svelte";
  export let data;
</script>

<div class="index">
  <header class="indexHeader">
    <img class="uniben" src="/favicon.png" alt="examinu" />
    <div class="logo">ExaminU</div>
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
        <img class="imgdesc" src="857524.png" alt="null" />
        <div class="title1">
          <h3>Browse Courses</h3>
          <div class="bod">
            find and browse over 20 available courses with ease
          </div>
        </div>
      </div>
      <div class="practice">
        <img class="imgdesc" src="4690558-200.png" alt="null" />
        <div class="title2">
          <h3>Practice PQ</h3>
          <div class="bod">
            answer previous sessions' questions on one click
          </div>
        </div>
      </div>
    </div>
    <Contact />
  </section>
</div>

