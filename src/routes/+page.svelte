<script>
  // Self-hosted, so there is no request to Google Fonts. Latin subset, one file (~40 KB).
  import "@fontsource-variable/bricolage-grotesque/wght.css";

  import SiteHeader from "#lib/Components/SiteHeader.svelte";
  import DemoQuestion from "#lib/Components/DemoQuestion.svelte";
  import Contact from "#lib/Components/Contact.svelte";
  import InstallPrompt from "#lib/Components/InstallPrompt.svelte";
  import NumberCounter from "#lib/Components/NumberCounter.svelte";
import { landing } from "#lib/landing.js";

  let { data } = $props();
console.log(data)
  const user = $derived(data.user);
  const cta = $derived(user ? landing.hero.ctaReturning : landing.hero.cta);

  const links = [
    { href: "#how", label: "How it works" },
    { href: "#trust", label: "Our approach" },
    ...(landing.show.partners ? [{ href: "#partners", label: "Partners" }] : []),
    { href: "#contact", label: "Feedback" }
  ];

  const year = new Date().getFullYear();
</script>

<div class="lp">
  <SiteHeader {links} {user} {cta} ctaHref="/app" />

  <main class="main">
    <section class="opener">
      <div class="wrap opener-grid">
        <div class="copy">
          <h1>{landing.hero.headline}</h1>
          <p class="sub">{landing.hero.sub}</p>

          <div class="ctas">
            <a class="btn primary" href="/app">{cta}</a>
            <a class="btn ghost" href="#how">{landing.hero.secondary}</a>
          </div>

          <p class="award">
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <path class="ribbon" d="M10 18 7 29l6-3 3 4 3-4 6 3-3-11" />
              <circle class="disc" cx="16" cy="12" r="9" />
              <path class="star" d="m16 7 1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5z" />
            </svg>
            <span>
              <strong>{landing.award.title}</strong>
              {landing.award.by}
            </span>
          </p>
        </div>

        <div class="demo">
          <DemoQuestion samples={landing.samples} ctaHref="/app" />
        </div>
      </div>
    </section>

    <section class="facts" aria-label="ExaminU in numbers">
      <ul class="wrap facts-row">
        {#each landing.facts as fact}
          <li>
            <strong>{fact.value}</strong>
            <span>{fact.label}</span>
          </li>
        {/each}
      </ul>
      <div>
          <ul class="wrap">

          </ul>
      </div>
    </section>
    <marquee class="course facts" aria-label="Available Courses">
      <ul class="wrap facts-row">
        {#each data.courses as course}
          <li>
            <strong>{course}</strong>
          </li>
        {/each}
      </ul>
      <div>
          <ul class="wrap">

          </ul>
      </div>
    </marquee>

    <section class="study" aria-hidden="false">
      <div class="wrap study-grid">
        <img class="study-img" src="/images/hero-man.png" alt="A student studying on a laptop" width="340" height="364" loading="lazy" />
        <div class="study-copy">
          <h2>{landing.study.title}</h2>
          <p class="prose">{landing.study.body}</p>
          <InstallPrompt />
        </div>
      </div>
    </section>

    <section class="sec" id="how">
      <div class="wrap">
        <h2>{landing.steps.title}</h2>
        <ol class="steps">
          {#each landing.steps.items as step, i}
            <li>
              {#if i === 0}
                <img class="step-icon" src="/images/icon-focus.png" alt="" width="40" height="40" loading="lazy" />
              {:else if i === 1}
                <img class="step-icon" src="/images/icon-checklist.png" alt="" width="40" height="40" loading="lazy" />
              {/if}
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          {/each}
        </ol>
      </div>
    </section>

    <section class="trust" id="trust">
      <div class="wrap trust-grid">
        <div class="trust-text">
          <h2>{landing.trust.title}</h2>
          <p class="prose">{landing.trust.body}</p>
          <a class="text-link" href="#contact">{landing.trust.link}</a>
        </div>
        <img class="trust-img" src="/images/hero-book.png" alt="" width="220" height="220" loading="lazy" />
      </div>
    </section>

    {#if landing.show.partners}
      <section class="partners" id="partners">
        <div class="wrap">
          <h2>{landing.partners.title}</h2>
          <div class="partner-grid">
            {#each landing.partners.items as item}
              <div class="partner">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            {/each}
          </div>
          <a class="btn light" href="#contact">{landing.partners.cta}</a>
        </div>
      </section>
    {/if}

    {#if landing.testimonials.length}
      <section class="sec" id="voices">
        <div class="wrap">
          <h2>What students say</h2>
          <ul class="voices">
            {#each landing.testimonials as t}
              <li>
                <blockquote>{t.quote}</blockquote>
                <p class="who"><strong>{t.name}</strong> {t.detail}</p>
              </li>
            {/each}
          </ul>
        </div>
      </section>
    {/if}

    <Contact title={landing.contact.title} body={landing.contact.body} />
  </main>

  <footer class="foot">
    <div class="wrap foot-grid">
      <div class="foot-brand">
        <a class="brand" href="/">
          <img src="/favicon.png" alt="" width="32" height="32" />
          <span>ExaminU</span>
        </a>
        <p>{landing.footer.blurb}</p>
      </div>
      <nav aria-label="Footer">
        <ul>
          <li><a href="/app">{cta}</a></li>
          <li><a href="#how">How it works</a></li>
          <li><a href="#contact">Feedback</a></li>
        </ul>
      </nav>
    </div>
    <p class="wrap legal">
      © {year} ExaminU · Illustrations and icons by
      <a href="https://www.freepik.com" target="_blank" rel="noopener noreferrer">Freepik</a>
    </p>
  </footer>
</div>

<style>
  /* ---------- Tokens ---------- */
  .lp {
    --ink: #1b1740;
    --body: #47456a;
    --muted: #64628a;
    --ground: #f7f6fc;
    --paper: #ffffff;
    --line: #e4e2f2;
    --line-strong: #8f8cb2;
    --rule: #d9def5;
    --violet: #5a3df0;
    --violet-deep: #4527d4;
    --violet-tint: #efecff;
    --pen: #d93a41;
    --pen-text: #b3232a;
    --pen-tint: #fdecec;
    --ok: #0d7a53;
    --ok-tint: #e4f5ec;
    --gold: #c98a07;

    --font-sans: "Bricolage Grotesque Variable", ui-sans-serif, system-ui, "Segoe UI", Roboto, sans-serif;
    --font-serif: ui-serif, Georgia, "Noto Serif", "Times New Roman", serif;

    --wrap: 1120px;
    --gap: clamp(1rem, 4vw, 2rem);

    min-height: 100dvh;
    background: var(--ground);
    color: var(--body);
    font-family: var(--font-sans);
    font-size: 1rem;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
  }

  /* globals.css forces one font on every element; this lets a single element
     opt into the serif by setting --ff, and everything inside follows. */
  .lp :global(*) {
    font-family: var(--ff, var(--font-sans));
  }

  .lp :global(a:focus-visible),
  .lp :global(button:focus-visible) {
    outline: 3px solid var(--violet);
    outline-offset: 3px;
  }

  .wrap {
    max-width: var(--wrap);
    margin-inline: auto;
    padding-inline: var(--gap);
  }

  /* globals.css styles every <main> as the dark app shell; undo that here. */
  .main {
    display: block;
    width: auto;
    min-height: 0;
    padding: 0;
    background: none;
    color: inherit;
  }

  h1,
  h2,
  h3 {
    margin: 0;
    color: var(--ink);
    font-weight: 700;
    text-wrap: balance;
  }

  h2 {
    font-size: clamp(1.75rem, 1.2rem + 2vw, 2.5rem);
    line-height: 1.1;
    letter-spacing: -0.025em;
  }

  h3 {
    font-size: 1.25rem;
    line-height: 1.25;
    letter-spacing: -0.01em;
  }

  /* ---------- Buttons and links ---------- */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 52px;
    padding: 0 1.75rem;
    border-radius: 999px;
    border: 1.5px solid transparent;
    font-size: 1.0625rem;
    font-weight: 600;
    transition: background-color 0.15s, border-color 0.15s;
  }

  .btn.primary {
    background: var(--violet);
    color: #fff;
  }

  .btn.primary:hover {
    background: var(--violet-deep);
  }

  .btn.ghost {
    border-color: var(--line-strong);
    color: var(--ink);
  }

  .btn.ghost:hover {
    border-color: var(--ink);
  }

  .btn.light {
    background: #fff;
    color: var(--ink);
  }

  .btn.light:hover {
    background: var(--violet-tint);
  }

  .text-link {
    display: inline-block;
    margin-top: 1.25rem;
    font-weight: 600;
    color: var(--violet-deep);
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  /* ---------- Hero ---------- */
  .opener {
    padding-block: clamp(1.75rem, 5vw, 4.5rem) clamp(2.5rem, 6vw, 5rem);
  }

  /* On phones the copy's children join the grid directly, so the sample
     question sits right under the buttons and the award line comes after it. */
  .opener-grid {
    display: grid;
    align-items: center;
  }

  .copy {
    display: contents;
  }

  .demo {
    order: 4;
    margin-top: 2.25rem;
  }

  .award {
    order: 5;
  }

  h1 {
    font-size: clamp(2.375rem, 1.5rem + 4.2vw, 4rem);
    line-height: 1.02;
    letter-spacing: -0.035em;
    font-weight: 750;
  }

  .sub {
    max-width: 34rem;
    margin-top: 1.25rem;
    font-size: 1.125rem;
    line-height: 1.55;
  }

  .ctas {
    display: grid;
    gap: 0.75rem;
    margin-top: 1.75rem;
  }

  .award {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    max-width: 30rem;
    margin-top: 1.75rem;
    font-size: 0.9375rem;
    line-height: 1.4;
  }

  .award strong {
    display: block;
    color: var(--ink);
  }

  .award svg {
    flex: none;
    width: 34px;
    height: 34px;
  }

  .award .ribbon {
    fill: var(--violet);
  }

  .award .disc {
    fill: var(--gold);
  }

  .award .star {
    fill: #fff;
  }

  /* ---------- Numbers ---------- */
  .facts {
    background: var(--paper);
    border-block: 1px solid var(--line);
  }

  .facts-row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding-block: 1.5rem;
    list-style: none;
  }

  .facts-row li {
    display: grid;
    gap: 0.125rem;
    align-content: start;
  }

  .facts-row li + li {
    padding-left: clamp(0.75rem, 3vw, 2rem);
    border-left: 1px solid var(--line);
  }

  .facts-row strong {
    font-size: clamp(1.5rem, 1rem + 2vw, 2.25rem);
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--ink);
  }

  .facts-row span {
    font-size: 0.875rem;
    line-height: 1.35;
    color: var(--muted);
  }

  /* ---------- Study anywhere ---------- */
  .study {
    padding-block: clamp(2.5rem, 6vw, 4rem);
  }

  .study-grid {
    display: grid;
    justify-items: center;
    gap: 1.75rem;
    text-align: center;
  }

  .study-img {
    width: 150px;
    height: auto;
  }

  .study-copy .prose {
    max-width: 34rem;
    margin-inline: auto;
    font-size: 1.0625rem;
  }

  .study-copy :global(.install) {
    margin: 1.25rem auto 0;
  }

  /* ---------- How it works ---------- */
  .sec {
    padding-block: clamp(3.5rem, 8vw, 6rem);
    scroll-margin-top: 64px;
  }

  .step-icon {
    width: 40px;
    height: 40px;
    margin-bottom: 0.75rem;
  }

  #how,
  #trust,
  #partners,
  #voices {
    scroll-margin-top: 64px;
  }

  .steps {
    display: grid;
    gap: 2rem;
    margin-top: 2.5rem;
    padding: 0;
    list-style: none;
    counter-reset: step;
  }

  .steps li {
    counter-increment: step;
    padding-top: 1rem;
    border-top: 2px solid var(--ink);
  }

  .steps li::before {
    content: counter(step);
    display: block;
    margin-bottom: 0.75rem;
    font-size: 2.25rem;
    line-height: 1;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--violet);
  }

  .steps p {
    max-width: 24rem;
    margin-top: 0.5rem;
  }

  /* ---------- Trust ---------- */
  .trust {
    padding-block: clamp(3.5rem, 8vw, 6rem);
    background: var(--paper);
    border-block: 1px solid var(--line);
  }

  .trust-grid {
    display: grid;
    gap: 2rem;
    align-items: center;
  }

  .trust-img {
    width: 140px;
    height: auto;
    justify-self: center;
  }

  .prose {
    --ff: var(--font-serif);
    max-width: 36rem;
    font-size: 1.25rem;
    line-height: 1.65;
    color: var(--ink);
  }

  /* ---------- Partners ---------- */
  .partners {
    padding-block: clamp(3.5rem, 8vw, 6rem);
    background: var(--ink);
    color: #d6d3f3;
  }

  .partners h2,
  .partners h3 {
    color: #fff;
  }

  .partner-grid {
    display: grid;
    gap: 2rem;
    margin-block: 2.5rem;
  }

  .partner {
    padding-top: 1.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  .partner p {
    max-width: 30rem;
    margin-top: 0.5rem;
  }

  .partners :global(a:focus-visible) {
    outline-color: #fff;
  }

  /* ---------- Student quotes (hidden until you add some) ---------- */
  .voices {
    display: grid;
    gap: 2rem;
    margin-top: 2.5rem;
    list-style: none;
  }

  .voices blockquote {
    --ff: var(--font-serif);
    font-size: 1.25rem;
    line-height: 1.55;
    color: var(--ink);
  }

  .who {
    margin-top: 0.75rem;
    font-size: 0.9375rem;
  }

  .who strong {
    color: var(--ink);
  }

  /* ---------- Footer ---------- */
  .foot {
    position: static;
    display: block;
    width: auto;
    max-width: none;
    padding: 2.5rem 0 2rem;
    background: none;
    backdrop-filter: none;
    border-top: 1px solid var(--line);
  }

  .foot-grid {
    display: grid;
    gap: 1.5rem;
  }

  .foot .brand {
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
    color: var(--ink);
    font-size: 1.125rem;
    font-weight: 750;
  }

  .foot .brand img {
    border-radius: 8px;
  }

  .foot-brand p {
    max-width: 24rem;
    margin-top: 0.75rem;
    font-size: 0.9375rem;
  }

  .foot ul {
    display: grid;
    gap: 0.25rem;
    list-style: none;
  }

  .foot nav {
    display: block;
    flex: none;
  }

  .foot nav a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--body);
  }

  .foot nav a:hover {
    color: var(--violet-deep);
  }

  .legal {
    margin-top: 1.5rem;
    font-size: 0.875rem;
    color: var(--muted);
  }

  .legal a {
    color: var(--muted);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .legal a:hover {
    color: var(--violet-deep);
  }

  /* ---------- Wider screens ---------- */
  @media (min-width: 760px) {
    .steps,
    .partner-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 2.5rem;
    }

    .partner-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 3rem;
    }

    .voices {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .foot-grid {
      grid-template-columns: 1fr auto;
      align-items: start;
    }
  }

  @media (min-width: 480px) {
    .ctas {
      display: flex;
      flex-wrap: wrap;
    }
  }

  @media (min-width: 900px) {
    .opener-grid {
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      gap: 4rem;
    }

    .copy {
      display: block;
    }

    .demo {
      order: 0;
      margin-top: 0;
    }

    .trust-grid {
      grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
      gap: 4rem;
    }

    .trust-img {
      order: 2;
      width: 180px;
    }

    .study-grid {
      grid-template-columns: auto minmax(0, 1fr);
      justify-items: start;
      text-align: left;
    }

    .study-img {
      width: 170px;
    }

    .study-copy .prose {
      margin-inline: 0;
    }

    .study-copy :global(.install) {
      margin-inline: 0;
    }
  }
</style>
