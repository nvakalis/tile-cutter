const ZOOM_STEP = 0.1;
const ZOOM_MIN = 0.1;
const ZOOM_MAX = 3;

let zoomLevel = 1;
let toolbar = null;
let contentDiv = null;
let wheelHandler = null;

function updateZoom() {
    const zoomables = contentDiv.querySelectorAll('[zoomable]');
    zoomables.forEach(el => {
        el.style.transform = `scale(${zoomLevel})`;
        //el.style.transformOrigin = 'top left';
    });

    const zoomDisplay = toolbar.querySelector('.zoom-display');
    zoomDisplay.textContent = `${Math.round(zoomLevel * 100)}%`;
}

function zoomIn() {
    zoomLevel = Math.min(zoomLevel + ZOOM_STEP, ZOOM_MAX);
    updateZoom();
}

function zoomOut() {
    zoomLevel = Math.max(zoomLevel - ZOOM_STEP, ZOOM_MIN);
    updateZoom();
}

function createToolbar() {
    const bar = document.createElement('div');
    bar.style.position = 'absolute';
    bar.style.top = '0px';
    bar.style.left = '10px';
    bar.style.background = 'rgba(255, 255, 255, 0.9)';
    bar.style.border = '1px solid #ccc';
    bar.style.borderRadius = '0 0 4px 4px';
    bar.style.padding = '4px 8px';
    bar.style.display = 'flex';
    bar.style.alignItems = 'center';
    bar.style.gap = '6px';
    bar.style.zIndex = 1000;

    const minusBtn = document.createElement('button');
    minusBtn.textContent = '−';
    minusBtn.onclick = zoomOut;
    minusBtn.style.padding = '2px 8px';

    const zoomDisplay = document.createElement('button');
    zoomDisplay.type = 'button';
    zoomDisplay.className = 'zoom-display';
    zoomDisplay.textContent = '100%';
    zoomDisplay.title = 'Click to reset zoom';
    zoomDisplay.onclick = () => {
        zoomLevel = 1;
        updateZoom();
    };
    zoomDisplay.style.cursor = 'pointer';
    zoomDisplay.style.border = 'none';
    zoomDisplay.style.background = 'transparent';
    zoomDisplay.style.fontWeight = 'bold';
    zoomDisplay.style.fontSize = '14px';
    zoomDisplay.style.padding = '0 6px';

    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';
    plusBtn.onclick = zoomIn;
    plusBtn.style.padding = '2px 8px';

    bar.appendChild(minusBtn);
    bar.appendChild(zoomDisplay);
    bar.appendChild(plusBtn);

    return bar;
}

function handleWheel(event) {
    if (event.ctrlKey || true) {
        event.preventDefault();
        if (event.deltaY < 0) zoomIn();
        else zoomOut();
    }
}

class ZoomToolbar {
    initiate = () => {
        contentDiv = document.getElementById('content');
        if (!contentDiv) return;

        toolbar = createToolbar();
        contentDiv.style.position = 'relative';
        contentDiv.appendChild(toolbar);

        wheelHandler = handleWheel.bind(this);
        contentDiv.addEventListener('wheel', wheelHandler, { passive: false });

        updateZoom();
    }

    terminate = () => {
        if (toolbar && contentDiv.contains(toolbar)) {
            contentDiv.removeChild(toolbar);
        }

        if (wheelHandler) {
            contentDiv.removeEventListener('wheel', wheelHandler);
            wheelHandler = null;
        }

        toolbar = null;
        contentDiv = null;
        zoomLevel = 1;
    }
}

export default ZoomToolbar;
