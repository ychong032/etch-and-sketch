let mouseDown = false;
document.body.onmousedown = () => mouseDown = true;
document.body.onmouseup = () => mouseDown = false;

let penColor = "black";
let isRandomMode = false;
let gridColor = "#f9f9f9";
let gridSize = 16;
let showGridlines = true;
const container = document.querySelector("#container");
const gridSizeButton = document.querySelector("#change-grid");
const clearButton = document.querySelector("#clear-grid");
const gridColorPicker = document.querySelector("#grid-color"); 
const penColorPicker = document.querySelector("#pen-color");
const toggleButton = document.querySelector("#toggle");
const gridlinesButton = document.querySelector("#gridlines");
gridSizeButton.addEventListener("click", changeGridSize);
clearButton.addEventListener("click", clearGrid);
gridColorPicker.addEventListener("change", changeGridColor);
penColorPicker.addEventListener("change", (e) => penColor = e.target.value);
toggleButton.addEventListener("click", toggleMode);
gridlinesButton.addEventListener("click", toggleGridlines);

makeGrid();

function makeGrid(size=16) {
    let cellWidth = container.clientWidth / size;

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const div = document.createElement("div");
            div.setAttribute("draggable", 'false');  
            div.style.border = (showGridlines ? "1px solid grey" : "0px");
            div.style.display = "inline-block";
            div.style.width = `${cellWidth}px`;
            div.style.height = `${cellWidth}px`; 
            div.style.boxSizing = "border-box";
            div.style.backgroundColor = gridColor;    
            div.addEventListener("mouseover", changeBackgroundColor);
            div.addEventListener("mousedown", changeBackgroundColor);
            container.appendChild(div);
        }
    }
}

function changeGridSize() {
    gridSize = getSizeFromUser();

    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }

    makeGrid(gridSize);
}

function getSizeFromUser() {
    let newSize;
    do {
        newSize = parseInt(prompt("Enter a size from 1 to 100 for the grid. E.g., enter 32 for a 32x32 grid.", ''));
    } while (isNaN(newSize) || newSize < 1 || newSize > 100);
    return newSize;
}

function changeBackgroundColor(e) {
    if (e.type === "mouseover" && !mouseDown) return;

    if (isRandomMode) {
        let r = Math.random() * 255;
        let g = Math.random() * 255;
        let b = Math.random() * 255;
        e.target.style.backgroundColor = `${rgb(r, g, b)}`;
    } else {
        e.target.style.backgroundColor = penColor;
    }
}

function rgb(r, g, b) {
    r = Math.floor(r);
    g = Math.floor(g);
    b = Math.floor(b);

    return `rgb(${r}, ${g}, ${b})`;
}

function clearGrid() {
    const gridCells = Array.from(container.children);

    gridCells.forEach((item) => {
        item.style.backgroundColor = gridColor;
    });
}

function changeGridColor(e) {
    const gridCells = Array.from(container.children);
    gridColor = e.target.value;
    gridCells.forEach((item) => item.style.backgroundColor = gridColor);
}

function toggleMode() {
    isRandomMode = !isRandomMode;
    if (isRandomMode) {
        this.textContent = "Random";
    } else {
        this.textContent = "Manual";
    }
}

function toggleGridlines() {
    const gridCells = Array.from(container.children);
    showGridlines = !showGridlines;
    gridCells.forEach((item) => {
        item.style.border = (showGridlines ? "1px solid grey" : "0px");
    });
}