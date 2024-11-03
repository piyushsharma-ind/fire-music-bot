// events/playerEvents.js

const { autoplayEnabled, is24x7Mode } = require('../config');

module.exports = {
    setupPlayerEvents: (player, is24x7Mode) => {
        player.on('trackEnd', (queue, track) => {
            if (autoplayEnabled && !queue.tracks.length) {
                player.search(track.title, { requestedBy: queue.metadata.user }).then(x => {
                    if (x.tracks[1]) queue.addTrack(x.tracks[1]);
                    queue.play();
                });
            } else if (is24x7Mode && !queue.tracks.length) {
                queue.play();
            }
        });
    }
};