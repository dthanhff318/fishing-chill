import { useEffect } from "react";
import "./App.css";
import { Application } from "pixi.js";
import { drawFunctionButton } from "./scenes/main/button";
import createMainScene from "./scenes/main/mainScene";
import createInfoUser from "./pixiUtils/infoUser";

function App() {
  let pixiApp;
  async function initPixi() {
    pixiApp = new Application();
    await pixiApp.init({
      width: 441,
      height: 787,
      resolution: window.devicePixelRatio || 1,
    });

    const root = document.querySelector("#root");
    if (!root) return;
    root.appendChild(
      pixiApp?.renderer.view.canvas as unknown as HTMLCanvasElement
    );

    const userInfoPanel = await createInfoUser(pixiApp);
    const mainScene = await createMainScene(pixiApp);

    pixiApp.stage.addChild(userInfoPanel);
    pixiApp.stage.addChild(mainScene);

    drawFunctionButton(mainScene, pixiApp);
  }

  useEffect(() => {
    initPixi();
  }, []);
  return <main className="container"></main>;
}

export default App;
