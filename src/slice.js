export function sliceImage(spaceMode) {
    var slices = [];
    if (spaceMode === 'uniform') {
        slices = sliceImageGridFromImage_Uniform();
    } else {
        slices = sliceImageGridFromImage_Free();
    }
    return slices;
}

function sliceImageGridFromImage_Uniform() {
    const slices = [];

    const {
        columns,
        rows,
        pad,
        gap,
        cellWidth,
        cellHeight
    } = app.main_settings;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const x = pad + col * (cellWidth + gap);
            const y = pad + row * (cellHeight + gap);

            const offscreen = document.createElement('canvas');
            offscreen.width = cellWidth;
            offscreen.height = cellHeight;
            const offCtx = offscreen.getContext('2d');

            offCtx.drawImage(
                app.imageInfo.image, // ⬅️ use the original image
                x, y,
                cellWidth, cellHeight,
                0, 0,
                cellWidth, cellHeight
            );

            slices.push({ row, col, image: offscreen });
        }
    }

    return slices;
}

function sliceImageGridFromImage_Free() {
    const slices = [];

    const {
        columns,
        rows,
        padH, padV,
        gapH, gapV,
        cellWidth,
        cellHeight
    } = app.main_settings;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const x = padH + col * (cellWidth + gapH);
            const y = padV + row * (cellHeight + gapV);

            const offscreen = document.createElement('canvas');
            offscreen.width = cellWidth;
            offscreen.height = cellHeight;
            const offCtx = offscreen.getContext('2d');

            offCtx.drawImage(
                app.imageInfo.image, // ⬅️ use the original image
                x, y,
                cellWidth, cellHeight,
                0, 0,
                cellWidth, cellHeight
            );

            slices.push({ row, col, image: offscreen });
        }
    }

    return slices;
}
