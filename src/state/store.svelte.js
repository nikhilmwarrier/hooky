export function createCardsState() {
  let fromLocalStorage = null;

  try {
    fromLocalStorage = JSON.parse(localStorage.getItem("cards"));
  } catch (error) {
    console.log(error);
  }

  let cards = $state(
    fromLocalStorage || [
      {
        id: crypto.randomUUID(),
        title: "Foundations of Computing",
        present: 4,
        total: 6,
        classesPerWeek: 3,
      },

      {
        id: crypto.randomUUID(),
        title: "Discrete Mathematics",
        present: 15,
        total: 18,
        classesPerWeek: 4,
      },
    ]
  );

  $effect(() => {
    console.log(cards);
    localStorage.setItem("cards", JSON.stringify(cards));
  });

  $inspect(cards);

  return {
    cards,
  };
}
