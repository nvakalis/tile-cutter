export function setupImageDrop(startLoadingCallback) {
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        document.addEventListener(eventName, preventDefaults, false);
    });

    document.addEventListener('drop', e => {
        const file = e.dataTransfer.files[0];
        if (!file || !file.type.startsWith('image/')) {
            alert('Please drop a valid image file.');
            return;
        }

        const objectUrl = URL.createObjectURL(file);

        try {
            startLoadingCallback(objectUrl);
        } catch (err) {
            alert('An error occurred while loading the image.');
            console.error(err);
        }
    });
}
