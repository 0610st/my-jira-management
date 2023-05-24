import { create } from "zustand";

interface StoryLabelStoreProps {
  storyLabels: string[];
  setStoryLabels: (storyLabels: string[]) => void;
}

export const useStoryLabels = create<StoryLabelStoreProps>((set) => ({
  storyLabels: ["ポイント対象"],
  setStoryLabels: (storyLabels: string[]) => set({ storyLabels }),
}));
