import { useEffect, useState } from "react";
import "./App.css";
import { Application, Assets, Sprite, Container } from "pixi.js";
import { drawFunctionButton } from "./scenes/main/button";

function App() {
  let pixiApp;
  async function initPixi() {
    pixiApp = new Application();
    await pixiApp.init({
      width: 441,
      height: 787,
      resolution: window.devicePixelRatio || 1,
    });

    document.body.appendChild(
      pixiApp?.renderer.view.canvas as unknown as HTMLCanvasElement
    );

    const mainScene = new Container();
    const backgroundTexture = await Assets.load("/background-main.png");
    const backgroundSprite = new Sprite(backgroundTexture);
    backgroundSprite.width = pixiApp.screen.width;
    backgroundSprite.height = pixiApp.screen.height;

    // Optionally, center the background sprite
    backgroundSprite.anchor.set(0, 0); // Set anchor to the center of the sprite
    mainScene.addChild(backgroundSprite);
    pixiApp.stage.addChild(mainScene);

    drawFunctionButton(mainScene, pixiApp);
  }

  useEffect(() => {
    initPixi();
  }, []);
  return <main className="container"></main>;
}

export default App;
