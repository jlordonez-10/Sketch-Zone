import { clearCanvas, drawShape, drawSmooth, resizeCanvas } from "./canvas.js";

const canvas = document.querySelector("canvas");
const outerRadiusInput = document.querySelector("#outer-radius input");
const colorPickers = document.querySelector(".color-pickers");
const modeButtons = document.querySelector(".mode-buttons");
const innerRadiusInput = document.querySelector("#inner-radius input");
const numberOfSidesInput = document.querySelector("#number-of-sides input");
const clearButton = document.querySelector("#clear");
const downloadButton = document.querySelector("#download");

let isDrawing = false;
let hue = 0;
let colorPicked = null;
let lastX;
let lastY;
let drawingMode = "smooth";

window.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        draw(e.x, e.y);
    }
});

window.addEventListener("mousedown", (e) => {
    if (e.target === canvas) {
        isDrawing = true;
        lastX = e.x;
        lastY = e.y;
    } else {
        isDrawing = false;
    }
});

window.addEventListener("mouseup", () => {
    isDrawing = false;
});

colorPickers.addEventListener("click", (e) => {
    const colorPicker = e.target;

    if (!colorPicker.id) return;

    if (colorPicker.id === "solid-color") {
        colorPicker.addEventListener("change", (e) => {
            colorPicked = e.target.value;
        });
    }

    if (colorPicker.id === "hue-cycling") {
        colorPicked = "";
        hue = 0;
    }

    const colorContainers = document.querySelectorAll(".color-container");

    colorContainers.forEach((container) =>
        container.classList.remove("active")
    );

    colorPicker.parentElement.classList.add("active");
});

modeButtons.addEventListener("click", (e) => {
    const selectedButton = e.target;

    [...modeButtons.children].forEach((button) => {
        button.classList.remove("active");
    });

    selectedButton.classList.add("active");

    drawingMode = selectedButton.id;
});

const draw = (x, y) => {
    const outerRadius = outerRadiusInput.value;
    const innerRadius = innerRadiusInput.value;
    const numberOfSides = numberOfSidesInput.value;

    if (drawingMode === "smooth") {
        drawSmooth(lastX, lastY, x, y, outerRadius, hue, colorPicked);
    }
    if (drawingMode === "shape") {
        drawShape(
            x,
            y,
            outerRadius,
            innerRadius,
            numberOfSides,
            hue,
            colorPicked
        );
    }
    if (drawingMode === "eraser") {
        drawSmooth(lastX, lastY, x, y, outerRadius);
    }

    lastX = x;
    lastY = y;
    hue += 0.5;
};

clearButton.addEventListener("click", clearCanvas);

downloadButton.addEventListener("click", () => {
    const a = document.createElement("a");
    a.download = `${new Date().getTime()}.jpg`;
    a.href = canvas.toDataURL();
    a.click();
});

window.addEventListener("resize", resizeCanvas);

window.addEventListener("touchend", () => {
    isDrawing = false;
});

window.addEventListener("touchstart", (e) => {
    if (isDrawing) {
        const touch = e.touches[0];
        draw(touch.clientX, touch.clientY);
    }
});
