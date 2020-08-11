//copyright year
const year = new Date().getFullYear();
document.getElementById("copyright").innerHTML =
  "<p>Desenvolvido por Rafael Dotta </br> Copyright © " + year + "</p>";

//text editor
tinymce.init({
  selector: ".editor",
  plugins: "image codesample preview wordcount emoticons",
  height: "1000",
});

