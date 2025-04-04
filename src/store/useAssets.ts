import { create } from "zustand";
type TUseAssets = {
  assets: any;
  setAssets: any;
};
const useAssets = create<TUseAssets>((set) => ({
  assets: [],
  setAssets: (assets: any) => set({ assets }),
}));

export default useAssets;
