/**
 * Hangman game UI
 */

class HangmanUI {
  static #WORD_URL = "https://random-word-api.herokuapp.com/word";

  #answerUI; /** HangmanBoard UI class */

  #newGameButton; /** New Game button */

  #theAnswer;

  /** Constructor
   * Note: this is called after page DOM is fully loaded
   */
  constructor() {
    const hangmanEl = document.querySelector("div#hangman");
    this.#answerUI = new HangmanAnswerUI(hangmanEl);
    this.#newGameButton = hangmanEl.querySelector("#newGameButton");
    this.#newGameButton.onclick = () => this.newGameButtonClickHandler();

    this.#newGame();
  }

  #newGame() {
    const response = fetch(HangmanUI.#WORD_URL)
      .then(response => response.json())
      .then(data => {
        this.#theAnswer = data[0];
        console.log("word=" + this.#theAnswer);
        setTimeout(() => { this.#answerUI.newGame(this.#theAnswer); }, 10);
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