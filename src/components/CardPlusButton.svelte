<script>
  let props = $props();
</script>

<div class="card">
  <button {...props}> + </button>
</div>

<style>
  .card {
    border-radius: 12px;
    border: 1px dashed var(--border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    min-width: 15rem;
    max-width: 30rem;
    flex: 0 0 auto;
  }

  button {
    height: 100%;
    width: 100%;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 4.5rem;
    color: rgba(from var(--text-color) r g b / 0.7);
    transition: border 0.2s ease;
    border-radius: 12px;
  }

  button:hover {
    background: rgba(from var(--border-color) r g b / 0.7);
  }
</style>
