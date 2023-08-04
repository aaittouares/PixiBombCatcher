import { Graphics } from "pixi.js";
import { MainScreen } from "../screens/mainScreen";

export class Ground {

    public rectangle: Graphics

    constructor(screen: MainScreen) {

        this.rectangle = new Graphics();
        this.rectangle.beginFill(0x66CCFF);
        this.rectangle.drawRect(0, 0, 1280, 100);
        this.rectangle.alpha = 0;
        this.rectangle.endFill();
        this.rectangle.x = 0;
        this.rectangle.y = 620;
        screen.addChild(this.rectangle);

    }

}