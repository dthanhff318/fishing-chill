import { Text, Graphics } from "pixi.js";
import { createPopup } from "../../components/modal";
export const drawFunctionButton = (scene: any, app: any) => {
  const userInfoPanel = new Graphics();
  userInfoPanel.beginFill(0x8a6b4f);
  userInfoPanel.drawRect(0, 0, 200, 100);
  userInfoPanel.endFill();
  scene.addChild(userInfoPanel);

  const userNameText = new Text({
    text: "Lv36 Gusionn",
    style: {
      fontSize: 24,
      fill: 0xffffff,
      align: "center",
    },
  });
  userNameText.x = 20;
  userNameText.y = 20;
  scene.addChild(userNameText);

  const userExpText = new Text("Exp 203.014K/204.2K", {
    fontSize: 18,
    fill: 0xffffff,
    align: "center",
  });
  userExpText.x = 20;
  userExpText.y = 50;
  scene.addChild(userExpText);

  const userCoinsText = new Text("Coins: 906", {
    fontSize: 18,
    fill: 0xffffff,
    align: "center",
  });
  userCoinsText.x = 20;
  userCoinsText.y = 80;
  scene.addChild(userCoinsText);

  // BUTTON MENU

  const createButton = (text, x, y) => {
    const button = new Graphics();
    button.beginFill(0x4caf50); // Green button
    button.drawRect(0, 0, 100, 40); // Button size
    button.endFill();
    button.x = x;
    button.y = y;

    const buttonText = new Text(text, {
      fontSize: 14,
      fill: 0xffffff,
      align: "center",
    });
    buttonText.x = 10; // Center text
    buttonText.y = 10;
    button.addChild(buttonText);

    button.interactive = true;

    // Add button action (e.g., click event)
    button.on("pointerdown", () => {
      console.log(`${text} clicked`);
    });

    scene.addChild(button);
  };

  // Position buttons on the left side
  createButton("Rank", 10, 120);
  createButton("Shop", 10, 170);
  createButton("Bag", 10, 220);
  createButton("Upgrades", 10, 270);

  /// PLAY

  const playButton = new Graphics();
  playButton.beginFill(0x2d75b0); // Blue button
  playButton.drawRect(0, 0, 200, 50);
  playButton.endFill();
  playButton.x = app.view.width / 2 - 100;
  playButton.y = app.view.height / 2 - 100;

  const playButtonText = new Text("Play", {
    fontSize: 24,
    fill: 0xffffff,
    align: "center",
  });
  playButtonText.x = 50; // Center text
  playButtonText.y = 10;
  playButton.addChild(playButtonText);

  playButton.interactive = true;

  // Add Play button action
  playButton.on("pointerdown", () => {
    console.log("Play button clicked");
    showModal();
  });

  scene.addChild(playButton);

  const showModal = () => {
    // Create the modal background
    const modalBackground = new Graphics();
    modalBackground.beginFill(0x000000, 0.5); // Black with transparency
    modalBackground.drawRect(0, 0, app.view.width, app.view.height);
    modalBackground.endFill();
    modalBackground.x = 0;
    modalBackground.y = 0;

    // Create the modal itself
    const modal = new Graphics();
    modal.beginFill(0xffffff); // White modal
    modal.drawRect(0, 0, 300, app.view.height); // Modal width and height
    modal.endFill();
    modal.x = app.view.width; // Start off-screen to the right
    modal.y = 0;

    // Modal content (for example, a close button and some text)
    const modalText = new Text("This is a modal!", {
      fontSize: 18,
      fill: 0x000000,
      align: "center",
    });
    modalText.x = 20;
    modalText.y = app.view.height / 2 - 10;
    modal.addChild(modalText);

    const closeButton = new Graphics();
    closeButton.beginFill(0xff0000); // Red close button
    closeButton.drawRect(0, 0, 50, 30); // Button size
    closeButton.endFill();
    closeButton.x = 240; // Position inside modal
    closeButton.y = 10;

    const closeButtonText = new Text("Close", {
      fontSize: 14,
      fill: 0xffffff,
      align: "center",
    });
    closeButtonText.x = 12;
    closeButtonText.y = 7;
    closeButton.addChild(closeButtonText);

    closeButton.interactive = true;
    closeButton.on("pointerdown", () => {
      scene.removeChild(modalBackground);
      scene.removeChild(modal);
    });

    modal.addChild(closeButton);

    // Add modal background and modal to the scene
    scene.addChild(modalBackground);
    scene.addChild(modal);

    // Slide modal from right to left
    app.ticker.add((delta) => {
      if (modal.x > app.view.width - 300) {
        modal.x -= 10 * delta; // Speed of the slide
      }
    });
  };
};
