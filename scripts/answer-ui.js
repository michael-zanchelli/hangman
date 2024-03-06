
/** Hangman board UI class */
class HangmanAnswerUI {
  /* Defines */
  static #ANSWER_CHAR_HTML = "<span>&nbsp</span>";
  static #BLANK = "*";

  /* Elements */
  #answerEl;   /** "answer" element */
  #guessesEl; /** "guesses" element */
  #statusEl; /** "status" field */

  #theAnswer; /** the answer word (in LOWER case) */
  #answerTemplate; /** string that maps to answer UI word  */
  #guesses; /** all guesses as typed, case preserved */

  #gallowsUI;

  constructor(hangmanEl) {
    this.#gallowsUI = new HangmanGallowsUI(hangmanEl);

    this.#answerEl = hangmanEl.querySelector("#answer");
    this.#guessesEl = hangmanEl.querySelector("#guesses");
    this.#statusEl = hangmanEl.querySelector("#status");

    this.#guessesEl.addEventListener("input", (event) => this.inputHandler(event));
  }

  newGame(answer) {
    this.#gallowsUI.newGame();

    this.#theAnswer = answer;
    this.#guessesEl.value = ""; // init guesses input/display
    this.#guessesEl.disabled = false; // enable input
    this.#guessesEl.readonly = false; // enable input
    this.#guesses = ""; // init accumulated guesses
    this.#statusEl.innerText = ""; // init status
    /* init answer UI */
    this.#answerEl.innerHTML = HangmanAnswerUI.#ANSWER_CHAR_HTML.repeat(answer.length);
    // init answer template
    this.#answerTemplate = HangmanAnswerUI.#BLANK.repeat(answer.length);
  }

  #endGame(win) {
    const str = win ? "YOU WIN" : "YOU LOSE"
    console.log(str);
    this.#guessesEl.disabled = true; // enable input
    this.#guessesEl.readonly = true; // enable input

    this.#gallowsUI.endGame(win);
  }

  /**
   * Update Answer UI with new input (char)
   * @param {string} char // LOWER case
   */
  #updateAnswerUI(char) {
    /* Update answer template string with char in answer */
    for (let indx = 0; indx < this.#theAnswer.length; indx++) {
      if (this.#theAnswer[indx] == char[0]) {
        this.#answerTemplate = this.#answerTemplate.substring(0, indx).concat(char, this.#answerTemplate.substring(indx + 1));
      }
    }

    /* Update answer UI elements using answer template */
    let children = this.#answerEl.children;
    for (let indx = 0; indx < this.#answerTemplate.length; indx++) {
      if (this.#answerTemplate[indx] != HangmanAnswerUI.#BLANK) {
        children[indx].innerText = this.#answerTemplate[indx];
      }
    }
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
    if ((this.#guesses != null) && this.#guesses.toLowerCase().includes(input.toLowerCase())) {
      // ignore if already guessed
      this.#ignoreAndResetInput(inputEvent);
      this.#statusEl.innerText = "You already guessed '" + input + "'";
      return;
    }
    // Text input is a unique guess
    this.#guesses += input;
    input = input.toLowerCase();
    if (this.#theAnswer.includes(input)) {
      // Update answer UI
      this.#updateAnswerUI(input);

      const win = !this.#answerTemplate.includes(HangmanAnswerUI.#BLANK);
      if (win) {
        setTimeout(() => { this.#endGame(true); }, 10);
      }
    }
    else {
      // update gallows UI
      const lose = this.#gallowsUI.drawNext();
      if (lose) {
        setTimeout(() => { this.#endGame(false); }, 10);
      }
    }
  }
}