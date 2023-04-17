import { create } from "zustand";

interface useTaskLabelStoreProps {
  taskLabels: string[];
  setTaskLabels: (storyLabels: string[]) => void;
}

export const useTaskLabels = create<useTaskLabelStoreProps>((set) => ({
  taskLabels: ["工数対象"],
  setTaskLabels: (taskLabels: string[]) => set({ taskLabels }),
}));
