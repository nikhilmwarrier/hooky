<script>
  const { percentage, lowerThreshold, higherThreshold } = $props();
</script>

<div class="single-chart">
  <svg
    viewBox="0 0 36 36"
    class="circular-chart"
    class:orange={percentage < lowerThreshold}
    class:blue={percentage >= lowerThreshold && percentage < higherThreshold}
    class:green={percentage >= higherThreshold}
  >
    <path
      class="circle-bg"
      d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <path
      class="circle"
      stroke-dasharray={`${percentage}, 100`}
      d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <text x="18" y="20.35" class="percentage">{Math.round(percentage)}%</text>
  </svg>
</div>

<style>
  .single-chart {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .circular-chart {
    display: block;
    margin: 10px auto;
    max-width: 80%;
    max-height: 250px;
  }

  .circle-bg {
    fill: none;
    stroke: var(--border-color);
    stroke-width: 3.8;
  }

  .circle {
    fill: none;
    stroke-width: 2.8;
    stroke-linecap: round;
    animation: progress 1s ease-out forwards;
  }

  @keyframes progress {
    0% {
      stroke-dasharray: 0 100;
    }
  }

  .circular-chart.orange .circle {
    stroke: #ff9f00;
  }

  .circular-chart.green .circle {
    stroke: #4cc790;
  }

  .circular-chart.blue .circle {
    stroke: #3c9ee5;
  }

  .percentage {
    fill: var(--text-color);
    font-family: sans-serif;
    font-size: 0.5rem;
    text-anchor: middle;
  }
</style>
