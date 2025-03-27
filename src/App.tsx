import { useEffect, useState } from "react";
import "./App.css";
import { Application, Assets, Sprite, Container } from "pixi.js";
import { drawFunctionButton } from "./scenes/main/button";
import { loaderAsset } from "./pixiUtils/loader";

function App() {
  let pixiApp;
  async function initPixi() {
    pixiApp = new Application();
    await pixiApp.init({ background: "#383c3d", resizeTo: window });
    document.body.appendChild(pixiApp?.canvas);

    const mainScene = new Container();
    const texture = await Assets.load("https://pixijs.com/assets/bunny.png");
    const bunny = new Sprite(texture);
    bunny.anchor.set(0.5);
    bunny.x = pixiApp.screen.width / 2;
    bunny.y = pixiApp.screen.height / 2;

    // const resource = await loaderAsset();

    pixiApp.stage.addChild(mainScene);

    drawFunctionButton(mainScene);
  }

  useEffect(() => {
    initPixi();
  }, []);
  return <main className="container"></main>;
}

export default App;
