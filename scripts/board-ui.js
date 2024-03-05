
/** Hangman board UI class */
class HangmanBoardUI {

  /* defines for the gallows UI */
  static #GALLOWS_WIDTH = 120;
  static #GALLOWS_HEIGHT = 180;
  static #NUM_BODY_PARTS = 6;
  static #BASE_WIDTH = 0.5 * HangmanBoardUI.#GALLOWS_WIDTH; /** percent of canvas width */
  static #BEAM_WIDTH = 0.5 * HangmanBoardUI.#GALLOWS_WIDTH; /** percent of canvas width */
  static #POST_HEIGHT = 0.8 * HangmanBoardUI.#GALLOWS_HEIGHT; /** percent of canvas height */
  static #NOOSE_LTH = 0.1 * HangmanBoardUI.#GALLOWS_HEIGHT; /** percent of canvas height */

  /* Defines for the answer UI */
  static #ANSWER_CHAR_HTML = "<span>&nbsp</span>";
  static #BLANK = "*";

  /* Board elements */
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
    this.#answerEl = hangmanEl.querySelector("#answer");
    this.#guessesEl = hangmanEl.querySelector("#guesses");
    this.#statusEl = hangmanEl.querySelector("#status");

    this.#guessesEl.addEventListener("input", (event) => this.inputHandler(event));

    let gallowsEl = hangmanEl.querySelector("#gallows");
    // gallowsEl.width = HangmanBoardUI.#GALLOWS_WIDTH;
    // gallowsEl.height = HangmanBoardUI.#GALLOWS_HEIGHT;
    this.#canvasCtx = gallowsEl.getContext("2d");
    this.#canvasCtx.lineWidth = 3;
    this.#canvasCtx.strokeStyle = "black";

    this.#gallowsDrawMethods = [
      this.#drawHead, this.#drawBody,
      this.#drawLeftArm, this.#drawRightArm,
      this.#drawLeftLeg, this.#drawRightLeg
    ];
  }

  newGame(answer) {
    this.#theAnswer = answer;

    this.#numPartsDrawn = 0; // init gallows state
    this.#drawGallows();

    this.#guessesEl.value = ""; // init guesses input/display
    this.#guesses = ""; // init accumulated guesses
    this.#statusEl.innerText = ""; // init status
    /* init answer UI */
    this.#answerEl.innerHTML = HangmanBoardUI.#ANSWER_CHAR_HTML.repeat(answer.length);
    // init answer template
    this.#answerTemplate = HangmanBoardUI.#BLANK.repeat(answer.length);
  }

  #drawGallows() {
    this.#canvasCtx.clearRect(0, 0, HangmanBoardUI.#GALLOWS_WIDTH, HangmanBoardUI.#GALLOWS_HEIGHT);

    this.#canvasCtx.beginPath();

    /* draw base */
    const baseX = HangmanBoardUI.#GALLOWS_WIDTH / 3;
    const baseY = HangmanBoardUI.#GALLOWS_HEIGHT - 4;
    this.#canvasCtx.moveTo(baseX, baseY);
    this.#canvasCtx.lineTo(baseX + HangmanBoardUI.#BASE_WIDTH, baseY);
    /* draw post */
    const postX = baseX / 2;
    this.#canvasCtx.moveTo(postX, baseY);
    this.#canvasCtx.lineTo(postX, baseY - HangmanBoardUI.#POST_HEIGHT);
    /* draw beam */
    const beamY = baseY - HangmanBoardUI.#POST_HEIGHT;
    this.#canvasCtx.lineTo(postX + HangmanBoardUI.#BEAM_WIDTH, beamY);
    /* draw noose */
    const nooseX = postX + HangmanBoardUI.#BEAM_WIDTH;
    this.#canvasCtx.lineTo(nooseX, beamY + HangmanBoardUI.#NOOSE_LTH);

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
    this.#guesses += input;
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