// example-trigger.js

let keydownHandler = null;

/**
 * Sets up a keypress listener that triggers example mode when 'E' is pressed.
 * @param {Function} callback - Called when the 'E' key is pressed.
 */
export function setupExampleTrigger(callback) {
  if (keydownHandler) removeExampleTrigger();

  keydownHandler = event => {
    if (event.key.toLowerCase() === 'e') {
      callback();
      removeExampleTrigger();
    }
  };

  window.addEventListener('keydown', keydownHandler);
}

/**
 * Removes the keypress listener for example mode.
 */
function removeExampleTrigger() {
  if (keydownHandler) {
    window.removeEventListener('keydown', keydownHandler);
    keydownHandler = null;
  }
}
