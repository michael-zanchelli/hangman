
/** Hangman gallows UI class */
class GallowsUI {

  static #NUM_BODY_PARTS = 6;

  #gallowsEl; /** "Gallows" canvas element */
  #numBodyParts; /** number draen so far */

  constructor() {
    this.#gallowsEl = document.querySelector("div#hangman #gallows");
  }

  newGame() {
    this.#numBodyParts = 0;
  }
}