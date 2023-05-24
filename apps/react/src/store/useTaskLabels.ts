import { create } from "zustand";

interface TaskLabelStoreProps {
  taskLabels: string[];
  setTaskLabels: (storyLabels: string[]) => void;
}

export const useTaskLabels = create<TaskLabelStoreProps>((set) => ({
  taskLabels: ["工数対象"],
  setTaskLabels: (taskLabels: string[]) => set({ taskLabels }),
}));
