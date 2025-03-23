<script>
  let deferredPrompt = $state(null);

  function handleBeforeInstallPrompt(e) {
    e.preventDefault();
    deferredPrompt = e;
  }

  function handleInstall() {
    deferredPrompt.prompt();
    deferredPrompt = null;
  }
</script>

<svelte:window onbeforeinstallprompt={handleBeforeInstallPrompt} />

<nav>
  <span class="cedarville-cursive-regular">
    Hooky <span class="beta">BETA</span>
  </span>
  {#if deferredPrompt}
    <button class="install" onclick={handleInstall}> Install </button>
  {/if}
</nav>

<style>
  nav {
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 2rem;
    font-size: 2.5rem;
    text-align: center;
  }

  .beta {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    background: #3c9ee5;
    color: black;
    border-radius: 8px;
    padding: 0.25rem 0.4rem;
    font-weight: bold;
    position: absolute;
  }

  button {
    position: absolute;
    top: 2rem;
    right: 1rem;
    background: transparent;
    border: 1px solid var(--border-color);
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    -webkit-tap-highlight-color: transparent;
  }

  button:hover,
  button:active {
    background: rgba(from var(--border-color) r g b / 0.7);
  }
</style>
