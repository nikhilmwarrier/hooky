<script>
  let {
    value = $bindable(),
    onincrement,
    ondecrement,
    disabled = false,
    ...props
  } = $props();
</script>

<div class="wrapper">
  <button class="left" onclick={ondecrement} {disabled}>–</button>
  <input type="number" {...props} bind:value {disabled} />
  <button class="right" onclick={onincrement} {disabled}>+</button>
</div>

<style>
  .wrapper {
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 0;
    display: flex;
    align-items: center;
    width: fit-content;
    justify-content: space-between;
  }

  input {
    background: transparent;
    border: none;
    font-size: 1rem;
    text-align: center;
    padding: 0.25rem;
    width: 4ch;
  }

  button {
    cursor: pointer;
    padding: 0.5rem;
    background: transparent;
    border: none;
    font-size: inherit;
    font-weight: bolder;
    height: 100%;
    -webkit-tap-highlight-color: transparent;
  }

  button.left {
    border-radius: 12px 0 0 12px;
  }

  button.right {
    border-radius: 0 12px 12px 0;
  }
  button:active {
    background: var(--button-active-color);
  }

  /* Hide spin box */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type="number"] {
    -moz-appearance: textfield; /* Firefox */
  }
</style>
