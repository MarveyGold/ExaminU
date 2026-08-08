<script>
  import { faculty, department } from "$lib/stores";
 import { page } from '$app/state';

export let data;
  faculty.set(data.faculty);
  department.set(data.department);
  import CourseList from "./CourseList.svelte";
</script>
<svelte:head>
  <title>{data.departmentName} | {data.facultyName} | ExaminU</title>
  <meta
    name="description"
    content={`Access past questions and exam prep materials for ${data.departmentName} students in the ${data.facultyName}. ${Object.values(data.courses).flat().length} courses available on ExaminU.`}
  />
  <link rel="canonical" href={`${page.url.origin}/b/${data.faculty}/${data.department}`} />

  <meta property="og:title" content={`${data.departmentName} | ${data.facultyName} | ExaminU`} />
  <meta
    property="og:description"
    content={`Access past questions and exam prep materials for ${data.departmentName} students in the ${data.facultyName}. ${Object.values(data.courses).flat().length} courses available on ExaminU.`}
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={`${page.url.origin}/b/${data.faculty}/${data.department}`} />
  <meta property="og:site_name" content="ExaminU" />
</svelte:head>

<CourseList
  departmentName={data.departmentName}
  level={data.level}
  courses={data.courses}
  faculty={data.faculty}
  department={data.department}
/>
