const elem = document.querySelector('.postsContainer');
const infScroll = new InfiniteScroll( elem, {
  // options
  path: '.pagination__next',
  append: '.posts',
  history: false,
});

const year = new Date().getFullYear()
document.getElementById("copyright").innerHTML = "<p>Copyright © " + year + "</p>"


