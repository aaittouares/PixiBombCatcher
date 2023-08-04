import { Application } from 'pixi.js';

declare global {
    declare module globalThis {
        var __PIXI_APP__: Application<HTMLCanvasElement>;
    }
 }