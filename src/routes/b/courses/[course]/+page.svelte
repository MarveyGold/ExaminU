<script>
import { page } from '$app/state';
  export let data;
  import Quiz from "./Quiz.svelte";
</script>
<svelte:head>
  <title>{data.course} Past Questions | ExaminU</title>
  <meta
    name="description"
    content={`Practice ${data.course} past questions and likely exam questions on ExaminU. Test yourself and prepare smarter for your exams.`}
  />
  <link rel="canonical" href={page.url.origin + page.url.pathname} />

  <meta property="og:title" content={`${data.course} Past Questions | ExaminU`} />
  <meta
    property="og:description"
    content={`Practice ${data.course} past questions and likely exam questions on ExaminU. Test yourself and prepare smarter for your exams.`}
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={page.url.origin + page.url.pathname} />
  <meta property="og:site_name" content="ExaminU" />
</svelte:head>
<Quiz Quiz={data.quiz[0]} course={data.course} next={data.next} />
