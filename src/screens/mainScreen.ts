import { Container, Ticker, BitmapFont, Sprite, BitmapText } from "pixi.js";
import { checkAABBCollision } from "../utils/collision";
import { Bomb } from "../entities/bomb";
import { Explosion } from "../entities/explosion";
import { Ground } from "../entities/ground";
import { ScoreCounter } from "../ui/score";
import { LifeCounter } from "../ui/life";

export class MainScreen extends Container {
    private readonly screenWidth: number;
    private readonly screenHeight: number;

    private ground: Ground;
    private bombs: Bomb[] = [];
    public score: ScoreCounter;
    private lives: LifeCounter;
    private difficulty: number = 1;
    //private ticker: Ticker;

    private elapsed = 0.0;
    private totalElapsed = 0.0;

    constructor(screenWidth: number, screenHeight: number) {
        super();

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        const background = Sprite.from('/game-background-png-4.png');
        background.width = this.screenWidth;
        background.height = this.screenHeight;
        this.addChild(background);

        BitmapFont.from("comic 32", {
            fill: "#ffffff", // White, will be colored later
            fontFamily: "Arial",
            fontSize: 32
        })

        this.ground = new Ground(this);
        this.score = new ScoreCounter(this);
        this.lives = new LifeCounter(this);


        for (let i = 0; i < this.difficulty; i++) {
            let bomb = new Bomb({ x: Math.floor(Math.random() * (3 - -3 + 1) * 0.1 * this.difficulty) + -3, y: 0.1 * this.difficulty }, this);
            this.bombs.push(bomb);
        }

        /*this.ticker =*/ Ticker.shared.add(this.update, this);
    }

    private update(deltaTime: number): void {
        // Add the time to our total elapsed time
        this.elapsed += deltaTime / 60;
        this.totalElapsed += deltaTime / 60;

        if (this.elapsed >= 10) {
            this.elapsed = 0;
            this.difficulty += 1;
        }

        this.bombs.forEach((bomb, index) => {

            if (bomb.sprite) {
                bomb.update(this.screenWidth, this.screenHeight);

                //check for a collision between the bomb and the ground
                if (checkAABBCollision(bomb.sprite, this.ground.rectangle)) {

                    console.log("hit from bomb" + index)
                    new Explosion(this, bomb.sprite.x, bomb.sprite.y)
                    bomb.sprite.destroy();
                    bomb.sprite = undefined;

                    this.lives.loseLife();
                }
            }
        })

        // clean used bombs from array for garbage collector
        this.bombs = this.bombs.filter(bomb => bomb.sprite !== undefined);

        if (this.lives.getLives() === 0) {
            this.bombs.forEach((bomb) => {
                if (bomb.sprite) {
                    bomb.sprite.destroy();
                    bomb.sprite = undefined;
                }
            });

            const bmText = new BitmapText("GAME OVER",
                {
                    fontName: "comic 32",
                    fontSize: 32,
                    tint: 0xFF0000
                });

            bmText.x = this.screenWidth / 2 - 50;
            bmText.y = this.screenHeight / 2;

            this.addChild(bmText);
            //this.ticker.stop();
        }

        if (this.lives.getLives() !== 0 && this.bombs.length < this.difficulty) {
            let bomb = new Bomb({ x: Math.floor(Math.random() * (3 - -3 + 1) * 0.1 * this.difficulty) + -3, y: 0.1 * this.difficulty }, this);
            this.bombs.push(bomb);
        }
    }
}

