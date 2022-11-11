"use strict";

function loadAllProducts() {
  fetch("http://localhost:8081/api/products")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((data) => {
        const results = document.getElementById("results");
        buildProductCard(data, results);
      });
    });
}
function buildProductCard(data, product) {
  let colDiv = document.createElement("div");
  colDiv.className = "row";

  const div = document.createElement("div");
  div.className = "card col my-4";
  div.style = "width: 22em;";
  product.appendChild(colDiv);
  colDiv.appendChild(div);

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  div.appendChild(cardBody);

  const cardTitle = document.createElement("div");
  cardTitle.className = "card-title p-3";
  cardTitle.innerHTML = `<a href="product.html?id=${data.productId}">${data.productName}</a>`;
  cardBody.appendChild(cardTitle);

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.innerText = `Price: $${parseFloat(data.unitPrice).toFixed(2)}
  In Stock: ${data.unitsInStock}`;
  cardBody.appendChild(cardText);

}
window.onload = () => {
  loadAllProducts();
};