import { html } from '../utils/domHelpers';
import * as render from '../render.js';
import ZoomToolbar from '../zoom.js';

var showRuler = true;
window.rulerSize = 30;
var drawingAreaX = rulerSize;
var drawingAreaY = rulerSize;


export function start_view_image() {
    var w = app.imageInfo.width;
    var h = app.imageInfo.height;

    if (showRuler) {
        w += rulerSize;
        h += rulerSize;
    }

    html('content', `<canvas id="imageCanvas" zoomable width="${w}" height="${h}" style="background:#999"></canvas>`)

    window.main_canvas = document.getElementById("imageCanvas");

    app.redrawCanvas();
    window.zoomToolbar = new ZoomToolbar();
    zoomToolbar.initiate();
}

export function terminate_view_image() {
    zoomToolbar.terminate();
    zoomToolbar = null;
}

export function redrawCanvas_view_image() {
    console.log("redrawCanvas_view_image");

    var st = app.main_settings; var ctx = main_canvas.getContext('2d');
    //console.log('redrawCanvas_Free()', JSON.stringify(st));
    //console.log('redrawCanvas()');
    //console.log('st.cellWidth', st.cellWidth);          // 100
    //console.log('st.cellHeight', st.cellHeight);        // 100


    render.renderRulers(ctx);

    if (showRuler)
        ctx.translate(drawingAreaX, drawingAreaY);

    var rects = st.rects;

    if (st.showImage)
        ctx.drawImage(app.imageInfo.image, 0, 0);
    else
        render.renderCheckers(ctx);

    
    //return;

    if (st.mask)
        render.renderWhitespace(ctx); 

    // external pad frame border -------------------------------------
    ctx.strokeStyle = render.hexToRgba(st.padColor, st.padOpacity);
    ctx.lineWidth = st.padWidth;

    if (st.padDashed)
        ctx.setLineDash([4, 2]);
    else
        ctx.setLineDash([]);

    render.renderRect(ctx, st.padWidth, { x: st.frameX, y: st.frameY, w: st.frameWidth, h: st.frameHeight });
    ctx.setLineDash([]);
    // grid    
    if (st.showGrid) 
        render.renderGrid(ctx);
    // cells 
    ctx.strokeStyle = render.hexToRgba(st.cellColor, st.cellOpacity);
    ctx.lineWidth = st.cellLineWidth;
        
    if (st.cellDashed)
        ctx.setLineDash([4, 2]);
    else
        ctx.setLineDash([]);

    for (const r of rects)
        render.renderRect(ctx, ctx.lineWidth, r);
    ctx.setLineDash([]);

    // diagonals
    if (st.showDiagonals) 
        for (const r of rects)
            render.renderRectDiagonals(ctx, r);

    // cell center
    if (st.showCenter) 
        for (const r of rects)
            render.renderCenter(ctx, r);


    if (showRuler)
        ctx.translate(-1 * drawingAreaX, -1 * drawingAreaY);

}
