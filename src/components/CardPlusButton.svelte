<script>
  let props = $props();
</script>

<div class="card">
  <button {...props}> + </button>
</div>

<style>
  .card {
    border: 1px dashed var(--border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  button {
    -webkit-tap-highlight-color: transparent;
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

  button:active {
    background: var(--button-active-color);
  }

  button:hover {
    background: rgba(from var(--border-color) r g b / 0.7);
  }
</style>
