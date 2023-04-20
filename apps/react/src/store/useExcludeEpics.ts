import { create } from "zustand";

interface Props {
  excludeEpics: string[];
  addExcludeEpic: (epic: string) => void;
  removeExcludeEpic: (epic: string) => void;
  toggleExcludeEpic: (epic: string) => void;
  reset: () => void;
}

export const useExcludeEpics = create<Props>((set) => ({
  excludeEpics: [],
  addExcludeEpic: (epic: string) =>
    set((state) => ({
      excludeEpics: Array.from(new Set(new Set(...state.excludeEpics, epic))),
    })),
  removeExcludeEpic: (epic: string) =>
    set((state) => ({
      excludeEpics: state.excludeEpics.filter((e) => e !== epic),
    })),
  toggleExcludeEpic: (epic: string) =>
    set((state) => {
      if (state.excludeEpics.includes(epic)) {
        return { excludeEpics: state.excludeEpics.filter((e) => e !== epic) };
      } else {
        return { excludeEpics: [...state.excludeEpics, epic] };
      }
    }),
  reset: () => set({ excludeEpics: [] }),
}));
