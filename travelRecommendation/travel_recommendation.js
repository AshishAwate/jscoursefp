let searchBtn = document.getElementById("searchbtn");
let clearBtn = document.getElementById("clearbtn");
let result = document.getElementById("resultContainer");
let close = document.getElementById("close-btn");
let mydiv = document.getElementById("dropdown");
let query = document.getElementById("searchinput");


const clearsearch = () => {
    query.value = "";
    mydiv.style.display = "none";
    console.log("clearing")
};

clearBtn.addEventListener("click", clearsearch);

const showResult = (name, image, info) => {
    if(mydiv.style.display === "none" || mydiv.style.display === "" ) {
        mydiv.style.display = "block";

    } else {
        mydiv.style.display = "none";
    }
    result.innerHTML = `
    <h2 class="title">${name} sssss</h2>
    <img class="search-img" src=${image} alt="allen">
    <p class="description">${info}</p>
  `;

};

const closeDropdown = () => {
    mydiv.style = "none";
    query.value = "";
};

close.addEventListener("click", closeDropdown);

const searchError = () => {
    if(mydiv.style.display === "none" || mydiv.style.display === "") {
        mydiv.style.display = "block";
    } else {
        mydiv.style.display = "none";
    }

    result.innerHTML = `<p class="notfound">Sorry we can't find your search</>`;
};

fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
        const search = () => {
            let searchQuery = query.value.toLowerCase();
            let notfound = true;

            data.countries.map((country) => {
                country.cities.map((city) => {
                    if (city.name.toLowerCase().includes(searchQuery)) {
                        showResult(city.name, city.imageUrl, city.description);
                        notfound = false;
                    }
                })
            });
            
            data.temples.map((temple) => {
                if(temple.name.toLowerCase().includes(searchQuery)) {
                    showResult(temple.name, temple.imageUrl, temple.description)
                    notfound = false;
                }
            });

            data.beaches.map((beach) => {
                if(beach.name.toLowerCase().includes(searchQuery)) {
                    showResult(beach.name, beach.imageUrl, beach.description)
                    notfound = false;
                }
            })

            if(notfound) {
                searchError();
            }
        };
        searchBtn.addEventListener("click", search)
    });