
/** Hangman board UI class */
class HangmanGallowsUI {

  /* defines for drawing the gallows and hangman UI */
  /** actual canvas width/height, as specified inline (see hangman.html) */
  static #CANVAS_WIDTH = 240;
  static #CANVAS_HEIGHT = 240;
  static #MARGIN = 20;

  static #GALLOWS_X = HangmanGallowsUI.#MARGIN;
  static #GALLOWS_Y = HangmanGallowsUI.#MARGIN;
  static #GALLOWS_WIDTH = HangmanGallowsUI.#CANVAS_WIDTH - 60 - (2 * HangmanGallowsUI.#MARGIN);
  static #GALLOWS_HEIGHT = HangmanGallowsUI.#CANVAS_HEIGHT - (2 * HangmanGallowsUI.#MARGIN);
  static #BASE_X = HangmanGallowsUI.#GALLOWS_X;
  static #BASE_Y = HangmanGallowsUI.#GALLOWS_Y + HangmanGallowsUI.#GALLOWS_HEIGHT;
  static #BASE_WIDTH = 0.5 * HangmanGallowsUI.#GALLOWS_WIDTH; /** percent of canvas width */
  static #POST_X = HangmanGallowsUI.#BASE_X + (HangmanGallowsUI.#BASE_WIDTH / 2);
  static #POST_HEIGHT = HangmanGallowsUI.#GALLOWS_HEIGHT;
  static #BEAM_Y = HangmanGallowsUI.#BASE_Y - HangmanGallowsUI.#POST_HEIGHT;
  static #BEAM_WIDTH = 0.5 * HangmanGallowsUI.#GALLOWS_WIDTH; /** percent of canvas width */
  static #NOOSE_X = HangmanGallowsUI.#POST_X + HangmanGallowsUI.#BEAM_WIDTH;
  static #NOOSE_LTH = 0.1 * HangmanGallowsUI.#GALLOWS_HEIGHT; /** percent of canvas height */

  static #HEAD_RADIUS = 0.15 * HangmanGallowsUI.#GALLOWS_WIDTH; /** percent of canvas width */
  static #HEAD_X = HangmanGallowsUI.#NOOSE_X;
  static #HEAD_Y = HangmanGallowsUI.#BEAM_Y + HangmanGallowsUI.#NOOSE_LTH + HangmanGallowsUI.#HEAD_RADIUS;
  static #EYE_RADIUS = 3;
  static #SMILE_RADIUS = (2 * HangmanGallowsUI.#HEAD_RADIUS) / 3;
  static #POUT_RADIUS = HangmanGallowsUI.#HEAD_RADIUS / 2;

  static #BODY_LTH = 0.3 * HangmanGallowsUI.#GALLOWS_HEIGHT; /** percent of canvas height */
  static #BODY_X = HangmanGallowsUI.#NOOSE_X;
  static #BODY_Y = HangmanGallowsUI.#HEAD_Y + HangmanGallowsUI.#HEAD_RADIUS;
  static #NECK_LTH = 0.3 * HangmanGallowsUI.#BODY_LTH; /** percent of body length */
  static #LIMB_LTH = 0.2 * HangmanGallowsUI.#GALLOWS_WIDTH; /** percent of canvas width */
  static #ARM_X = HangmanGallowsUI.#NOOSE_X;
  static #ARM_Y = HangmanGallowsUI.#HEAD_Y + HangmanGallowsUI.#HEAD_RADIUS + HangmanGallowsUI.#NECK_LTH;
  static #LEG_X = HangmanGallowsUI.#NOOSE_X;
  static #LEG_Y = HangmanGallowsUI.#BODY_Y + HangmanGallowsUI.#BODY_LTH;

  #gallowsDrawMethods;
  #canvasCtx;
  #numPartsDrawn; /** number of hangman body parts drawn so far */

