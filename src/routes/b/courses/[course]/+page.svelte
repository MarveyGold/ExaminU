<script>
  export let data;

  import Quiz from "./Quiz.svelte";
</script>

<Quiz Quiz={data.quiz} course={data.course} next={data.next} />
