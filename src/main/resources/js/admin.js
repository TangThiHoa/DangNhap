function saveProduct() {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let categoryId = document.getElementById("category").value;
    let pro = {
        name: name, //name trước: là tên thuộc tính của đtượng pro , sau :là giá trị được lấy ở trên
        price: price,
        category: {
            id: categoryId
        }
    }
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken
        },
        type: 'POST',
        url: 'http://localhost:8000/admin/products',
        data: JSON.stringify(pro),
        success: function () {
            loadData()
        },
        error: function (error) {
            console.log(error)
            alert("Bạn không vào được trang này ")

        }
    })
}
