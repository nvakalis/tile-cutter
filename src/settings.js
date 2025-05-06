export function createNewSettings(w, h) {
    console.log('createNewSettings ', w, h);

    var settings = {
        imageSize: '',
        cellSize: '',
        canvasWidth: w,
        canvasHeight: h,
        columns: 4,
        rows: 3,
        cellWidth: 0,
        cellHeight: 0,

        padColor: '#d44949',
        padOpacity: .9,
        padWidth: 1,
        padDashed: true,

        cellColor: '#72c766',
        cellOpacity: .8,
        cellLineWidth: 1,
        cellDashed: true,

        mask: true,
        maskColor: "#6ee2d5",
        maskOpacity: .5,

        showGrid: false,
        gridSize: 12,
        gridColor: "#808080",

        showCenter: false,
        centerColor: "#EEFF00",
        centerSize: 12,

        showDiagonals: false,
        diagonalsColor: "#DDAADD",

        showImage: true,

        gapV: 10,
        gapH: 10,
        padH: 10,
        padV: 10,
    }

    return settings;
}
//---------------------------------------------------------
export function adjustSettings(prevMode, prevSettings) {

    if (prevMode === 'uniform')
        return expandSettings(prevSettings);

    if (prevMode === 'free')
        return collapseSettings(prevSettings);
}
function expandSettings(settings) {
    const newSettings = { ...settings };

    if ('pad' in settings) {
        const padValue = settings.pad;
        newSettings.padH = settings.padH ?? padValue;
        newSettings.padV = settings.padV ?? padValue;
        delete newSettings.pad;
    } else {
        alert('expandSettings no pad');
    }

    if ('gap' in settings) {
        const gapValue = settings.gap;
        newSettings.gapH = settings.gapH ?? gapValue;
        newSettings.gapV = settings.gapV ?? gapValue;
        delete newSettings.gap;
    } else {
        alert('expandSettings no gap');
    }

    return newSettings;
}
function collapseSettings(settings) {
    if ('padH' in settings && 'padV' in settings) {
        settings.pad = Math.round((settings.padH + settings.padV) / 2);
        delete settings.padH;
        delete settings.padV;
    } else {
        alert('collapseSettings no padH or padV');
    }

    if ('gapH' in settings && 'gapV' in settings) {
        settings.gap = Math.round((settings.gapH + settings.gapV) / 2);
        delete settings.gapH;
        delete settings.gapV;
    } else {
        alert('collapseSettings no gapH or gapV');
    }

    return settings;
}
