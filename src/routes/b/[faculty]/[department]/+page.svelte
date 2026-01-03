<script>
  import { level, faculty, department } from "$lib/stores";
  export let data;
  level.set(data.level);
  faculty.set(data.faculty);
  department.set(data.department);
  import CourseList from "./CourseList.svelte";
  console.log($level);
</script>

<CourseList
  departmentName={data.departmentName}
  level={$level}
  courses={data.courses}
  faculty={data.faculty}
  department={data.department}
/>
