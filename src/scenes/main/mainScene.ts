import { Assets, Sprite, Container } from "pixi.js";

const createMainScene = async (pixiApp: any) => {
  const mainScene = new Container();
  const backgroundTexture = await Assets.load("/background-main.png");
  const backgroundSprite = new Sprite(backgroundTexture);
  backgroundSprite.width = pixiApp.screen.width;
  backgroundSprite.height = pixiApp.screen.height;

  // Optionally, center the background sprite
  backgroundSprite.anchor.set(0, 0); // Set anchor to the center of the sprite
  mainScene.addChild(backgroundSprite);
  return mainScene;
};

export default createMainScene;
