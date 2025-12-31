<script>
  import FacultyList from "./FacultyList.svelte";
  export let data
  let names = data.names;
  let codes = data.codes;
  </script>
  <FacultyList 
  names={names}
  codes={codes}
    />
