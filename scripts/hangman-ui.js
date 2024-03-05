/**
 * Hangman game UI
 */

class HangmanUI {
  static #WORD_URL = "https://random-word-api.herokuapp.com/word";

  #hangman; /** Hangman game obj */
  #boardUI; /** HangmanBoard UI class */

  #newGameButton; /** New Game button */

  #theAnswer;

  /** Constructor
   * Note: this is called after page DOM is fully loaded
   */
  constructor() {
    const hangmanEl = document.querySelector("div#hangman");
    this.#boardUI = new HangmanBoardUI(hangmanEl);
    this.#newGameButton = hangmanEl.querySelector("#newGameButton");
    this.#newGameButton.onclick = () => this.newGameButtonClickHandler();

    this.#hangman = new Hangman();

    this.#newGame();
  }

  #newGame() {
    const response = fetch(HangmanUI.#WORD_URL)
      .then(response => response.json())
      .then(data => {
        this.#theAnswer = data[0];
        console.log("word=" + this.#theAnswer);
        setTimeout(() => { this.#boardUI.newGame(this.#theAnswer); }, 10);
        // return this.#theAnswer;
      });
  }

  newGameButtonClickHandler() {
    this.#newGame();
  }
}

/* When page DOM is fully loaded, create an instance of the HangmanUI class */
window.onload = () => {
  let hangmanUI = new HangmanUI();
}