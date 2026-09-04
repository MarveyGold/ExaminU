<script>
  import DepartmentList from "./Departments.svelte";
  export let data;
  console.log(data);
</script>

<svelte:head>
  <title>{data.facultyName} | ExaminU</title>
  <meta
    name="description"
    content={`Browse departments under ${data.facultyName} on ExaminU and find past questions to help you prepare for your exams.`}
  />
</svelte:head>
<DepartmentList
  departmentList={data.departmentList}
  departmentNames={data.departmentNames}
  faculty={data.faculty}
  facultyName={data.facultyName}
/>
