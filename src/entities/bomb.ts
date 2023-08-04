import { Sprite } from "pixi.js";
import { MainScreen } from "../screens/mainScreen";
import gsap from "gsap";
import { GlowFilter } from "pixi-filters";


type Velocity = {
    x: number;
    y: number;
}

export class Bomb {

    private v: Velocity;
    public sprite?: Sprite;
    private screen: MainScreen;

    constructor(v: Velocity, screen: MainScreen) {
        this.v = v;
        this.screen = screen;

        this.sprite = Sprite.from('/bomb_PNG5.png');

        this.sprite.width = 60;
        this.sprite.height = 60;
        this.sprite.anchor.set(0.5);

        this.sprite.x = Math.floor(Math.random() * (screen.width - this.sprite.width + 1)) + this.sprite.width/2;
        this.sprite.y = this.sprite.height/2;

        screen.addChild(this.sprite);

        const glowFilter = new GlowFilter();
        glowFilter.outerStrength = 0.0;
        glowFilter.innerStrength = 0.0
        glowFilter.color = 0xFF0000;
        glowFilter.alpha = 1;
        this.sprite.filters = [glowFilter];

        gsap.to(glowFilter, {
            outerStrength: 4.0, duration: 0.5, yoyo: true, repeat: -1,
        });

        // events that begin with "pointer" are touch + mouse
        this.sprite.on("pointertap", this.onClick, this);

        // Super important or the object will never receive mouse events!
        this.sprite.eventMode = 'static'
    }

    update(w: number, h: number) {

        if (this.sprite) {
            this.sprite!.x += this.v.x;
            this.sprite!.y += this.v.y;

            if (this.sprite!.x >= w - 20) {

                this.v.x *= -1;
            }

            else if (this.sprite!.x <= 20) {

                this.v.x *= -1;
            }

            if (this.sprite!.y >= h - 20) {

                this.v.y *= -1;
            }
            else if (this.sprite!.y <= 20) {

                this.v.y *= -1;
            }
        }
    }

    private onClick(): void {
     
        this.screen.score.update(50);

        this.sprite?.destroy();
        this.sprite = undefined;        
    }
}