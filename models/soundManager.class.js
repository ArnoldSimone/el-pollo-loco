/**
 * Manages sound playback and toggling of sound states in the game.
 * It allows registering, playing, and pausing sounds based on the sound state.
 */
class SoundManager {
    constructor() {
        this.sounds = [];
        this.soundOn = soundOn;
    }


    /**
     * Registers a sound object to be managed by the SoundManager.
     * The sound object will be added to the `sounds` array for future control.
     * @param {Object} audioObject - The audio object to be registered.
     */
    registerSound(audioObject) {
        this.sounds.push(audioObject);
    }


    /**
     * Toggles the sound state (on/off).
     * If sound is turned off, all registered sounds are paused.
     */
    toggleSound() {
        this.soundOn = !this.soundOn;
        if (!this.soundOn) {
            this.sounds.forEach(sound => {
                sound.pause();
            });
        }
    }


    /**
     * Plays a given sound if the sound is enabled.
     * @param {Object} sound - The sound object to be played.
     */
    playSound(sound) {
        if (this.soundOn) {
            sound.play();
        }
    }


    /**
     * Pauses a given sound if the sound is disabled and resets its playback to the beginning.
     * @param {Object} sound - The sound object to be paused.
     */
    pauseSound(sound) {
        if (!this.soundOn) {
            sound.pause();
            sound.currentTime = 0;
        }
    }
}
