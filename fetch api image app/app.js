const input = document.querySelector('.input');
const searchBtn = document.querySelector('.search-btn');
const showmoreBtn = document.querySelector('.showmore-btn');
const apiKey = "563492ad6f917000010000015b50ae65b1044cd8ae969b07ccaeb44d";

let searchText = "";
let search = false;
let pageNum = 1;

input.addEventListener('input', (e)=> {
    e.preventDefault();
    searchText = e.target.value;
});

searchBtn.addEventListener('click', ()=> {
    if(input.value === "") {
        alert("กรุณาระบุคำค้นหาด้วยครับ");
        return;
    }
    cleargallery();
    // เมื่อกด search จะมีค่าเป็น true
    search = true;
    SearchPhotos(searchText, pageNum);
});

// เมื่อใช้ cleargallery ให้ set display-img เป็นค่าว่าง
function cleargallery() {
    document.querySelector(".display_images").innerHTML = "";
    pageNum = 1; // set pageNum เป็นหน้าแรก
}

// function for fetch image
async function fetchPhotos(pageNum) {
    const data = await fetch(`https://api.pexels.com/v1/curated?page=${pageNum}`,
    {
        method: "GET",
        headers: {
            Accept: "application/JSON",
            Authorization: apiKey
        }
    });
    const response = await data.json();
    display_images(response);
}
fetchPhotos(pageNum);

// แสดงผลรูปภาพ
function display_images(response) {
    response.photos.forEach((image)=> {
        const photo = document.createElement("div");
        photo.innerHTML = `<img src=${image.src.large}>
        <figcaption>Photo By: ${image.photographer}</figcaption>`;
        
        // แสดงรูปภาพที่อยู่ใน div photo มาแสดงใน div displayimg
        document.querySelector(".display_images").appendChild(photo);
    });
}

async function SearchPhotos(query, pageNum) {
    const data = await fetch(`https://api.pexels.com/v1/search?query=${query}&page=${pageNum}`,
    {
        method: "GET",
        headers: {
            Accept: "application/JSON",
            Authorization: apiKey
        }
    });
    const response = await data.json();
    console.log(response);
    display_images(response);
}

showmoreBtn.addEventListener('click' , ()=> {
    if(!search) {
        pageNum++;
        fetchPhotos(pageNum);
    }
    else {
        if(searchText.value === "")  return;
            pageNum++;
            SearchPhotos(searchText, pageNum);
    }
})

fetchPhotos(pageNum);
