<script>
  export let data;

  import Quiz from "./Quiz.svelte";
</script>

<Quiz Quiz={data.quiz} length={data.length} course={data.course} />
