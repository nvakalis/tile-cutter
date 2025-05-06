import { html } from '../utils/domHelpers';
import { sliceImage } from "../slice.js";

export function start_view_tiles() {
    html('content', `<div id="overlay"></div>`);
    start_Open_Preview();
}

function start_Open_Preview() {
    var slices = sliceImage( app.spaceMode);
    showImagesInOverlay(slices);
}

export function terminate_view_tiles() {
}

export function redrawCanvas_view_tiles() {
    console.log("redrawCanvas_view_tiles");
    var slices = sliceImage(app.spaceMode);
    showImagesInOverlay(slices);
}

function showImagesInOverlay(slices) {
    const overlay = document.getElementById('overlay');
    //const overlay = document.querySelector('[data-view="tiles"]');
    overlay.innerHTML = ''; // Clear previous content

    slices.forEach((sliceItem, index) => {
        var image = sliceItem.image;
        // Create a new canvas
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.style.margin = '4px';
        canvas.style.border = '1px solid #ccc';

        const ctx = canvas.getContext('2d');

        // Draw the original canvas (slice) onto the new canvas
        ctx.drawImage(image, 0, 0);

        // Add your custom drawing here (e.g., annotate, overlay text, etc.)
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.font = '16px sans-serif';
        ctx.fillText(`Slice ${index + 1}`, 10, 20); // Example: label each slice

        overlay.appendChild(canvas);
    });
}
