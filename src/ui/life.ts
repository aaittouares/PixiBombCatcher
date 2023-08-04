import { BitmapText } from "pixi.js";
import { MainScreen } from "../screens/mainScreen";

export class LifeCounter {

    private bmText: BitmapText;
    private lives: number;

    constructor ( screen: MainScreen){

        this.lives = 9;

        this.bmText = new BitmapText("Lives 9",
        {
            fontName: "comic 32",
            fontSize: 32, // Making it too big or too small will look bad
            tint: 0xFF0000 // Here we make it red.
        });

        this.bmText.x= 700;
    
        screen.addChild(this.bmText);
    }

    loseLife() {
        if (this.lives > 0) this.lives--;       

        this.bmText.text = "Lives " + this.lives;
    }

    getLives(){
        return this.lives;
    }
}
