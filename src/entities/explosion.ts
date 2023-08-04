import { AnimatedSprite, Texture } from "pixi.js";
import { MainScreen } from "../screens/mainScreen";


export class Explosion {

    private explosionFrames: Array<string> = [
        "/explosion/00.png",
        "/explosion/10.png",
        "/explosion/19.png",
        "/explosion/28.png",
        "/explosion/37.png",
        "/explosion/46.png",
        "/explosion/55.png",
        "/explosion/64.png",
        "/explosion/71.png",
    ];

    constructor(screen: MainScreen, x: number, y: number) {

        const animatedExplosion = new AnimatedSprite(this.explosionFrames.map((path: string) => Texture.from(path)));

        animatedExplosion.animationSpeed = 0.25;
        animatedExplosion.loop = false;
        animatedExplosion.anchor.set(0.5);
        animatedExplosion.x = x;
        animatedExplosion.y = y;
        animatedExplosion.play();
        animatedExplosion.onComplete = () => {
            screen.removeChild(animatedExplosion);
        };

        screen.addChild(animatedExplosion);
    }
}