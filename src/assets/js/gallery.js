let galleries = document.querySelectorAll(".c-gallery");

for (let i = 0; i < galleries.length; i++) {
    let tileContainer = galleries[i].querySelector('.c-gallery__tiles')
    let tiles = tileContainer.children;
    let totalTiles = tileContainer.getAttribute("total-tiles");
    let button = galleries[i].querySelector('.c-gallery__button')
    let paginateCardAmount = 3
    let showCards = 3

    if(screen.width >= 768){
        paginateCardAmount = 6
        showCards = 6

        for (let x = 3; x < (showCards && totalTiles); x++) {
            tiles[x].classList.remove("c-gallery__tiles__tile--hidden")
        }
    }

    if (totalTiles <= showCards) {
        button.style.display = "none"
    }

    galleries[i].querySelector('.c-button').addEventListener("click", function (e) {
        for (let x = showCards; x < ((showCards + paginateCardAmount) && totalTiles); x++) {
            tiles[x].classList.remove("c-gallery__tiles__tile--hidden")
        }
        showCards = showCards + paginateCardAmount

        if (totalTiles <= showCards) {
            button.style.display = "none"
        }
    });
}