
function home(){
    let str = `<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#" onclick="main()">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" onclick="save()">ADD Blog</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled">Disabled</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
<!--      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>-->
    </form>
  </div>
</nav>`
    document.getElementById("content").innerHTML = str
}


function main() {
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + token
        },
        type: "GET",
        url: "http://localhost:8000/api/blogs",
        success: function (blogs) {
            console.log(blogs)
            showAll(blogs)
        }
    })

}
function showAll(blogs){
    let str = `
<input type="text" placeholder="Title" id = "title">
<input type="text" placeholder="Content" id = "content">
<input type="date" placeholder="Date" id = "dateCreated">
<input type="file" value="upload" accept=".jpg" id="fileButton" onchange="upload(event)">
<input type="hidden" value="${localStorage.getItem(storageKeyId)}" id="id">
<input type="hidden" id="avatar">
<input type="text" placeholder="Short Description" id = "shortDescription">
<input type="text" placeholder="status" id = "status">
`
    console.log(localStorage.getItem(storageKeyId));
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].user.id != localStorage.getItem(storageKeyId)) {
            str += `<p>id : ${blogs[i].id} ,dateCreated: ${blogs[i].dateTime} ,title: ${blogs[i].title}  ,
content: ${blogs[i].content} ,author: ${blogs[i].user.username} ,
shortDescriptionn: ${blogs[i].shortDescription} , avatar :</p><img src="${blogs[i].avatar}" height="50px" width="50px">`
        } else {
            str += `<p>id : ${blogs[i].id} ,dateCreated : ${blogs[i].dateTime} ,title: ${blogs[i].title} ,
content: ${blogs[i].content} ,author: ${blogs[i].user.username} ,
shortDescription: ${blogs[i].shortDescription} , avatar :</p><img src="${blogs[i].avatar}" height="50px" width="50px">
            // <button onclick="formEditP(${blogs[i].id})">Edit</button> <button onclick="deleteP(${blogs[i].id})">Delete</button>`
        }
    }
    document.getElementById("firebase").innerHTML = str;
}
function save() {
    let title = document.getElementById("title").value;
    let dateCreated = document.getElementById("dateCreated").value;
    let content = document.getElementById("content").value;
    let avatar = localStorage.getItem(storageKeyImg);
    let shortDescription = document.getElementById("shortDescription").value;
    let status = document.getElementById("status").value;
    let idP = document.getElementById("id").value;
    let blog = {
        title: title,
        dateCreated: dateCreated,
        content:content,
        storageKeyImg:avatar,
        shortDescription:shortDescription,
        status:status,
        user: {
            id: idP
        }
    }
    console.log(blog)
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem(storageKey),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8000/api/blogs",
        data: JSON.stringify(blog),
        success: function () {
            main()
            document.getElementById("title").value = ""
            document.getElementById("dateCreated").value = ""
            document.getElementById("content").value = ""
            document.getElementById("avatar").value = ""
            document.getElementById("shortDescription").value = ""
            document.getElementById("status").value = ""
            localStorage.setItem(storageKeyImg, "");
        },
        error: function (error) {
            console.log(error)
        }
    })
}



