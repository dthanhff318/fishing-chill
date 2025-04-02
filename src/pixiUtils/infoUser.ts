import { Assets, Sprite, Container, Text } from "pixi.js";

type TInfoUser = {
  name: string;
  level: number;
  tin: number;
};
const userInfoObject = {
  name: null as any,
  level: null as any,
  tin: null as any,
};
const createInfoUser = async (pixiApp: any) => {
  const userInfoPanel = new Container();
  userInfoPanel.x = 0;
  userInfoPanel.y = 0;
  userInfoPanel.zIndex = 1;
  const bgPanel = await Assets.load("/infoUserPanel.png");
  const bgPanelSprite = new Sprite(bgPanel);
  bgPanelSprite.x = 0;
  bgPanelSprite.y = 0;
  bgPanelSprite.width = 250;
  bgPanelSprite.height = 120;

  userInfoObject.name = new Text("Tizz", {
    fontSize: 24,
    fill: 0xffffff,
    align: "center",
  });
  userInfoObject.name.x = 100;
  userInfoObject.name.y = 300;
  userInfoPanel.addChild(userInfoObject.name);

  userInfoPanel.addChild(bgPanelSprite);

  return userInfoPanel;
};

export const updateInfoUser = ({ name, level, tin }: Partial<TInfoUser>) => {
  userInfoObject.name.text = name;
};

export default createInfoUser;
