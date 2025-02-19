export function createCardsState() {
  let cardsFromLocalStorage = null;
  let weeksFromLocalStorage = null;
  try {
    cardsFromLocalStorage = JSON.parse(localStorage.getItem("cards"));
    weeksFromLocalStorage = JSON.parse(localStorage.getItem("weeks"));
  } catch (error) {
    console.log(error);
  }

  let cards = $state(
    cardsFromLocalStorage ||
      [
        // {
        //   id: crypto.randomUUID(),
        //   title: "Foundations of Computing",
        //   present: 4,
        //   total: 6,
        //   classesPerWeek: 3,
        // },
        // {
        //   id: crypto.randomUUID(),
        //   title: "Discrete Mathematics",
        //   present: 15,
        //   total: 18,
        //   classesPerWeek: 4,
        // },
      ]
  );

  let weeks = $state(weeksFromLocalStorage || 12);

  $effect(() => {
    console.log(cards, weeks);
    if (weeks < 1) weeks = 1;
    localStorage.setItem("cards", JSON.stringify(cards));
    localStorage.setItem("weeks", JSON.stringify(weeks));
  });

  $inspect(cards);

  return {
    cards,
    weeks,
  };
}
