
/** Hangman board UI class */
class HangmanBoardUI {

  static #NUM_BODY_PARTS = 6;
  static #ANSWER_CHAR_HTML = "<span>1</span>";

  /* Board elements */
  #gallowsEl; /** "Gallows" canvas element */
  #answerEl;   /** "answer" element */
  #guessesEl; /** "guesses" element */
  #statusEl; /** "status" field */

  #theAnswer; /** the answer word (in UPPER case) */
  #guesses; /** all guesses as typed, case preserved */
  #answerUiHTML; /** HTML representing answer UI */

  #numPartsDrawn; /** number of hangman body parts drawn so far */

  constructor(hangmanEl) {
    let boardEl = hangmanEl.querySelector("#board");
    this.#gallowsEl = boardEl.querySelector("#gallows");
    this.#answerEl = boardEl.querySelector("#answer");
    this.#guessesEl = boardEl.querySelector("#guesses");
    this.#statusEl = boardEl.querySelector("#status");

    this.#guessesEl.addEventListener("input", (event) => this.inputHandler(event));
  }

  newGame(answer) {
    console.log("word=" + answer);
    this.#theAnswer = answer;

    this.#numPartsDrawn = 0; // init gallows state
    this.#guessesEl.value = ""; // init guesses input
    this.#statusEl.innerText = ""; // init status

    /* init answer UI */
    this.#answerEl.innerHTML = HangmanBoardUI.#ANSWER_CHAR_HTML.repeat(answer.length);
  }

  /**
   * Update Answer UI with new input (char)
   * @param {string} str // UPPER case
   */
  #updateAnswerUI(str) {
    console.log("update answer UI...");

  }

  #ignoreAndResetInput(inputEvent) {
    inputEvent.preventDefault();
    inputEvent.stopPropagation();
    inputEvent.stopImmediatePropagation();

    this.#guessesEl.value = this.#guesses; // restore value of input
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
    if ((this.#guesses != null) && this.#guesses.toUpperCase().includes(input.toUpperCase())) {
      // ignore if already guessed
      this.#ignoreAndResetInput(inputEvent);
      this.#statusEl.innerText = "You already guessed '" + input + "'";
      return;
    }
    // Text input is a unique guess
    console.log("typed: " + input);
    this.#guesses = (this.#guesses == null) ? input : this.#guesses + input;
    console.log("guesses=" + this.#guesses);
    if (this.#theAnswer.includes(input.toUpperCase())) {
      this.#updateAnswerUI(input);
    }
    else {
      // update gallows UI
      console.log("update gallows UI...");
    }
  }

}