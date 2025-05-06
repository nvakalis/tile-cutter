export function renderRulers(ctx) {
    var st = app.main_settings;
    var canvas = window.main_canvas;


    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#2b2b2b';
    ctx.fillRect(0, 0, width, height);

    // --- Draw rulers ---
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, rulerSize); // top ruler
    ctx.fillRect(0, 0, rulerSize, height); // left ruler

    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#888';

    const startX = rulerSize + (10 - (rulerSize % 10)) % 10;
    const startY = rulerSize + (10 - (rulerSize % 10)) % 10;

    for (let x = startX; x < width; x += 10) {
        const tickHeight = (x - rulerSize) % 50 === 0 ? 10 : 5;
        ctx.beginPath();
        ctx.moveTo(x + 0.5, rulerSize - tickHeight);
        ctx.lineTo(x + 0.5, rulerSize);
        ctx.stroke();

        if ((x - rulerSize) % 50 === 0) {
            ctx.fillText(x - rulerSize, x + 2, 10);
        }
    }

    // Vertical (left) ruler ticks
    for (let y = startY; y < height; y += 10) {
        const tickWidth = (y - rulerSize) % 50 === 0 ? 10 : 5;
        ctx.beginPath();
        ctx.moveTo(rulerSize - tickWidth, y + 0.5);
        ctx.lineTo(rulerSize, y + 0.5);
        ctx.stroke();

        if ((y - rulerSize) % 50 === 0) {
            ctx.fillText(y - rulerSize, 2, y + 8);
        }
    }


}

export function renderWhitespace(ctx) {
    var st = app.main_settings;
    var canvas = window.main_canvas;
    var rects = st.rects;

    ctx.save(); // Save current state
    
    ctx.beginPath();
    // Start with full canvas rectangle
    ctx.rect(0, 0, canvas.width, canvas.height);

    // Add holes
    for (const r of rects) {
        ctx.rect(r.x, r.y, r.w, r.h);
    }

    // Use even-odd rule: first rect is outer, others are holes
    ctx.clip('evenodd');

    ctx.fillStyle = hexToRgba(st.maskColor, st.maskOpacity);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.restore(); // Restore to before clipping

}

export function renderGrid(ctx, gridSize) {
    var st = app.main_settings;
    ctx.lineWidth = 1;
    ctx.strokeStyle = st.gridColor;

    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    // Offset by 0.5 to align 1px lines to pixel grid
    const offset = (ctx.lineWidth % 2 === 1) ? 0.5 : 0;

    for (let x = 0; x <= w; x += st.gridSize) {
        const px = Math.round(x) + offset;
        ctx.beginPath();
        ctx.moveTo(px, 0);
        ctx.lineTo(px, h);
        ctx.stroke();
    }

    for (let y = 0; y <= h; y += st.gridSize) {
        const py = Math.round(y) + offset;
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(w, py);
        ctx.stroke();
    }


}


export function renderGrid2(ctx, gridSize) {

   // ctx.globalCompositeOperation = 'xor';
    ctx.lineWidth = 1;

    const w = ctx.canvas.width;
    const h = ctx.canvas.height;


    ctx.strokeStyle = 'black'; 
    for (let x = 0; x <= w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
    }

    for (let y = 0; y <= h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
    }
    // reset
    ctx.globalCompositeOperation = 'source-over';
}

export function renderCenter(ctx, rect, color = 'white') {
    //ctx.globalCompositeOperation = 'difference';
    var st = app.main_settings;

    var { x, y, w, h } = rect;
    ctx.lineWidth = 2;

    var side = 12;

    const half = side / 2;

    const centerX = x + w / 2;
    const centerY = y + h / 2;

    ctx.strokeStyle = st.centerColor;
    ctx.beginPath();

    // Diagonal from top-left to bottom-right
    ctx.moveTo(centerX - half, centerY - half);
    ctx.lineTo(centerX + half, centerY + half);

    // Diagonal from bottom-left to top-right
    ctx.moveTo(centerX - half, centerY + half);
    ctx.lineTo(centerX + half, centerY - half);

    ctx.stroke();

    // reset
    //ctx.globalCompositeOperation = 'source-over';

}

export function drawX(ctx, side, color = 'black') {
    const { width, height } = ctx.canvas;
    const half = side / 2;

    const centerX = width / 2;
    const centerY = height / 2;

    ctx.strokeStyle = color;
    ctx.beginPath();

    // Diagonal from top-left to bottom-right
    ctx.moveTo(centerX - half, centerY - half);
    ctx.lineTo(centerX + half, centerY + half);

    // Diagonal from bottom-left to top-right
    ctx.moveTo(centerX - half, centerY + half);
    ctx.lineTo(centerX + half, centerY - half);

    ctx.stroke();
}

export function getRectCenter(x, y, width, height) {
    const centerX = x + width / 2;
    const centerY = y + height / 2;
    return { centerX, centerY };
}

export function renderCheckers(ctx) {
    var st = app.main_settings;
    var cW = st.canvasWidth;
    var cH = st.canvasHeight;

    const squareSize = Math.floor((cW + cH) / 24);

    const color1 = "#cccccc";   // First color
    const color2 = "#eeeeee";   // Second color

    const rows = Math.ceil(cH / squareSize);
    const cols = Math.ceil(cW / squareSize);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const isEven = (row + col) % 2 === 0;
            ctx.fillStyle = isEven ? color1 : color2;
            ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
        }
    } 

}

//---------------------------------------------------------

export function hexToRgba(hex, alpha = 1.0) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const snap = v => Math.floor(v) + 0.5;

export function snapPoint(pt) {
    return {
        x: Math.floor(pt.x) + 0.5,
        y: Math.floor(pt.y) + 0.5
    };
}



export function strokeRectSnap(ctx ) {
}



export function renderRect(ctx, lineWidth, { x, y, w, h }) {
    ctx.lineWidth = lineWidth;
    

    // Offset by 0.5 for odd line widths to align on pixel grid
    const offset = (lineWidth % 2 === 1) ? 0.5 : 0;

    ctx.beginPath();
    ctx.rect(x + offset, y + offset, w, h);
    ctx.stroke();
}

export function renderRectDiagonals(ctx, { x, y, w, h }) {
    var st = app.main_settings;

    ctx.save();
    ctx.strokeStyle = st.diagonalsColor
    ctx.lineWidth = 1;
    ctx.beginPath();


    // Top-left to bottom-right
    ctx.moveTo(x + 0.5, y + 0.5);
    ctx.lineTo(x + w - 0.5, y + h - 0.5);

    // Top-right to bottom-left
    ctx.moveTo(x + w - 0.5, y + 0.5);
    ctx.lineTo(x + 0.5, y + h - 0.5);

    ctx.stroke();
    ctx.restore();
}
