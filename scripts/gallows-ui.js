
/** Hangman board UI class */
class HangmanGallowsUI {

  /* defines for the gallows UI */
  static #GALLOWS_WIDTH = 120;
  static #GALLOWS_HEIGHT = 180;
  static #BASE_WIDTH = 0.5 * HangmanGallowsUI.#GALLOWS_WIDTH; /** percent of canvas width */
  static #BEAM_WIDTH = 0.5 * HangmanGallowsUI.#GALLOWS_WIDTH; /** percent of canvas width */
  static #POST_HEIGHT = 0.8 * HangmanGallowsUI.#GALLOWS_HEIGHT; /** percent of canvas height */
  static #NOOSE_LTH = 0.1 * HangmanGallowsUI.#GALLOWS_HEIGHT; /** percent of canvas height */
  static #NUM_BODY_PARTS = 6;

  #gallowsDrawMethods;
  #canvasCtx;
  #numPartsDrawn; /** number of hangman body parts drawn so far */

  constructor(hangmanEl) {
    let gallowsEl = hangmanEl.querySelector("#gallows");
    this.#canvasCtx = gallowsEl.getContext("2d");
    this.#canvasCtx.lineWidth = 3;
    this.#canvasCtx.strokeStyle = "black";

    this.#gallowsDrawMethods = [
      this.#drawHead, this.#drawBody,
      this.#drawLeftArm, this.#drawRightArm,
      this.#drawLeftLeg, this.#drawRightLeg
    ];
  }

  newGame() {
    this.#numPartsDrawn = 0; // init gallows state
    this.#drawGallows();
  }

  #drawGallows() {
    this.#canvasCtx.clearRect(0, 0, HangmanGallowsUI.#GALLOWS_WIDTH, HangmanGallowsUI.#GALLOWS_HEIGHT);

    this.#canvasCtx.beginPath();

    /* draw base */
    const baseX = HangmanGallowsUI.#GALLOWS_WIDTH / 3;
    const baseY = HangmanGallowsUI.#GALLOWS_HEIGHT - 4;
    this.#canvasCtx.moveTo(baseX, baseY);
    this.#canvasCtx.lineTo(baseX + HangmanGallowsUI.#BASE_WIDTH, baseY);
    /* draw post */
    const postX = baseX + (HangmanGallowsUI.#BASE_WIDTH / 2);
    this.#canvasCtx.moveTo(postX, baseY);
    this.#canvasCtx.lineTo(postX, baseY - HangmanGallowsUI.#POST_HEIGHT);
    /* draw beam */
    const beamY = baseY - HangmanGallowsUI.#POST_HEIGHT;
    this.#canvasCtx.lineTo(postX + HangmanGallowsUI.#BEAM_WIDTH, beamY);
    /* draw noose */
    const nooseX = postX + HangmanGallowsUI.#BEAM_WIDTH;
    this.#canvasCtx.lineTo(nooseX, beamY + HangmanGallowsUI.#NOOSE_LTH);

    this.#canvasCtx.stroke();
  }

  drawNext() {
    console.log("update gallows UI...");
    this.#gallowsDrawMethods[this.#numPartsDrawn++]();
    return (this.#numPartsDrawn == HangmanGallowsUI.#NUM_BODY_PARTS);
  }

  #drawHead() {
    console.log("draw head");
  }

  #drawBody() {
    console.log("draw body");

  }

  #drawLeftArm() {
    console.log("draw left arm");

  }

  #drawRightArm() {
    console.log("draw right arm");

  }

  #drawLeftLeg() {
    console.log("draw left leg");

  }

  #drawRightLeg() {
    console.log("draw right leg");

  }

}