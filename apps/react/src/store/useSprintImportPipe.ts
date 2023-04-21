import { create } from "zustand";

interface Props {
  sprintIds: number[];
  currentId: number | null;
  setSprintIds: (sprintIds: number[]) => void;
  startStep: () => void;
  nextStep: () => void;
  resetStep: () => void;
}

export const useSprintImportPipe = create<Props>((set) => ({
  sprintIds: [],
  currentId: null,
  setSprintIds: (sprintIds) => set({ sprintIds }),
  startStep: () =>
    set((state) => ({
      currentId: state.sprintIds.length > 0 ? state.sprintIds[0] : null,
    })),
  nextStep: () =>
    set((state) => {
      if (state.currentId === null) {
        return { currentId: null };
      }
      const nextIndex = state.sprintIds.indexOf(state.currentId) + 1;
      if (nextIndex === 0) {
        return { currentId: null };
      }
      if (nextIndex >= state.sprintIds.length) {
        return { currentId: null };
      }
      return { currentId: state.sprintIds[nextIndex] };
    }),
  resetStep: () => set({ currentId: null }),
}));
