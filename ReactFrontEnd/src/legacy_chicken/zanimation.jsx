import { easeOutBounce, easeOutCirc } from "./easings";

export class ZAnimation {
  duration;
  frame = 0;
  force;
  running = false;
  easing = "easeOutCirc";
  easeAcc = 0;
  onEnd;
  apply;

  constructor(options) {
    this.duration = options.duration;
    this.force = options.force;
    this.easing = options.easing;
    this.apply = options.apply;
    this.onEnd = options.onEnd;

    if (options.interval) {
      this.schedule(options.interval);
    }
  }

  schedule(interval) {
    setInterval(() => {
      this.running = true;
    }, interval);
  }

  start() {
    this.running = true;
  }

  stop() {
    this.running = false;
  }

  handleFrame() {
    if (!this.running) return;

    this.frame++;

    const value = this.calcEasedValue();
    this.apply(value);

    if (this.frame === this.duration) {
      this.frame = 0;
      this.easeAcc = 0;
      this.stop();
      this.onEnd && this.onEnd();
    }
  }

  calcEasedValue() {
    const progressDecimal = (this.frame * 100) / this.duration / 100;

    let easedVal = 0;

    switch (this.easing) {
      case "easeOutCirc":
        easedVal = easeOutCirc(progressDecimal);
        break;

      case "easeOutBounce":
        easedVal = easeOutBounce(progressDecimal);
        break;
    }

    const frameEase = easedVal - this.easeAcc;
    this.easeAcc += frameEase;

    return frameEase * this.force;
  }
}
