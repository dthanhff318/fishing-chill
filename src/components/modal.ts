import { Container, Graphics, Text } from "pixi.js";

// Hàm tạo popup
export function createPopup(app: any) {
  console.log(app);

  // Tạo container cho popup
  const popup = new Container();
  popup.x = app.width / 2;
  popup.y = app.height / 2;
  popup.visible = false; // Ẩn popup ban đầu

  // Tạo nền cho popup (ví dụ một hình chữ nhật)
  const bg = new Graphics();
  bg.beginFill(0xffffff, 0.9);
  bg.drawRoundedRect(-150, -100, 300, 200, 10);
  bg.endFill();
  popup.addChild(bg);

  // Thêm text hiển thị thông báo
  const message = new Text("Đây là Popup", {
    fontFamily: "Arial",
    fontSize: 20,
    fill: 0x000000,
  });
  message.anchor.set(0.5);
  popup.addChild(message);

  // Tạo nút đóng cho popup
  const closeButton = new Text("X", {
    fontFamily: "Arial",
    fontSize: 18,
    fill: 0xff0000,
  });
  closeButton.interactive = true;
  closeButton.anchor.set(0.5);
  closeButton.x = 130;
  closeButton.y = -80;
  closeButton.on("pointerdown", () => {
    popup.visible = false;
  });
  popup.addChild(closeButton);

  // Thêm popup vào stage
  app.addChild(popup);

  return popup;
}
