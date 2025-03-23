<script>
  import { getSkipDaysExtrapolated } from "../helpers";
  import { state } from "../state/store.svelte";
  import Card from "./Card.svelte";
  import CardPlusButton from "./CardPlusButton.svelte";
  import NumberInput from "./NumberInput.svelte";
  import SummaryTable from "./SummaryTable.svelte";

  let bunkable = $derived(
    state.cards
      .map(card => {
        let totalInSemester = state.weeks * card.classesPerWeek;
        let extrapolatedSemesterAttendance =
          totalInSemester - (card.total - card.present);

        let exSkipDays = getSkipDaysExtrapolated(
          extrapolatedSemesterAttendance,
          totalInSemester,
          card.thresholdPercentage / 100
        );

        return { title: card.title, skip: exSkipDays };
      })
      .filter(card => card.title && card.skip > 0)
  );

  $effect(() => console.log("BUNKABLE", bunkable));

  function createCard() {
    state.cards.push({
      id: crypto.randomUUID(),
      title: "",
      present: 1,
      total: 1,
      classesPerWeek: 1,
      thresholdPercentage: 85,
    });
  }

  function onCardDelete(id) {
    const idx = state.cards.findIndex(el => el.id === id);
    state.cards.splice(idx, 1);
  }
</script>

<div class="weeks-input-wrapper">
  <label for="weeks-input">Weeks in semester: </label>
  <NumberInput
    size="2"
    bind:value={state.weeks}
    onincrement={() => state.weeks++}
    ondecrement={() => state.weeks--}
  />
</div>
<div class="deck" class:flex={state.cards.length === 0}>
  {#if state.cards.length === 0}
    <p>Add some courses to get started!</p>
  {:else}
    {#if bunkable && bunkable.length > 0}
      <SummaryTable {bunkable} />
    {/if}
    {#each state.cards as card (card.id)}
      <Card
        weeks={state.weeks}
        ondelete={onCardDelete}
        id={card.id}
        bind:title={card.title}
        bind:present={card.present}
        bind:total={card.total}
        bind:classesPerWeek={card.classesPerWeek}
        bind:thresholdPercentage={card.thresholdPercentage}
      />
    {/each}
  {/if}
  <CardPlusButton onclick={createCard} />
</div>

<style>
  .weeks-input-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30rem;
    max-width: 100%;
    padding: 1rem;
    margin: auto;
    gap: 1rem;
  }

  .deck {
    padding: 1rem;
    gap: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    width: fit-content;
    margin: auto;
  }

  .deck.flex {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 60rem) {
    .deck {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 100rem) {
    .deck {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>
