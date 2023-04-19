import { create } from "zustand";

interface useStoryLabelStoreProps {
  storyLabels: string[];
  setStoryLabels: (storyLabels: string[]) => void;
}

export const useStoryLabels = create<useStoryLabelStoreProps>((set) => ({
  storyLabels: ["ポイント対象"],
  setStoryLabels: (storyLabels: string[]) => set({ storyLabels }),
}));
