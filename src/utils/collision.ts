import { DisplayObject } from "pixi.js";

export function checkAABBCollision(r1: DisplayObject, r2: DisplayObject): boolean {

    const bounds1 = r1.getBounds();
    const bounds2 = r2.getBounds();

    return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;
};