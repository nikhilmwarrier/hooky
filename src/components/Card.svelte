<script>
  import { fade, fly } from "svelte/transition";

  let {
    id,
    ondelete,
    title: courseName = $bindable(""),
    present = $bindable(0),
    total = $bindable(1),
    classesPerWeek = $bindable(1),
    weeks = 12,
  } = $props();

  import { getSkipDays, getSkipDaysExtrapolated } from "../helpers";
  import NumberInput from "./NumberInput.svelte";
  import PercentageCircle from "./PercentageCircle.svelte";

  let totalInSemester = $derived(weeks * classesPerWeek);
  let extrapolatedSemesterAttendance = $derived(
    totalInSemester - (total - present)
  );

  let percentage = $derived(Math.round((100 * present) / total));
  let percentageInSemester = $derived(
    Math.round((100 * extrapolatedSemesterAttendance) / totalInSemester)
  );

  // Set limits
  $effect(() => {
    if (present < 0) present = 0;
    if (present > total) total = present;
    if (total < 1) total = 1;
    if (classesPerWeek < 1) classesPerWeek = 1;
  });

  let threshold = 0.85;

  let skipDays = $derived(getSkipDays(present, total, threshold));
  let skipDaysExtrapolated = $derived(
    getSkipDaysExtrapolated(
      extrapolatedSemesterAttendance,
      totalInSemester,
      threshold
    )
  );
</script>

<div
  class="card"
  in:fly={{ y: 100, duration: 200 }}
  out:fade={{ duration: 200 }}
>
  <button class="delete-btn" onclick={() => ondelete(id)}>&times;</button>
  <div class="title">
    <div class="course-name">
      <input
        class="course-name-input"
        type="text"
        bind:value={courseName}
        placeholder="Course name"
      />
    </div>
  </div>

  <div class="rest">
    <div class="left">
      <div class="number-fraction-input">
        <NumberInput
          size="2"
          bind:value={present}
          min="0"
          max={total}
          onincrement={() => present++}
          ondecrement={() => present--}
        />
        <hr />
        <NumberInput
          size="2"
          min="1"
          bind:value={total}
          onincrement={() => total++}
          ondecrement={() => total--}
        />
      </div>
    </div>
    <div class="right">
      <PercentageCircle {percentage} lowerThreshold={75} higherThreshold={85} />
    </div>
  </div>

  <div class="rest extrapolated">
    <div class="left">
      <div class="number-fraction-input">
        <h3>Extrapolated</h3>
        <NumberInput
          disabled={true}
          size="2"
          value={extrapolatedSemesterAttendance}
          min="0"
          max={total}
          onincrement={() => present++}
          ondecrement={() => present--}
        />
        <hr />
        <NumberInput
          disabled={true}
          size="2"
          min="1"
          value={totalInSemester}
          onincrement={() => total++}
          ondecrement={() => total--}
        />
      </div>
    </div>
    <div class="right">
      <PercentageCircle
        percentage={percentageInSemester}
        lowerThreshold={75}
        higherThreshold={85}
      />
    </div>
  </div>

  <div class="classes-per-week-wrapper">
    <label for="classesPerWeek">Classes per week: </label>
    <NumberInput
      bind:value={classesPerWeek}
      size="3"
      onincrement={() => classesPerWeek++}
      ondecrement={() => classesPerWeek--}
    />
  </div>

  <table>
    <tbody>
      <tr>
        <td>Days you can skip in this semester</td>
        <td class="number"
          >{skipDaysExtrapolated < 0 ? 0 : skipDaysExtrapolated}</td
        >
      </tr>
      <tr>
        <td>
          Days to get attendance back to {Math.round(threshold * 100)}%
        </td>
        <td class="number">
          {skipDays < 0 ? -skipDays : 0}
        </td>
      </tr>
    </tbody>
  </table>
</div>

<style>
  .card {
    border-radius: 12px;
    border: 1px solid var(--border-color);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
  }

  .delete-btn {
    position: absolute;
    right: 0.5rem;
    top: 0.75rem;
    font-size: 1.25rem;
    border-radius: 999px;
    width: 2rem;
    height: 2rem;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: transparent;
    cursor: pointer;
    z-index: 2;
  }

  .delete-btn:hover {
    background: rgba(from var(--border-color) r g b / 0.7);
  }

  table,
  tr,
  td {
    border: 1px solid var(--border-color);
    border-collapse: collapse;
  }

  td.number {
    text-align: right;
  }

  table {
    border-radius: 12px;
  }

  td {
    padding: 0.5rem;
    min-width: 3ch;
  }

  .rest {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .rest.extrapolated {
    background: rgba(from var(--border-color) r g b / 0.3);
    border-radius: 12px;
    padding-bottom: 1rem;
  }

  .rest > * {
    flex: 1;
  }

  .left {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 2rem;
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .card > * {
    flex: 1;
  }

  .course-name {
    width: 100%;
  }

  .course-name input {
    font-size: 1.25rem;
    font-weight: bold;
    opacity: 0.85;
    width: 100%;
    text-align: center;
    border: none;
  }

  .number-fraction-input {
    width: min-content;
  }

  hr {
    border: 1px solid var(--border-color);
  }

  .classes-per-week-wrapper {
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
  }
</style>
