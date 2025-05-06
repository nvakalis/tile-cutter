export function calcCellSize() {
    var st = app.main_settings;
    var w = app.imageInfo.width;
    var h = app.imageInfo.height;
    var u = app.spaceMode === 'uniform';

    if (app.spaceMode === 'uniform') {
        st.cellWidth = Math.floor((w - 2 * st.pad - (st.columns - 1) * st.gap) / st.columns);
        st.cellHeight = Math.floor((h - 2 * st.pad - (st.rows - 1) * st.gap) / st.rows);

        st.frameX = st.pad;
        st.frameY = st.pad;

        st.frameWidth = st.columns * st.cellWidth + (st.columns - 1) * st.gap;
        st.frameHeight = st.rows * st.cellHeight + (st.rows - 1) * st.gap;

    } else {
        st.cellWidth = Math.floor((w - 2 * st.padH - (st.columns - 1) * st.gapH) / st.columns);
        st.cellHeight = Math.floor((h - 2 * st.padV - (st.rows - 1) * st.gapV) / st.rows);

        st.frameX = st.padH;
        st.frameY = st.padV;

        st.frameWidth = st.columns * st.cellWidth + (st.columns - 1) * st.gapH;
        st.frameHeight = st.rows * st.cellHeight + (st.rows - 1) * st.gapV;
    }

    st.imageSize = `${st.canvasWidth} x ${st.canvasHeight}`;
    st.cellSize = `${st.cellWidth} x ${st.cellHeight}`;

    var padH = u ? st.pad : st.padH;
    var padV = u ? st.pad : st.padV;
    var gapH = u ? st.gap : st.gapH;
    var gapV = u ? st.gap : st.gapV;

    var rects = [];
    for (var i = 0; i < st.columns; i++) {
        var iGaps = i > 0 ? i : 0;
        for (var j = 0; j < st.rows; j++) {
            var jGaps = j > 0 ? j : 0;

            var x = padH + iGaps * (st.cellWidth + gapH);
            var y = padV + jGaps * (st.cellHeight + gapV);
            
            rects.push({ x, y, w: st.cellWidth, h: st.cellHeight });
        }
    }
    st.rects = rects;

    //console.log('calcCellSize - cellWidth:', st.cellWidth, 'cellHeight:', st.cellHeight, 'frameWidth:', st.frameWidth, 'frameHeight:', st.frameHeight);

    st.invalid = ((st.cellWidth < 1) || (st.cellHeight < 1));
        
    console.log('calcCellSize ', st.invalid);
}
