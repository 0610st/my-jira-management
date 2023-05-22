import { create } from "zustand";

interface Props {
  tempTaskEpics: string[];
  addTempTaskEpic: (epic: string) => void;
  removeTempTaskEpic: (epic: string) => void;
  toggleTempTaskEpic: (epic: string) => void;
  reset: () => void;
}

export const useTempTaskEpics = create<Props>((set) => ({
  tempTaskEpics: [],
  addTempTaskEpic: (epic: string) =>
    set((state) => ({
      tempTaskEpics: Array.from(new Set(new Set(...state.tempTaskEpics, epic))),
    })),
  removeTempTaskEpic: (epic: string) =>
    set((state) => ({
      tempTaskEpics: state.tempTaskEpics.filter((e) => e !== epic),
    })),
  toggleTempTaskEpic: (epic: string) =>
    set((state) => {
      if (state.tempTaskEpics.includes(epic)) {
        return { tempTaskEpics: state.tempTaskEpics.filter((e) => e !== epic) };
      }
      return { tempTaskEpics: [...state.tempTaskEpics, epic] };
    }),
  reset: () => set({ tempTaskEpics: [] }),
}));
