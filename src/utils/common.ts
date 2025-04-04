export const getAssetByName = (name: string, assets: any) => {
  return assets.find((e) => e.name === name).img;
};
