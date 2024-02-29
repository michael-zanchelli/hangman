/**
 * Hangman game UI
 */

class HangmanUI {

  #hangman;
  
  #board;
  #guesses;
  #newGameButton;

  /** Constructor
   * Note: this is called after page DOM is fully loaded
   */
  constructor() {
    this.#hangman = new Hangman();

    this.#board = document.querySelector("div#hangman #board");

    this.#guesses = document.querySelector("div#hangman #guesses");

    this.#newGameButton = document.querySelector("div#hangman #newGameButton");
    this.#newGameButton.onclick = () => this.newGameButtonClickHandler();
  }

  newGameButtonClickHandler() {

  }
}

/* When page DOM is fully loaded, create an instance of the HangmanUI class */
window.onload = () => {
  let hangmanUI = new HangmanUI();
}