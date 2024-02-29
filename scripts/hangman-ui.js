/**
 * Hangman game UI
 */

class HangmanUI {

  #hangman; /* Hangman game obj */
  #answer;   /** "answer" element */
  #guesses; /** "guesses" element */

  #newGameButton; /** New Game button */

  #theWord;

  /** Constructor
   * Note: this is called after page DOM is fully loaded
   */
  constructor() {
    this.#hangman = new Hangman();
    
    this.#answer = document.querySelector("div#hangman #answers");
    this.#guesses = document.querySelector("div#hangman #guesses");
    this.#guesses.addEventListener("input", () => this.inputHandler());

    this.#newGameButton = document.querySelector("div#hangman #newGameButton");
    this.#newGameButton.onclick = () => this.newGameButtonClickHandler();

    this.#newGame();
  }

  #newGame() {
    this.#theWord = this.#hangman.newWord();

  }

  inputHandler() {

  }
  
  newGameButtonClickHandler() {

  }
}

/* When page DOM is fully loaded, create an instance of the HangmanUI class */
window.onload = () => {
  let hangmanUI = new HangmanUI();
}