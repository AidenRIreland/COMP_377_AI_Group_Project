import Zdog from "zdog";
import {
  red,
  yellow,
  white,
  black,
  darkGrey,
  sceneSize,
  crestData,
  rotation,
} from "./constants";

export let model = new Zdog.Illustration({
  element: ".zdog-canvas",
  resize: true,
  rotate: { x: rotation.initialX, y: rotation.initialY },
  onResize: function (width, height) {
    this.zoom = Math.floor(Math.min(width, height) / (sceneSize / 2.5));{/*Change chicek size on screen*/}
  },
});

let crestGroup = new Zdog.Group({
  addTo: model,
});

crestData.forEach((item) => {
  new Zdog.Shape({
    addTo: crestGroup,
    stroke: 4.5,
    color: red,
    ...item,
  });
});

let bodyGroup = new Zdog.Group({
  addTo: model,
});

new Zdog.Hemisphere({
  stroke: 6,
  diameter: 15,
  addTo: bodyGroup,
  color: white,
  rotate: { x: Zdog.TAU / 4 },
});

new Zdog.Cylinder({
  stroke: 6,
  diameter: 15,
  length: 14,
  addTo: bodyGroup,
  color: white,
  frontFace: white,
  backface: white,
  rotate: { x: Zdog.TAU / 4, z: Zdog.TAU },
  translate: { y: 8 },
});

new Zdog.Cone({
  addTo: model,
  diameter: 4,
  length: 5.5,
  stroke: 2,
  color: yellow,
  backface: yellow,
  rotate: { y: -Zdog.TAU / 4 },
  translate: { x: 11, y: 4 },
});

let eyesGroup = new Zdog.Group({
  addTo: model,
});

let eye1 = new Zdog.Shape({
  addTo: eyesGroup,
  stroke: 1.5,
  color: darkGrey,
  translate: { x: 8, y: -1, z: 3 },
});

eye1.copy({
  translate: { x: 8, y: -1, z: -3 },
});

export let eyelid = new Zdog.Shape({
  addTo: eyesGroup,
  path: [
    { x: 8, y: -3, z: -3.4 },
    { x: 8, y: -3, z: 3.4 },
  ],
  stroke: 2,
  color: white,
});

new Zdog.Shape({
  addTo: model,
  stroke: 3.2,
  path: [
    { x: 11, y: 9 },
    { x: 11, y: 11 },
  ],
  color: red,
});
