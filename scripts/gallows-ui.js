
/** Hangman board UI class */
class HangmanGallowsUI {

  /* defines for drawing the gallows and hangman UI */
  static #NUM_BODY_PARTS = 6;

  static #GALLOWS_WIDTH = 160; // set inline (see hangman.html)
  static #GALLOWS_HEIGHT = 240; // set inline (see hangman.html)
  static #BASE_WIDTH = 0.5 * HangmanGallowsUI.#GALLOWS_WIDTH; /** percent of canvas width */  
  static #BASE_X = 4;
  static #BASE_Y = HangmanGallowsUI.#GALLOWS_HEIGHT - 4;
  static #POST_HEIGHT = 0.8 * HangmanGallowsUI.#GALLOWS_HEIGHT; /** percent of canvas height */
  static #POST_X = HangmanGallowsUI.#BASE_X + (HangmanGallowsUI.#BASE_WIDTH / 2);
  static #BEAM_WIDTH = 0.5 * HangmanGallowsUI.#GALLOWS_WIDTH; /** percent of canvas width */
  static #BEAM_Y = HangmanGallowsUI.#BASE_Y - HangmanGallowsUI.#POST_HEIGHT;
  static #NOOSE_LTH = 0.1 * HangmanGallowsUI.#GALLOWS_HEIGHT; /** percent of canvas height */
  static #NOOSE_X = HangmanGallowsUI.#POST_X + HangmanGallowsUI.#BEAM_WIDTH;

  static #HEAD_SIZE = 0.2 * HangmanGallowsUI.#GALLOWS_WIDTH; /** percent of canvas width */
  static #HEAD_X = HangmanGallowsUI.#NOOSE_X;
  static #HEAD_Y = HangmanGallowsUI.#BEAM_Y + HangmanGallowsUI.#NOOSE_LTH + (HangmanGallowsUI.#HEAD_SIZE / 2);

  static #BODY_LTH = 0.4 * HangmanGallowsUI.#GALLOWS_HEIGHT; /** percent of canvas height */
  static #BODY_X = HangmanGallowsUI.#NOOSE_X;
  static #BODY_Y = HangmanGallowsUI.#HEAD_Y + (HangmanGallowsUI.#HEAD_SIZE / 2);

  static #NECK_LTH = 0.3 * HangmanGallowsUI.#BODY_LTH; /** percent of body length */  
  static #LIMB_LTH = 0.2 * HangmanGallowsUI.#GALLOWS_WIDTH; /** percent of canvas width */
  static #ARM_X = HangmanGallowsUI.#NOOSE_X;
  static #ARM_Y = HangmanGallowsUI.#HEAD_Y + (HangmanGallowsUI.#HEAD_SIZE / 2) + HangmanGallowsUI.#NECK_LTH;
  static #LEG_X = HangmanGallowsUI.#NOOSE_X;
  static #LEG_Y = HangmanGallowsUI.#BODY_Y + HangmanGallowsUI.#BODY_LTH;

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
    this.#canvasCtx.moveTo(HangmanGallowsUI.#BASE_X, HangmanGallowsUI.#BASE_Y);
    this.#canvasCtx.lineTo(HangmanGallowsUI.#BASE_X + HangmanGallowsUI.#BASE_WIDTH, HangmanGallowsUI.#BASE_Y);
    /* draw post */
    this.#canvasCtx.moveTo(HangmanGallowsUI.#POST_X, HangmanGallowsUI.#BASE_Y);
    this.#canvasCtx.lineTo(HangmanGallowsUI.#POST_X, HangmanGallowsUI.#BASE_Y - HangmanGallowsUI.#POST_HEIGHT);
    /* draw beam */
    this.#canvasCtx.lineTo(HangmanGallowsUI.#POST_X + HangmanGallowsUI.#BEAM_WIDTH, HangmanGallowsUI.#BEAM_Y);
    /* draw noose */
    this.#canvasCtx.lineTo(HangmanGallowsUI.#NOOSE_X, HangmanGallowsUI.#BEAM_Y + HangmanGallowsUI.#NOOSE_LTH);

    this.#canvasCtx.stroke();
  }

  drawNext() {
    this.#canvasCtx.beginPath();
    this.#gallowsDrawMethods[this.#numPartsDrawn++](this.#canvasCtx);
    this.#canvasCtx.stroke();
    return (this.#numPartsDrawn == HangmanGallowsUI.#NUM_BODY_PARTS);
  }

  #drawHead(ctx) {
    ctx.arc(HangmanGallowsUI.#HEAD_X, HangmanGallowsUI.#HEAD_Y, HangmanGallowsUI.#HEAD_SIZE / 2, 0, 2 * Math.PI);
  }

  #drawBody(ctx) {
    ctx.moveTo(HangmanGallowsUI.#BODY_X, HangmanGallowsUI.#BODY_Y);
    ctx.lineTo(HangmanGallowsUI.#BODY_X, HangmanGallowsUI.#BODY_Y + HangmanGallowsUI.#BODY_LTH);
  }

  #drawLeftArm(ctx) {
    ctx.moveTo(HangmanGallowsUI.#ARM_X, HangmanGallowsUI.#ARM_Y);
    ctx.lineTo(HangmanGallowsUI.#ARM_X - HangmanGallowsUI.#LIMB_LTH,
        HangmanGallowsUI.#ARM_Y + HangmanGallowsUI.#LIMB_LTH);
  }

  #drawRightArm(ctx) {
    ctx.moveTo(HangmanGallowsUI.#ARM_X, HangmanGallowsUI.#ARM_Y);
    ctx.lineTo(HangmanGallowsUI.#ARM_X + HangmanGallowsUI.#LIMB_LTH,
        HangmanGallowsUI.#ARM_Y + HangmanGallowsUI.#LIMB_LTH);
  }

  #drawLeftLeg(ctx) {
    ctx.moveTo(HangmanGallowsUI.#LEG_X, HangmanGallowsUI.#LEG_Y);
    ctx.lineTo(HangmanGallowsUI.#LEG_X - HangmanGallowsUI.#LIMB_LTH,
        HangmanGallowsUI.#LEG_Y + HangmanGallowsUI.#LIMB_LTH);
  }

  #drawRightLeg(ctx) {
    ctx.moveTo(HangmanGallowsUI.#LEG_X, HangmanGallowsUI.#LEG_Y);
    ctx.lineTo(HangmanGallowsUI.#LEG_X + HangmanGallowsUI.#LIMB_LTH,
        HangmanGallowsUI.#LEG_Y + HangmanGallowsUI.#LIMB_LTH);
  }

}