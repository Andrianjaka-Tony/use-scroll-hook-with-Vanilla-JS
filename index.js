import useScroll from "./use-scroll.js";

const container = document.querySelector(".container");
useScroll(container, ["0 0", "0.9 0"], (scroll) => {
  const progress = document.querySelector(".progress");
  progress.style.transform = `scaleX(${scroll})`;
});
