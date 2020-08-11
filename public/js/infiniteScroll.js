//infinite scroll
const elem = document.querySelector(".infinite");
const infScroll = new InfiniteScroll(elem, {
  // options
  path: ".pagination__next",
  append: ".infinitePost",
  history: false,
});