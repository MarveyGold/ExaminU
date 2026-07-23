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

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    color: #fff;
    font-family: sans-serif;
    width: 80vw;
    position: relative;
    margin-top: 50px;

    margin-bottom: 50px;
  }
  .faculties {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    max-width: 100vw;
    height: 40vh;
    overflow: hidden;
  }
</style>
