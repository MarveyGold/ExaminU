<script>
  import { faculty, department } from "$lib/stores";
  export let data;
  faculty.set(data.faculty);
  department.set(data.department);
  import CourseList from "./CourseList.svelte";
</script>

<CourseList
  departmentName={data.departmentName}
  level={data.level}
  courses={data.courses}
  faculty={data.faculty}
  department={data.department}
/>
