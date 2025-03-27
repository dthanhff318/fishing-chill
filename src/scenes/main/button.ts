import { Assets, Sprite } from "pixi.js";
import { createPopup } from "../../components/modal";
export const drawFunctionButton = (scene: any) => {
  const listButtons = "https://pixijs.com/assets/bunny.png";
  Assets.load(listButtons).then((texture) => {
    const positions = [
      { x: 100, y: 100 },
      { x: 300, y: 100 },
      { x: 500, y: 100 },
      { x: 100, y: 300 },
      { x: 300, y: 300 },
      { x: 500, y: 300 },
    ];

    // Tạo và cấu hình 6 button
    positions.forEach((pos, index) => {
      const btn = new Sprite(texture);
      btn.x = pos.x;
      btn.y = pos.y;
      btn.anchor.set(0.5);
      btn.interactive = true;
      //   btn.buttonMode = true;
      btn.on("pointerdown", () => {
        console.log(`Button ${index + 1} clicked`);
        const popup = createPopup(scene);
        popup.visible = true;
      });

      scene.addChild(btn);
    });
  });
};
