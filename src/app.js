import { html, toggle } from './utils/domHelpers';
import { h_main_page } from './h_main_page';
import { setupImageDrop } from './drop.js';
import { createNewSettings, adjustSettings } from './settings.js';
import { initializeLilGui } from './gui.js';
import { start_view_image, redrawCanvas_view_image, terminate_view_image } from './view/view_image.js';
import { start_view_tiles, redrawCanvas_view_tiles, terminate_view_tiles } from './view/view_tiles.js';
import { start_view_stack, redrawCanvas_view_stack, terminate_view_stack } from './view/view_stack.js';
import { calcCellSize } from './calcCellSize.js';
import { exportImageSlicesToZip } from './zip.js'

function bootApp() {
    document.body.innerHTML = h_main_page();

    message("Drop your grid image here to slice it into tiles");

    setupImageDrop(app.startLoading);

    return;

    if (testing) {
        app.startLoading(testImageUrl);

        if (window.hasOwnProperty('testingViewMode') && testingViewMode) {
            setTimeout(() => { viewModeController.setValue(testingViewMode); }, 500)
        }
    }
}

export { bootApp };

const app = {
    main_gui: null,
    main_settings: null,
    spaceMode: null, // main lil gui
    viewMode: null,  // main lil gui
    previous_viewMode: null,
    previous_spaceMode: null,
    default_viewMode: 'image',
    default_spaceMode: 'free',
    imageInfo: null,
};

const testing = true;
//var testingViewMode = true;
const testImageUrl = 'img/grid_3x3.png';

window.app = app;

function message(msg) {
    html('content', `<h1 class="message">${msg}</h1>`);
}

app.startLoading = function (url) {
    console.log("app.startLoading", url);

    var image = new Image();

    image.onload = app.imageLoaded;
    image.src = url;

    app.imageInfo = { url, image };
}

app.imageLoaded = function () {
    console.log("app.imageLoaded ");

    app.imageInfo.width = app.imageInfo.image.width;
    app.imageInfo.height = app.imageInfo.image.height;

    app.lg_changeSpaceMode();

}

app.lg_changeViewMode = function () {

    // end previous view mode
    console.log('app.changeViewMode ');

    if (app.previous_viewMode) app.terminateView(app.previous_viewMode);

    //updateViews(app.viewMode);

    app.initiateView(app.viewMode);

    app.redrawCanvas(); // ????????????
}

app.lg_changeSpaceMode = function (newSpaceMode) {
    console.log('lg_changeSpaceMode ');
    var boot = newSpaceMode === undefined;

    if (app.previous_viewMode) app.terminateView(app.previous_viewMode);


    if (boot) {
        app.spaceMode = app.default_spaceMode;
        app.viewMode = app.default_viewMode;

        app.main_settings = createNewSettings(app.imageInfo.width, app.imageInfo.height);
    } else {
        // not prev view mode exists
        if (!app.previous_viewMode) console.error("lg_changeSpaceMode empty previous_viewMode when boot==false");

        app.main_settings = adjustSettings(app.previous_spaceMode, app.main_settings);
    }

    if (app.main_gui) app.main_gui.destroy();

    app.main_gui = initializeLilGui(app.imageInfo.width, app.imageInfo.height, app.main_settings, app.spaceMode);



    app.initiateView(app.viewMode);

    app.previous_spaceMode = app.spaceMode;
}
//---------------------------------------------
app.initiateView = function (view) {
    app.previous_viewMode = view;
    if (view === "image") start_view_image();
    if (view === "tiles") start_view_tiles();
    if (view === "stack") start_view_stack();
}
app.terminateView = function (view) {
    if (view === "image") terminate_view_image();
    if (view === "tiles") terminate_view_tiles();
    if (view === "stack") terminate_view_stack();
}
//---------------------------------------------
app.createZip = function () {
    console.log('app.createZip ');

    var rects = app.main_settings.rects;
    exportImageSlicesToZip(app.imageInfo.image, rects);
}
//---------------------------------------------
app.redrawCanvas = function () {
    console.log('app.redrawCanvas', app.viewMode);
    calcCellSize();
    toggle('error', app.main_settings.invalid);
    var view = app.viewMode;
    if (view === "image") redrawCanvas_view_image();
    if (view === "tiles") redrawCanvas_view_tiles();
    if (view === "stack") redrawCanvas_view_stack();
}