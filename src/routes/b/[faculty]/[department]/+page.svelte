<script>
  import { faculty, department } from "$lib/stores";
 import { page } from '$app/state';

export let data;
  faculty.set(data.faculty);
  department.set(data.department);
  import CourseList from "./CourseList.svelte";
</script>

<svelte:head>
  <title>{data.departmentName} {data.level} Level | {data.facultyName} | ExaminU</title>
  <meta
    name="description"
    content={`Practice ${data.departmentName} ${data.level} level past questions on ExaminU. ${data.courses[`${data.level}level`].length} courses available for ${data.facultyName} students.`}
  />

  <meta property="og:title" content={`${data.departmentName} ${data.level} Level | ${data.facultyName} | ExaminU`} />
  <meta
    property="og:description"
    content={`Practice ${data.departmentName} ${data.level} level past questions on ExaminU. ${data.courses[`${data.level}level`].length} courses available for ${data.facultyName} students.`}
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={page.url.origin + page.url.pathname} />
  <meta property="og:site_name" content="ExaminU" />
</svelte:head>


<CourseList
  departmentName={data.departmentName}
  level={data.level}
  courses={data.courses}
  faculty={data.faculty}
  department={data.department}
/>
