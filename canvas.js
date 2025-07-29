const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

const drawCircle = (x, y, outerRadius, hue, colorPicked) => {
    context.shadowColor = "transparent";
    context.fillStyle = "white";
    if (hue) {
        context.fillStyle = `hsl(${hue}, 100%, 50%)`;
    }
    if (colorPicked) {
        context.fillStyle = colorPicked;
    }
    context.beginPath();
    context.arc(x, y, outerRadius, 0, 360);
    context.closePath();
    context.fill();
};

export const drawSmooth = (
    lastX,
    lastY,
    currentX,
    currentY,
    outerRadius,
    hue,
    colorPicked
) => {
    const distance = Math.hypot(currentX - lastX, currentY - lastY);
    const numberOfCircles = Math.ceil(distance / outerRadius) * 5;

    for (let i = 0; i < numberOfCircles; i++) {
        const progress = i / numberOfCircles;
        const x = lastX + (currentX - lastX) * progress;
        const y = lastY + (currentY - lastY) * progress;
        drawCircle(x, y, outerRadius, hue, colorPicked);
    }
};

export const drawShape = (
    x,
    y,
    outerRadius,
    innerRadius,
    numberOfSides,
    hue,
    colorPicked
) => {
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowBlur = 10;
    context.shadowColor = "black";

    if (hue) {
        context.fillStyle = `hsl(${hue}, 100%, 50%)`;
    }
    if (colorPicked) {
        context.fillStyle = colorPicked;
    }

    context.beginPath();
    context.save();
    context.translate(x, y);
    context.moveTo(0, -outerRadius);
    for (let i = 0; i < numberOfSides; i++) {
        context.rotate(Math.PI / numberOfSides);
        context.lineTo(0, -outerRadius * innerRadius);
        context.rotate(Math.PI / numberOfSides);
        context.lineTo(0, -outerRadius);
    }
    context.restore();
    context.closePath();
    context.stroke();
    context.fill();
};

export const clearCanvas = () => {
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
};

export const resizeCanvas = () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
};
