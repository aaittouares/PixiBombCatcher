import './style.css'
import { Application} from 'pixi.js';
import { MainScreen } from './screens/mainScreen';

let appTag = document.querySelector<HTMLDivElement>('#app');

const pixiApp = new Application<HTMLCanvasElement>({ width: 1280, height: 720, background: "#FFFF00" });

//used for debug with PixiJS Devtools chrome plugin
globalThis.__PIXI_APP__ = pixiApp;

appTag!.appendChild(pixiApp.view);

const screen: MainScreen = new MainScreen(1280, 720);
pixiApp.stage.addChild(screen)
