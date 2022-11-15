"use strict";
const mode = document.getElementById("mode");
    const results = document.getElementById("results");
    let select = undefined; //global scope

    function compareName(a, b) {
        if (a.productName < b.productName) {
            return -1;
        } else if (a.productName > b.productName) {
            return 1;
        } else {
            return 0; // a must be equal to b
        }
    }

    function productLink(p) {
        const d = document.createElement("div");
        d.classList.add("product");
        d.innerHTML = `
            <a href="detail.html?id=${p.productId}"> 
                <img src="images/c${p.categoryId}.png" class="icon">  
                ${p.productName} 
            </a>
                `;
        return d
    }

    function showAll() {
        results.innerHTML = "";
        fetch("http://localhost:8081/api/products")
            .then(response => response.json())
            .then(data => {
                data.sort(compareName);
                data.forEach(p => {
                    results.appendChild(productLink(p));
                })
            })
    }
    function showResults() {
        results.innerHTML = "";
        const id = select.selectedOptions[0].value;
        results.innerHTML = `<img src="images/c${id}.png"><br>`;
        fetch("http://localhost:8081/api/categories/" + id)
            .then(response => response.json())
            .then(data => {
                data.sort(compareName);
                data.forEach(p => {
                    results.appendChild(productLink(p));
                })
            })
    }
    function createSelect() {
        select = document.createElement("select");
        fetch("http://localhost:8081/api/categories")
            .then(response => response.json())
            .then(data => {
                select.innerHTML = `<option value="0">Select a Category:</option>`;
                data.forEach(c => {
                    const option = document.createElement("option");
                    option.value = c.categoryId;
                    option.innerHTML = c.name;
                    select.appendChild(option);
                })
                select.addEventListener("change", e => showResults())
                mode.after(select);//insert new select after the mode select.
                // document.body.appendChild(select);
            })
    }

    mode.addEventListener("change", e => {
        const value = mode.selectedOptions[0].value;
        if ("category" == value) {
            results.innerHTML = "";
            //create select
            createSelect();
        } else {
            showAll();
            //destroy select
            if (undefined !== select) {
                select.remove();
            }
        }
    })
    mode.selectedIndex= 0;