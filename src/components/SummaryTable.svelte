<script>
  let { bunkable } = $props();
</script>

<div class="card">
  <h3>Classes you can bunk</h3>
  <table>
    <thead>
      <tr>
        <th>Course</th>
        <th>Hours</th>
      </tr>
    </thead>

    <tbody>
      {#each bunkable as card}
        <tr>
          <td>{card.title}</td>
          <td>{card.skip}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .card {
    padding-top: 0.5rem;
    max-width: 100%;
    border: none;
  }

  @media (min-width: 60rem) {
    .card {
      grid-column: 1 / 3;
      padding-bottom: 3rem;
    }

    table {
      width: auto;
      margin: auto;
      min-width: 45rem;
    }
  }

  @media (min-width: 100rem) {
    .card {
      grid-column: 1 / 4;
    }
  }

  h3 {
    text-align: center;
  }

  th {
    padding: 0.5rem;
    text-align: left;
  }

  th:last-child {
    text-align: center;
  }

  td:last-child {
    text-align: center;
  }
</style>