  constructor(hangmanEl) {
    let gallowsEl = hangmanEl.querySelector("#gallows");
    this.#canvasCtx = gallowsEl.getContext("2d");

    this.#gallowsDrawMethods = [
      this.#drawHead, this.#drawBody,
      this.#drawLeftArm, this.#drawRightArm,
      this.#drawLeftLeg, this.#drawRightLeg
    ];
  }

  newGame() {
    this.#canvasCtx.reset();
    this.#drawGallows();
    this.#numPartsDrawn = 0; // init hangman drawing state
  }

  endGame(win) {
    // re-draw gallows
    this.#drawGallows();

    if (win) {
      // transform context so hangman is drawn away from gallows
      this.#canvasCtx.translate(
        HangmanGallowsUI.#CANVAS_WIDTH - HangmanGallowsUI.#GALLOWS_WIDTH - HangmanGallowsUI.#MARGIN,
        HangmanGallowsUI.#CANVAS_HEIGHT - HangmanGallowsUI.#GALLOWS_HEIGHT);
    }
    // draw hangman
    this.#canvasCtx.lineWidth = 3;
    this.#canvasCtx.strokeStyle = "darkgrey";
    this.#canvasCtx.beginPath();
    for (const drawMethod of this.#gallowsDrawMethods) {
      drawMethod(this.#canvasCtx, win);
    }
    this.#drawFace(win);
    this.#canvasCtx.stroke();
  }

  #drawGallows() {
    this.#canvasCtx.clearRect(0, 0, HangmanGallowsUI.#CANVAS_WIDTH, HangmanGallowsUI.#CANVAS_HEIGHT);

    this.#canvasCtx.save();
    this.#canvasCtx.lineWidth = 3;
    this.#canvasCtx.strokeStyle = "black";
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
    this.#canvasCtx.restore();
  }

  drawNext() {
    this.#canvasCtx.save();
    this.#canvasCtx.lineWidth = 3;
    this.#canvasCtx.strokeStyle = "darkgrey";
    this.#canvasCtx.beginPath();
    this.#gallowsDrawMethods[this.#numPartsDrawn++](this.#canvasCtx);
    this.#canvasCtx.stroke();
    this.#canvasCtx.restore();

    return (this.#numPartsDrawn == this.#gallowsDrawMethods.length);
  }

  #drawHead(ctx) {
    ctx.moveTo(HangmanGallowsUI.#HEAD_X + HangmanGallowsUI.#HEAD_RADIUS, HangmanGallowsUI.#HEAD_Y);
    ctx.arc(HangmanGallowsUI.#HEAD_X, HangmanGallowsUI.#HEAD_Y,
      HangmanGallowsUI.#HEAD_RADIUS, 0, 2 * Math.PI);
  }

  #drawBody(ctx) {
    ctx.moveTo(HangmanGallowsUI.#BODY_X, HangmanGallowsUI.#BODY_Y);
    ctx.lineTo(HangmanGallowsUI.#BODY_X, HangmanGallowsUI.#BODY_Y + HangmanGallowsUI.#BODY_LTH);
  }

  #drawLeftArm(ctx, win) {
    ctx.moveTo(HangmanGallowsUI.#ARM_X, HangmanGallowsUI.#ARM_Y);
    if ((win == undefined) || (win == null)) {
      // arm flat (no win/loss, game in progress)
      ctx.lineTo(HangmanGallowsUI.#ARM_X - HangmanGallowsUI.#LIMB_LTH,
        HangmanGallowsUI.#ARM_Y);
    }
    else if (win) {
      // win: arm UP
      ctx.lineTo(HangmanGallowsUI.#ARM_X - HangmanGallowsUI.#LIMB_LTH,
        HangmanGallowsUI.#ARM_Y - HangmanGallowsUI.#LIMB_LTH);
    }
    else {
      // lose: arm DOWN
      ctx.lineTo(HangmanGallowsUI.#ARM_X - HangmanGallowsUI.#LIMB_LTH,
        HangmanGallowsUI.#ARM_Y + HangmanGallowsUI.#LIMB_LTH);
    }
  }

  #drawRightArm(ctx, win) {
    ctx.moveTo(HangmanGallowsUI.#ARM_X, HangmanGallowsUI.#ARM_Y);
    if ((win == undefined) || (win == null)) {
      // arm flat (no win/loss, game in progress)
      ctx.lineTo(HangmanGallowsUI.#ARM_X + HangmanGallowsUI.#LIMB_LTH,
        HangmanGallowsUI.#ARM_Y);
    }
    else if (win) {
      // win: arm UP
      ctx.lineTo(HangmanGallowsUI.#ARM_X + HangmanGallowsUI.#LIMB_LTH,
        HangmanGallowsUI.#ARM_Y - HangmanGallowsUI.#LIMB_LTH);
    }
    else {
      // lose: arm DOWN
      ctx.lineTo(HangmanGallowsUI.#ARM_X + HangmanGallowsUI.#LIMB_LTH,
        HangmanGallowsUI.#ARM_Y + HangmanGallowsUI.#LIMB_LTH);
    }
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

  #drawFace(win) {
    // draw left eye
    this.#canvasCtx.moveTo(HangmanGallowsUI.#HEAD_X - (HangmanGallowsUI.#HEAD_RADIUS / 3),
      HangmanGallowsUI.#HEAD_Y - (HangmanGallowsUI.#HEAD_RADIUS / 3));
    this.#canvasCtx.arc(HangmanGallowsUI.#HEAD_X - (HangmanGallowsUI.#HEAD_RADIUS / 3) - HangmanGallowsUI.#EYE_RADIUS,
      HangmanGallowsUI.#HEAD_Y - (HangmanGallowsUI.#HEAD_RADIUS / 3),
      HangmanGallowsUI.#EYE_RADIUS, 0, 2 * Math.PI, true);
    // draw right eye
    this.#canvasCtx.moveTo(HangmanGallowsUI.#HEAD_X + (HangmanGallowsUI.#HEAD_RADIUS / 3) + (2 * HangmanGallowsUI.#EYE_RADIUS),
      HangmanGallowsUI.#HEAD_Y - (HangmanGallowsUI.#HEAD_RADIUS / 3));
    this.#canvasCtx.arc(HangmanGallowsUI.#HEAD_X + (HangmanGallowsUI.#HEAD_RADIUS / 3) + HangmanGallowsUI.#EYE_RADIUS,
      HangmanGallowsUI.#HEAD_Y - (HangmanGallowsUI.#HEAD_RADIUS / 3),
      HangmanGallowsUI.#EYE_RADIUS, 0, 2 * Math.PI, true);
    // draw smile (win == true) or pout (win == false)
    if (win) {
      this.#canvasCtx.moveTo(HangmanGallowsUI.#HEAD_X + HangmanGallowsUI.#SMILE_RADIUS, HangmanGallowsUI.#HEAD_Y);
      this.#canvasCtx.arc(HangmanGallowsUI.#HEAD_X, HangmanGallowsUI.#HEAD_Y,
        HangmanGallowsUI.#SMILE_RADIUS, 0, Math.PI);
    }
    else {
      this.#canvasCtx.moveTo(HangmanGallowsUI.#HEAD_X + HangmanGallowsUI.#POUT_RADIUS,
        HangmanGallowsUI.#HEAD_Y + HangmanGallowsUI.#POUT_RADIUS);
      this.#canvasCtx.arc(HangmanGallowsUI.#HEAD_X, HangmanGallowsUI.#HEAD_Y + HangmanGallowsUI.#SMILE_RADIUS,
        HangmanGallowsUI.#POUT_RADIUS, 0, Math.PI, true);
    }
  }
}
