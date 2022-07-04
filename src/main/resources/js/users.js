function loadData() {
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + token
        },
        type: "GET",
        url: "http://localhost:8000/products",
        success: function (products) {
            console.log(products)
            document.getElementById("product").innerHTML = ` <div class="col-3">List category</div>
    <div class="col-9">
        <h3>List product</h3>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
            </tr>
            </thead>
            <tbody id="table">
            </tbody>
        </table>
    </div>`
            loadTableProduct(products)
        },
        error: function (error) {
            console.log(error)
            alert("Bạn không vào được trang này ")

        }
    })
}

function loadTableProduct(products) {
    let str = "";
    for (let i = 0; i < products.length; i++) {
        str += `<tr>
                    <td>${i + 1}</td>
                    <td>${products[i].name}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].category.name}</td>
                </tr>`
    }
    document.getElementById("table").innerHTML = str;
}