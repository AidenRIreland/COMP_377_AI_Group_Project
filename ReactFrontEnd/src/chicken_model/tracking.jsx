
import { model } from "./chicken";
import { rotation } from "./constants";
import { bounceUp } from ".";

export function addPointerListen() {
  function calcMotion(window, pos, threshhold) {
    const mid = window / 2;
    const diff = mid - pos;
    const dir = diff > 0 ? 1 : -1;
    const absDiff = Math.abs(diff);

    if (absDiff > threshhold) {
      return null;
    }

    return ((absDiff * 5) / 100) * dir;
  }

  document.addEventListener("mousemove", (evt) => {
    const xMotion = calcMotion(window.innerWidth, evt.clientX, 340);
    const yMotion = calcMotion(window.innerHeight, evt.clientY, 300);

    if (xMotion !== null)
      model.rotate.y = rotation.initialY + xMotion * rotation.xStep;
    if (yMotion !== null)
      model.rotate.x = rotation.initialX + yMotion * rotation.yStep;
  });

  document.addEventListener("keydown", (evt) => {
    if (evt.code === "Space") {
      bounceUp.start();
    }
  });

  document.addEventListener("click", () => {
    bounceUp.start();
  });
}
