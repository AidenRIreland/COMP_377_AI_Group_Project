
export class ZAnimationSimple {
  duration;
  frame = 0;
  force;
  running = false;
  onEnd;
  apply;

  constructor(options) {
    this.duration = options.duration;
    this.force = options.force;
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

    this.apply(this.force);

    if (this.frame === this.duration) {
      this.frame = 0;
      this.stop();
      this.onEnd && this.onEnd();
    }
  }
}
