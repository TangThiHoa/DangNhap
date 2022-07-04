function saveProduct() {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let categoryId = document.getElementById("category").value;
    let pro = {
        name: name,                                                  //name trước: là tên thuộc tính của đtượng pro , sau :là giá trị được lấy ở trên
        price: price,
        category: {
            id: categoryId
        }
    }
    $.ajax({
        headers:{
            Authorization: 'Bearer ' + token
        },
        type: 'POST',
        url: 'http://localhost:8000/admin/products',
        data: JSON.stringify(pro),
        success: function () {
            alert("Thêm mới thành công !!!")
            findAllProduct()
        },
        error: function (error) {
            console.log(error)
            alert("Bạn không vào được trang này ")

        }
    })
}
// let edit = document.getElementById("display")

// function showEditForm(id) {
//     $.ajax({
//         headers:{
//             Authorization: 'Bearer ' + token
//         },
//         type: 'GET',
//         url: 'http://localhost:8080/products/' + id,
//         success: function (product) {
//             let str = `
//                     <input  value="${product.name}" id="name">
//                 <input value="${product.price}" id="price">
//                 <input value="${product.category.id}" id="category">
//                 <button onclick="update(${product.id})">Edit</button>`
//
//             edit.innerHTML = str;
//         },
//         error: function (error) {
//             console.log(error)
//         }
//     })
// }
