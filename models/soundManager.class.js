class SoundManager {
    constructor() {
        this.sounds = [];
        this.soundOn = false;
    }

    registerSound(audioObject) {
        this.sounds.push(audioObject);
    }

    toggleSound() {
        this.soundOn = !this.soundOn;

        if (!this.soundOn) {
            this.sounds.forEach(sound => {
                sound.pause();
            });
        }
    }

    playSound(sound) {
        if (this.soundOn) {
            sound.play();
        }
    }

    pauseSound(sound) {
        if (!this.soundOn) {
            sound.pause();
            sound.currentTime = 0;
        }
    }
}
