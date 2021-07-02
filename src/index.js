console.log('%c HI', 'color: firebrick')

// fancybandit's code

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';


function getImages() {
    return fetch(imgUrl)
        .then(response => response.json())
        .then(json => json.message);
};

function getBreeds() {
    return fetch(breedUrl)
    .then(response => response.json())
    .then(json => json.message);
};

function clickToChangeElementColor(element) {
    element.addEventListener("click", function() {
        element.style.color = "#800000";
    });
};


function addImages() {
    getImages().then(function(imgSrcs) {
        for (const imgSrc of imgSrcs) {
            const img = document.createElement("img");
            img.setAttribute("src", imgSrc);

            const dogImageContainer = document.getElementById("dog-image-container");
            dogImageContainer.appendChild(img);
        };
    });
};

function addBreeds() {
    const dogBreedUl = document.getElementById("dog-breeds");
    dogBreedUl.innerHTML = '';

    return getBreeds().then(function(breedList) {
        for (const breedName in breedList) {
            const li = document.createElement("li");
            li.innerText = breedName;

            dogBreedUl.appendChild(li);
            clickToChangeElementColor(li);
        };
        return breedList;
    });
};


function selectBreedsByLetter() {
    const breedSelector = document.getElementById("breed-dropdown");

    breedSelector.addEventListener("change", function(e) {
        const letter = e.target.value;

        addBreeds().then(function (breedList) {
            const dogBreedUl = document.getElementById("dog-breeds");
            dogBreedUl.innerHTML = '';

            for (const breedName in breedList) {
                if (breedName.charAt(0) == letter) {
                    const li = document.createElement("li");
                    li.innerText = breedName;

                    dogBreedUl.appendChild(li);
                    clickToChangeElementColor(li);
                };
            };

        });
    });

};

addImages();
addBreeds();
selectBreedsByLetter();