/**
 * Hangman game UI
 */

class HangmanUI {
  static #WORD_URL = "https://random-word-api.herokuapp.com/word";

  #hangman; /** Hangman game obj */
  #gallowsUI; /** Gallows UI class */
  #answerEl;   /** "answer" element */
  #guessesEl; /** "guesses" element */
  #statusEl; /** "status" field */

  #newGameButton; /** New Game button */

  #theAnswer;
  #guesses;

  /** Constructor
   * Note: this is called after page DOM is fully loaded
   */
  constructor() {
    this.#hangman = new Hangman();
    this.#gallowsUI = new GallowsUI();

    this.#answerEl = document.querySelector("div#hangman #answers");
    this.#statusEl = document.querySelector("div#hangman #status");
    this.#guessesEl = document.querySelector("div#hangman #guesses");
    this.#guessesEl.addEventListener("input", (event) => this.inputHandler(event));

    this.#newGameButton = document.querySelector("div#hangman #newGameButton");
    this.#newGameButton.onclick = () => this.newGameButtonClickHandler();

    this.#newGame();
  }

  #newGame() {
    this.#guesses = null;
    this.#gallowsUI.newGame();

    const response = fetch(HangmanUI.#WORD_URL)
      .then(response => response.json())
      .then(data => {
        this.#theAnswer = data[0];
        // return this.#theAnswer;
      });
  }

  #ignoreAndResetInput(inputEvent) {
    inputEvent.preventDefault();
    inputEvent.stopPropagation();
    inputEvent.stopImmediatePropagation();

    if (this.#guesses != null) {
      this.#guessesEl.value = this.#guesses; // restore value of input
    }
  }

  inputHandler(inputEvent) {
    this.#statusEl.innerText = "";

    let input = inputEvent.data
    if ((inputEvent.inputType != "insertText") || (input == null) || /[^a-z]/i.test(input)) {
      // ignore if not alpha text input
      this.#ignoreAndResetInput(inputEvent);
      this.#statusEl.innerText = "Invalid input";
      return;
    }
    input = input.toLowerCase();
    if ((this.#guesses != null) && this.#guesses.includes(input)) {
      // ignore if already guessed
      this.#ignoreAndResetInput(inputEvent);
      this.#statusEl.innerText = "You already guessed '" + input + "'";
      return;
    }
    // Text input is a unique guess
    console.log("typed: " + input);
    this.#guesses = (this.#guesses == null) ? input : this.#guesses + input;
    console.log("guesses=" + this.#guesses);
    if (this.#theAnswer.includes(input)) {
      // update answer UI
      console.log("update answer UI...");
    }
    else {
      // update gallows UI
      console.log("update gallows UI...");
    }
  }

  newGameButtonClickHandler() {

  }
}

/* When page DOM is fully loaded, create an instance of the HangmanUI class */
window.onload = () => {
  let hangmanUI = new HangmanUI();
}