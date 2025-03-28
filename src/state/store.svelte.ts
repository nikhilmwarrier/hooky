import type { card } from "../types";

class GlobalState {
  #cards = $state<card[]>([]);
  #weeks = $state<number>(12);

  constructor() {
    try {
      this.#cards = JSON.parse(localStorage.getItem("cards"));
      this.#weeks = JSON.parse(localStorage.getItem("weeks"));
    } catch (err) {
      console.error(err);
    }

    $effect.root(() => {
      $effect(() => {
        localStorage.setItem("cards", JSON.stringify(this.#cards ?? []));
      });
    });
  }

  get cards() {
    return this.#cards || [];
  }

  set cards(value) {
    this.#cards = value;
  }

  get weeks() {
    return this.#weeks || 12;
  }

  set weeks(value) {
    if (value < 1) return;
    this.#weeks = value;
    localStorage.setItem("weeks", JSON.stringify(value));
  }
}

export let state = new GlobalState();
