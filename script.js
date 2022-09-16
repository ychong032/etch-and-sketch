const container = document.querySelector("#container");
const gridSizeButton = document.querySelector("#change-grid");
const clearButton = document.querySelector("#clear-grid");
gridSizeButton.addEventListener("click", changeGridSize);
clearButton.addEventListener("click", clearGrid);

for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 16; col++) {
        const div = document.createElement("div");
        div.style.border = "1px solid grey";
        div.style.display = "inline-block";
        div.style.width = "50px";
        div.style.height = "50px";  
        div.style.boxSizing = "border-box";
        div.addEventListener("mouseover", changeBackgroundColor);
        container.appendChild(div);
    }
}

function changeGridSize() {
    let newSize = getSizeFromUser();

    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }

    let cellWidth = container.clientWidth / newSize;

    for (let row = 0; row < newSize; row++) {
        for (let col = 0; col < newSize; col++) {
            const div = document.createElement("div");
            div.style.border = "1px solid grey";
            div.style.display = "inline-block";
            div.style.width = `${cellWidth}px`;
            div.style.height = `${cellWidth}px`;
            div.style.boxSizing = "border-box";
            div.addEventListener("mouseover", changeBackgroundColor);
            container.appendChild(div);
        }
    }
}

function getSizeFromUser() {
    let gridSize;
    do {
        gridSize = parseInt(prompt("Enter a size from 1 to 100 for the grid. E.g., enter 32 for a 32x32 grid.", ''));
    } while (isNaN(gridSize) || gridSize < 1 || gridSize > 100);
    return gridSize;
}

function changeBackgroundColor() {
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;

    this.style.backgroundColor = `${rgb(r, g, b)}`;
}

function rgb(r, g, b) {
    r = Math.floor(r);
    g = Math.floor(g);
    b = Math.floor(b);

    return `rgb(${r}, ${g}, ${b})`;
}

function clearGrid() {
    const gridCells = container.childNodes;

    gridCells.forEach((item) => {
        item.style.backgroundColor = "white";
    });
}