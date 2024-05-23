import { create } from "zustand";

interface NextSprintPointProps {
  points: { key: string; point: number }[];
  setPoint: (record: { key: string; point: number }) => void;
  removePoint: (key: string) => void;
  reset: () => void;
}

export const useNextSprintPoint = create<NextSprintPointProps>((set) => ({
  points: [],
  setPoint: (record: { key: string; point: number }) =>
    set((state) => {
      const filteredItems = state.points.filter(
        (item) => item.key !== record.key,
      );
      return { points: [...filteredItems, record] };
    }),
  removePoint: (key: string) =>
    set((state) => {
      const newItems = state.points.filter((item) => item.key !== key);
      return { points: newItems };
    }),
  reset: () => set({ points: [] }),
}));
