
/** Hangman board UI class */
class HangmanBoardUI {

  /* defines for the gallows UI */
  static #NUM_BODY_PARTS = 6;
  static #BEAM_LTH = 20;
  static #POST_HEIGHT = 40;
  static #BASE_LTH = 16;
  static #NOOSE_LTH = 8;

  /* Defines for the answer UI */
  static #ANSWER_CHAR_HTML = "<span></span>";
  static #BLANK = "*";

  /* Board elements */
  #gallowsEl; /** "gallows" canvas element */
  #answerEl;   /** "answer" element */
  #guessesEl; /** "guesses" element */
  #statusEl; /** "status" field */

  #gallowsDrawMethods;
  #canvasCtx;

  #theAnswer; /** the answer word (in LOWER case) */
  #answerTemplate; /** string that maps to answer UI word  */
  #guesses; /** all guesses as typed, case preserved */

  #numPartsDrawn; /** number of hangman body parts drawn so far */

  constructor(hangmanEl) {
    let boardEl = hangmanEl.querySelector("#board");
    this.#gallowsEl = boardEl.querySelector("#gallows");
    this.#answerEl = boardEl.querySelector("#answer");
    this.#guessesEl = boardEl.querySelector("#guesses");
    this.#statusEl = boardEl.querySelector("#status");

    this.#guessesEl.addEventListener("input", (event) => this.inputHandler(event));

    this.#gallowsDrawMethods = [
      this.#drawHead, this.#drawBody,
      this.#drawLeftArm, this.#drawRightArm,
      this.#drawLeftLeg, this.#drawRightLeg
    ];
    this.#canvasCtx = this.#gallowsEl.getContext("2d");
  }

  newGame(answer) {
    this.#theAnswer = answer;

    this.#numPartsDrawn = 0; // init gallows state
    this.#drawGallows();

    this.#guessesEl.value = ""; // init guesses input/display
    this.#guesses = ""; // init accumukated guesses
    this.#statusEl.innerText = ""; // init status
    /* init answer UI */
    this.#answerEl.innerHTML = HangmanBoardUI.#ANSWER_CHAR_HTML.repeat(answer.length);
    // init answer template
    this.#answerTemplate = HangmanBoardUI.#BLANK.repeat(answer.length);
  }

  #drawGallows() {
    const width = this.#canvasCtx.canvas.width;
    const height = this.#canvasCtx.canvas.height;

    this.#canvasCtx.clearRect(0, 0, width, height);

    this.#canvasCtx.beginPath();
    /* draw base */
    this.#canvasCtx.moveTo(0, height);
    this.#canvasCtx.lineTo(HangmanBoardUI.#BASE_LTH, height);
    /* draw post */
    this.#canvasCtx.moveTo(HangmanBoardUI.#BASE_LTH / 2, height);
    this.#canvasCtx.lineTo(HangmanBoardUI.#BASE_LTH / 2,
    height - HangmanBoardUI.#POST_HEIGHT);
    /* draw beam */
    // this.#canvasCtx.moveTo(HangmanBoardUI.#BASE_LTH / 2, height - HangmanBoardUI.#POST_HEIGHT);
    this.#canvasCtx.lineTo(HangmanBoardUI.#BASE_LTH / 2 + HangmanBoardUI.#BEAM_LTH,
      height - HangmanBoardUI.#POST_HEIGHT);
    /* draw noose */
    this.#canvasCtx.lineTo(HangmanBoardUI.#BASE_LTH / 2 + HangmanBoardUI.#BEAM_LTH,
      height - HangmanBoardUI.#POST_HEIGHT + HangmanBoardUI.#NOOSE_LTH);
    this.#canvasCtx.stroke();
  }

  #drawHead() {

  }

  #drawBody() {

  }

  #drawLeftArm() {

  }

  #drawRightArm() {

  }

  #drawLeftLeg() {

  }

  #drawRightLeg() {

  }

  /**
   * Update Answer UI with new input (char)
   * @param {string} char // LOWER case
   */
  #updateAnswerUI(char) {
    /* Update answer template string with char in answer*/
    for (let indx = 0; indx < this.#theAnswer.length; indx++) {
      if (this.#theAnswer[indx] == char[0]) {
        this.#answerTemplate = this.#answerTemplate.substring(0, indx).concat(char, this.#answerTemplate.substring(indx + 1));
      }
    }

    /* Update answer UI elements using answer template */
    let children = this.#answerEl.children;
    for (let indx = 0; indx < this.#answerTemplate.length; indx++) {
      if (this.#answerTemplate[indx] != HangmanBoardUI.#BLANK) {
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
    console.log("typed: " + input);
    this.#guesses += input;
    console.log("guesses=" + this.#guesses);
    input = input.toLowerCase();
    if (this.#theAnswer.includes(input)) {
      this.#updateAnswerUI(input);
    }
    else {
      // update gallows UI
      console.log("update gallows UI...");
    }
  }

}