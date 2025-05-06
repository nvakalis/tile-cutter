import JSZip from 'jszip';

export function exportImageSlicesToZip(image, rects) {
    if (!image || !rects || !Array.isArray(rects) || rects.length === 0) {
        console.error("Invalid arguments passed to exportImageSlicesToZip");
        return;
    }

    const zip = new JSZip();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    rects.forEach((rect, index) => {
        const { x, y, w, h } = rect;
        canvas.width = w;
        canvas.height = h;

        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(image, x, y, w, h, 0, 0, w, h);

        const dataUrl = canvas.toDataURL('image/png');
        const base64Data = dataUrl.split(',')[1];

        const fileName = `image_${String(index + 1).padStart(2, '0')}.png`;
        zip.file(fileName, base64Data, { base64: true });
    });

    const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
    const zipFilename = `slices_${timestamp}.zip`;

    zip.generateAsync({ type: "blob" }).then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = zipFilename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    });
}



