const imageWrapper = document.querySelector(".images");
const searchInput = document.querySelector(".search input");
const loadMoreBtn = document.querySelector(".gallery .load-more");
const lightbox = document.querySelector(".lightbox");
const downloadImgBtn = lightbox.querySelector(".uil-import");
const closeImgBtn = lightbox.querySelector(".uil-times");

// API key
const apiKey = "HW9uAAQbLwZf1X5wKBJl7V7iraALckdYRP6WT7gXPsNGVI1BmeE3CYS4";
const perPage = 15;
let currentPage = 1;
let searchTerm = null;

v=window.localStorage.getItem("myemail")
// console.log("local storage ",v);
document.getElementById('myemail').innerHTML=v

const downloadImg = (imgUrl) => {
  // creating  download link, & downloading it
    fetch(imgUrl).then(res => res.blob()).then(file => { //A blob object is simply a group of bytes that holds the data stored in a file
       const a = document.createElement("a");
       a.href = URL.createObjectURL(file);
       a.download = new Date().getTime();
       a.click();
   }).catch(() => alert("Failed to download image!"));
}



const showLightbox = (name, img) => {
    // showbox to preview image
     lightbox.querySelector("img").src = img;
    lightbox.querySelector("span").innerText = name;
    downloadImgBtn.setAttribute("data-img", img);
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
} 

const hideLightbox = () => {
    // hide showbox clicking on hide icon
     lightbox.classList.remove("show");
    document.body.style.overflow = "auto";
}

const generateHTML = (images) => {
     imageWrapper.innerHTML += images.map(img =>
        `<li class="card" oneclick= "showLightbox('${img.photographer}',)">
            <img onclick="showLightbox('${img.photographer}', '${img.src.large2x}', )" src="${img.src.large2x}" alt="img">
            <div class="details">
                <div class="photographer">
                    <i class="uil uil-camera"></i>
                    <span>${img.photographer}</span>
                </div>
                <button onclick="downloadImg('${img.src.large2x}');">
                    <i class="uil uil-import"></i>
                </button>
            </div>
        </li>`
    ).join("");
}

const getImages = (apiURL) => {
     searchInput.blur();
    loadMoreBtn.innerText = "Loading...";
    loadMoreBtn.classList.add("disabled");
    fetch(apiURL, {
        headers: { Authorization: apiKey }
    }).then(res => res.json()).then(data => {
        generateHTML(data.photos);
        loadMoreBtn.innerText = "Load More";
        loadMoreBtn.classList.remove("disabled");
    }).catch(() => alert("Failed to load images!"));
}

const loadMoreImages = () => {
    currentPage++; 
     let apiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
    apiUrl = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}` : apiUrl;
    getImages(apiUrl);
}

const loadSearchImages = (e) => {
     if (e.target.value === "") return searchTerm = null;
     if (e.key === "Enter") {
        currentPage = 1;
        searchTerm = e.target.value;
        imageWrapper.innerHTML = "";
        getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=1&per_page=${perPage}`);
    }
}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);
closeImgBtn.addEventListener("click", hideLightbox);
downloadImgBtn.addEventListener("click", (e) => downloadImg(e.target.dataset.img));  


// LOGIN /SIGNUP

// document.getElementById('btn').addEventListener('click', e =>
// {
//    e.preventDefault()

//    const user_fname = document.getElementById('fname').value
//    const user_lname = document.getElementById('lname').value
//    const user_email= document.getElementById('email').value
//    const user_password =   document.getElementById('pwd').value  
//    // console.log(user_fname,user_lname,user_email,user_password);

//    const user = {
//        fname: user_fname,
//        lname:  user_lname,
//        email: user_email,
//        password: user_password
//    }
//    const url = `http://localhost:8070/users`
//    const xhr = new XMLHttpRequest()
//    xhr.open('POST', url)
//    xhr.setRequestHeader('Content-Type', 'application/json')
//    xhr.setRequestHeader('Access-Control-Allow-Origin','*')

//    xhr.onreadystatechange = () => {
//        if(xhr.status == 200 && xhr.readyState == 4) {
//            console.log(user)
//            console.log(xhr.responseText)
//        }
//    }
//   xhr.send(JSON.stringify(user))

// })