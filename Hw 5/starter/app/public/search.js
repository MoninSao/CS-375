let button = document.getElementById("submit");

button.addEventListener("click", () => {
  let genre = document.getElementById("genre").value;

  let tbody = document.getElementById("books");
  let message = document.getElementById("message");
  tbody.replaceChildren();
  message.replaceChildren();

  fetch("/search?genre=" + encodeURIComponent(genre))
    .then((res) => res.json())
    .then((data) => {
      if (data.rows.length === 0) {
        message.appendChild(document.createTextNode("No books found"));
        return;
      }
      for (let book of data.rows) {
        let row = document.createElement("tr");

        let titleCell = document.createElement("td");
        titleCell.appendChild(document.createTextNode(book.title));

        let genreCell = document.createElement("td");
        genreCell.appendChild(document.createTextNode(book.genre));

        let qualityCell = document.createElement("td");
        qualityCell.appendChild(document.createTextNode(book.quality ? "Yes" : "No"));

        row.appendChild(titleCell);
        row.appendChild(genreCell);
        row.appendChild(qualityCell);
        tbody.appendChild(row);
      }
    });
});