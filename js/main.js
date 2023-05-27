const root = document.documentElement;
const header = document.querySelector("header");

const bgHeight = header.clientHeight;

root.style.setProperty("--bgHeight", `${bgHeight}px`);

console.log(bgHeight);
