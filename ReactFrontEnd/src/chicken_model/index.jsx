import { model, eyelid } from "./chicken";
import { ZAnimationSimple } from "./zanimation-simple";
import { ZAnimation } from "./zanimation";
import { addPointerListen } from "./tracking";

const blinkUpSimple = new ZAnimationSimple({
  duration: 18,
  force: 0.1,
  apply: (val) => {
    eyelid.translate.y -= val;
  }
});

const blinkDownSimple = new ZAnimationSimple({
  duration: 18,
  force: 0.1,
  interval: 4000,
  apply: (val) => {
    eyelid.translate.y += val;
  },
  onEnd: () => {
    blinkUpSimple.start();
  }
});

const bounceDown = new ZAnimation({
  duration: 32,
  force: 6.8,
  easing: "easeOutBounce",
  apply: (val) => {
    model.translate.y += val;
  }
});

export const bounceUp = new ZAnimation({
  duration: 32,
  force: 6.8,
  easing: "easeOutCirc",
  onEnd: () => bounceDown.start(),
  apply: (val) => {
    model.translate.y -= val;
  }
});

function animate() {
  model.updateRenderGraph();

  blinkDownSimple.handleFrame();
  blinkUpSimple.handleFrame();
  bounceUp.handleFrame();
  bounceDown.handleFrame();

  requestAnimationFrame(animate);
}

animate();
addPointerListen();

document.addEventListener("click", () => {
  bounceUp.start();
});
