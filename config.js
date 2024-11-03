// config.js

let is24x7Mode = false;
let autoplayEnabled = false;

module.exports = {
    is24x7Mode,
    autoplayEnabled,
    toggle24x7Mode: () => (is24x7Mode = !is24x7Mode),
    toggleAutoplay: () => (autoplayEnabled = !autoplayEnabled)
};