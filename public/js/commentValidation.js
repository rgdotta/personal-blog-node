//comment scripts
const comment = document.getElementById("commentInput").value;
const charCount = document.getElementById("charCount");

function validate(validation, event) {
  const compare = document.getElementById("captchaInput").value;
  const error = document.getElementById("error");
  console.log(validation, compare);

  if (comment.length > 500) {
    event.preventDefault();
    error.innerHTML = "Número máximo de 500 caractéres excedido. Quantidade atual: " + comment.length;
  } else if (validation != compare) {
    event.preventDefault();
    error.innerHTML = "Captcha incorreto!";
  }
}
