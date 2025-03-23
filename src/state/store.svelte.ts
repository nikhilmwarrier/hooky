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
  }

  get cards() {
    return this.#cards;
  }

  set cards(value) {
    this.#cards = value;
    localStorage.setItem("cards", JSON.stringify(value));
  }

  get weeks() {
    return this.#weeks;
  }

  set weeks(value) {
    if (value < 1) return;
    this.#weeks = value;
    localStorage.setItem("weeks", JSON.stringify(value));
  }
}

export let state = new GlobalState();
