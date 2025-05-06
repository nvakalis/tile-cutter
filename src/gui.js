import GUI from 'lil-gui';
import {calcCellSize} from './calcCellSize';



export function initializeLilGui(w, h, st, spaceMode = 'free') {
    calcCellSize();

    const redrawCanvas = app.redrawCanvas;

    const gui = new GUI({ container: document.getElementById('tools') });

    window.viewModeController = gui.add(app, 'viewMode')
        .name('View Mode')
        .options(['image', 'tiles', 'stack']).onChange(app.lg_changeViewMode);

    gui.add(app, 'spaceMode')
        .name('Space Mode')
        .options(['free', 'uniform']).onChange(app.lg_changeSpaceMode);

    gui.add(st, 'columns', 1, 10, 1).name("Columns").onChange(redrawCanvas);
    gui.add(st, 'rows', 1, 10, 1).name("Rows").onChange(redrawCanvas);

    gui.add(st, 'imageSize').name("Image Size").listen().disable();
    gui.add(st, 'cellSize').name("Cell Size").listen().disable();

    if (spaceMode === 'uniform') {
        var max = Math.floor(.3 * ((w + h) / 2));
        gui.add(st, 'gap', 0, max, 1).name("Gap").onChange(redrawCanvas);
        gui.add(st, 'pad', 0, max, 1).name("Padding").onChange(redrawCanvas);
    } else {
        var maxH = Math.floor(.3 * w);
        var maxV = Math.floor(.3 * h);

        gui.add(st, 'gapH', 0, maxH, 1).name("Horizontal Gap").onChange(redrawCanvas);
        gui.add(st, 'gapV', 0, maxV, 1).name("Vertical Gap").onChange(redrawCanvas);
        gui.add(st, 'padH', 0, maxH, 1).name("Horizontal Padding").onChange(redrawCanvas);
        gui.add(st, 'padV', 0, maxV, 1).name("Vertical Padding").onChange(redrawCanvas);
    }

    const plsf = gui.addFolder('Pad Line Settings '); // line settings folder
    plsf.addColor(st, 'padColor').name("Pad Line").onChange(redrawCanvas);
    plsf.add(st, 'padOpacity', 0, 1, .1).name("Opacity").onChange(redrawCanvas);
    plsf.add(st, 'padWidth', 1, 5, 1).name("Line Width").onChange(redrawCanvas);
    plsf.add(st, 'padDashed').name("Dashed Line").onChange(redrawCanvas);

    const clsf = gui.addFolder('Cell Boder Settings '); // line settings folder
    clsf.addColor(st, 'cellColor').name("Cell Line").onChange(redrawCanvas);
    clsf.add(st, 'cellOpacity', 0, 1, .1).name("Opacity").onChange(redrawCanvas);
    clsf.add(st, 'cellLineWidth', 1, 5, 1).name("Line Width").onChange(redrawCanvas);
    clsf.add(st, 'cellDashed').name("Dashed Line").onChange(redrawCanvas);

    const maskf = gui.addFolder('Mask Settings '); // mask settings folder
    maskf.add(st, 'mask').name("Show Mask").onChange(redrawCanvas);
    maskf.addColor(st, 'maskColor').name("Mask Color").onChange(redrawCanvas);
    maskf.add(st, 'maskOpacity', 0, 1, .1).name("Mask Opacity").onChange(redrawCanvas);

    const gridfolder = gui.addFolder('Grid');

    var maxGrid = Math.floor(((w + h) / 12));
    gridfolder.close();
    gridfolder.add(st, 'showGrid').name("Show Grid").onChange(redrawCanvas);
    gridfolder.addColor(st, 'gridColor').name("Grid Color").onChange(redrawCanvas);
    gridfolder.add(st, 'gridSize', 4, maxGrid, 1).name("Grid Size").onChange(redrawCanvas);

    const folder = gui.addFolder('Gizmos');
    folder.close();
    folder.add(st, 'showCenter').name("Cell Centers").onChange(redrawCanvas);
    folder.addColor(st, 'centerColor').name("Center Color").onChange(redrawCanvas);

    folder.add(st, 'showDiagonals').name("Cell Diagonals").onChange(redrawCanvas);
    folder.addColor(st, 'diagonalsColor').name("Color").onChange(redrawCanvas);

    gui.add(st, 'showImage').name("Show Image").onChange(redrawCanvas);

    gui.add(app, 'createZip').name('🧩 Download Sliced Images');

    return gui;
}