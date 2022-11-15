let params = (new URL(document.location)).searchParams;
let id = params.get('id');

const results = document.getElementById("results");

function details(product){
    const price = Number(product.unitPrice).toFixed(2);
    const d = document.createElement("div");
    d.classList.add("details");
    d.innerHTML = `<img src="images/c${product.categoryId}.png"><br>`

    d.innerHTML += `<table>
        <tr><th> PROPERTY    </th><th> VALUE    </th></tr>
        <tr><th> ID    </th><td> ${product.productId}    </td></tr>
        <tr><th> NAME  </th><td> ${product.productName}  </td></tr>
        <tr><th> Price </th><td> $${price}               </td></tr>
        <tr><th> Stock </th><td> ${product.unitsInStock} </td></tr>
    </table>`;
    return d;
}
results.innerHTML = "";
fetch("http://localhost:8081/api/products/" + id)
    .then(response => response.json())
    .then(p => {
            results.appendChild(details(p));
    })