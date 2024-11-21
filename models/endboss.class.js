class Endboss extends MovableObject {
    y = 50;
    width = 300;
    height = 400;
    x = 2500;
    offset = {
        top: 150,
        bottom: 80,
        left: 60,
        right: 60
    };

    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    soundManager = new SoundManager();
    endboss_hit_sound = new Audio('audio/endboss-hit.mp3');
    endboss_dead_sound = new Audio('audio/win.mp3');

    deadSoundPlayed = false;

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 1;
        this.animate();
        this.soundManager = world.soundManager;
        this.soundManager.registerSound(this.endboss_hit_sound);
        this.soundManager.registerSound(this.endboss_dead_sound);
    }

    animate() {
        setInterval(() => {
            if (this.defenseEndbossStart() && !this.isDead() && !this.isHurt()) {
                this.moveLeft();
                this.world.showEndbossStatus = true;
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                if (!this.deadSoundPlayed) {
                    this.soundManager.playSound(this.endboss_dead_sound);
                    this.deadSoundPlayed = true;
                }
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(() => {
                    this.endboss_dead_sound.pause();
                    this.endboss_dead_sound.currentTime = 0; // Setzt die Wiedergabe zurück
                }, 4000);
            } else if (this.isHurt() && !this.isDead()) {
                this.soundManager.playSound(this.endboss_hit_sound);
                this.playAnimation(this.IMAGES_HURT);
                setTimeout(() => {
                    this.playAnimation(this.IMAGES_ATTACK);
                }, 2000);
            } else if (this.defenseEndbossStart() && !this.isDead()) {
                this.playAnimation(this.IMAGES_WALK);
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 200);

    }
} 