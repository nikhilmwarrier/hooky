<script>
  let { bunkable } = $props();
</script>

<div class="card">
  <details class:disabled={!bunkable || bunkable.length <= 0}>
    <summary>
      <div class="summary-content">
        {#if bunkable && bunkable.length > 0}
          Classes you can skip
        {:else}
          You can't skip any classes
        {/if}
      </div>
      <div class="summary-chevron-down">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-chevron-up"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </div>
    </summary>
    {#if bunkable && bunkable.length > 0}
      <div class="details-content">
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
    {/if}
  </details>
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
      margin: auto;
      min-width: 45rem;
    }
  }

  @media (min-width: 100rem) {
    .card {
      grid-column: 1 / 4;
    }
  }

  table {
    width: 100%;
  }

  summary {
    text-align: center;
    padding: 0.5rem;
    cursor: pointer;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: border-radius 0.2s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .summary-chevron-down {
    transition: all 0.2s ease;
    transform: rotateX(180deg) translateY(2px);
  }

  /* .details-content {
    height: 0;
    transition: all 0.2s ease;
  } */

  details[open] .details-content {
    animation: animateDown 0.3s ease forwards;
  }

  @keyframes animateDown {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  details[open] .summary-chevron-down {
    transform: rotateX(0) translateY(2px);
  }

  details[open] summary {
    border-bottom: none;
    border-radius: 8px 8px 0 0;
  }

  details.disabled summary {
    border: 1px solid var(--border-color);
    border-radius: 8px;
    opacity: 0.5;
    pointer-events: none; /* prevents click events */
    user-select: none; /* prevents text selection */
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
