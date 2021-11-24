// Set up container
const containerSize = 700;
const container = document.querySelector(".grid-container");
container.style = `width: ${containerSize}px; height: ${containerSize}px`;

// Default resolution
let squaresPerRow = 16;

// Render grid
renderGrid(container, containerSize, squaresPerRow);

// Enable reset
const clearButton = document.querySelector(".clear-btn");
clearButton.addEventListener("click", reset);

// Reset handler
function reset() {
    const trailSquares = document.querySelectorAll(".trail");
    
    // Clear trail
    trailSquares.forEach(square => {
        square.classList.remove("trail");
    });

    // Get new valid grid resolution
    while (true) {
        squaresPerRow = parseInt(prompt("Enter grid resolution (min: 2, max: 100)", "16"));
        
        if (squaresPerRow != NaN && squaresPerRow >= 2 && squaresPerRow <= 100) break;
    }

    // Remove old grid
    removeGrid(container);

    // Render new grid
    renderGrid(container, containerSize, squaresPerRow);
}

// Grid render function
function renderGrid(container, containerSize, squaresPerRow) {
    const totalSquares = squaresPerRow**2;
    
    container.style.gridTemplateColumns = `repeat(auto-fill, calc(${containerSize}px / ${squaresPerRow}))`;
    
    // Create and add squares
    for (let i = 0; i < totalSquares; i++) {
        let square = document.createElement("div");
        square.setAttribute("id", i+1);
        square.classList.add("square");
        container.append(square);
        
        // Add mouseover listener
        square.addEventListener("mouseover", e => randomColor(e));
    }
}

// Grid removal function
function removeGrid(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

// Give target a random color and darken for each pass
function randomColor(e) {
    const square = e.target;
    const shadeFactor = 0.1;

    let R, G, B;

    if (square.classList.contains("passed")) {
        // Darken
        R = parseInt(square.getAttribute("r") - square.getAttribute("r-decrement"));
        G = parseInt(square.getAttribute("g") - square.getAttribute("g-decrement"));
        B = parseInt(square.getAttribute("b") - square.getAttribute("b-decrement"));

        square.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
    }
    else {
        // Give random color
        R = Math.floor(Math.random() * 256);
        G = Math.floor(Math.random() * 256);
        B = Math.floor(Math.random() * 256);
        
        square.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
        square.classList.add("passed");

        // Constant decrement for each channel
        // Shade by 1/10 of first value on each pass
        square.setAttribute("r-decrement", `${R * shadeFactor}`);
        square.setAttribute("g-decrement", `${G * shadeFactor}`);
        square.setAttribute("b-decrement", `${B * shadeFactor}`);
    }
    
    // Save color components for darkening later
    square.setAttribute("r", `${R}`);
    square.setAttribute("g", `${G}`);
    square.setAttribute("b", `${B}`);
    
}