<script>
  export let data;
  console.log(data);
  import Quiz from "./Quiz.svelte";
</script>

<Quiz Quiz={data.quiz[0]} course={data.course} next={data.next} />
