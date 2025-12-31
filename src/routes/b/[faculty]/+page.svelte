<script>
  import DepartmentList from "./Departments.svelte"
  export let data
  console.log(data)
</script>
  
<main>
        <div className="title">
          <h3>{data.facultyName}</h3>

        </div>
        <h5>Select Your Department</h5>
        <DepartmentList
          departmentList={data.departmentList}
          departmentNames={data.departmentNames} faculty={
            data.faculty
          }
        />

</main>
