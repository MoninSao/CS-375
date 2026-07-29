let button = document.getElementById("submit");

button.addEventListener("click", () => {
  let title = document.getElementById("title").value;
  let genre = document.getElementById("genre").value;

  let checked = document.querySelector('input[name="quality"]:checked');
  let quality = checked ? checked.value : "";

  fetch("/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, genre, quality }),
  }).then((res) => {
    let message = document.getElementById("message");
    let text = document.createTextNode(res.status === 200 ? "Success" : "Bad request");
    message.appendChild(text);
  });
});