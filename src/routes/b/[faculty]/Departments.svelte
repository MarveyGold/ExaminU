<script>
  let { departmentList, departmentNames, faculty } = $props();
  let selected = $state();
  let departments = departmentNames.map((f, i) => ({
    name: f,
    code: departmentList[i],
  }));
</script>

<div class="list">
  {#each departments as department}
    <button
      class={`course selector ${selected == department.code ? "selected" : ""}`}
      onclick={() => (selected = department.code)}>{department.name}</button
    >
  {/each}
</div>
<footer>
  <a href={`/b`}
    ><button class={selected ? "left-footerButton" : "footerButton"}
      >Change Faculty</button
    ></a
  >
  {#if selected}
    <a href={`/b/${faculty}/${selected}?level=100 `}
      ><button class="footerButton">Continue to Department</button></a
    >
  {/if}
</footer>
