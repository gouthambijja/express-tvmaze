"use strict";
const form = document.querySelector("#form");
const input = document.querySelector("#movie");

let x = document.querySelector(".movieImages");
const loadImage = async () => {
  x = document.querySelector(".movieImages");
  if (x) await x.remove();
  const searchTerm = form.elements.q.value;
  if (searchTerm !== "") {
    const res = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${searchTerm}`
    );
    const data = await res.data;
    const div = document.createElement("div");
    div.classList.add("movieImages");
    for (let x of data) {
      if (x.show.image) {
        const img = document.createElement("img");
        img.src = x.show.image.medium;
        div.append(img);
      }
    }
    document.body.append(div);
  }
};
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  loadImage();
});
input.addEventListener("input", loadImage);
