import { BitmapText } from "pixi.js";
import { MainScreen } from "../screens/mainScreen";

export class ScoreCounter {

    private bmText: BitmapText;
    private points: number;

    constructor ( screen: MainScreen){

        this.points = 0;

        this.bmText = new BitmapText("Score 0",
        {
            fontName: "comic 32",
            fontSize: 32,
            tint: 0xFF0000 
        });
    
        screen.addChild(this.bmText);
    }

    update(points: number) {

        this.points += points;

        this.bmText.text = "Score " + this.points;
    }
}
