<script>
  export let data;

  import CourseList from "./CourseList.svelte";
</script>

<CourseList
  departmentName={data.departmentName}
  level={data.level}
  courses={data.courses}
  faculty={data.faculty}
/>
