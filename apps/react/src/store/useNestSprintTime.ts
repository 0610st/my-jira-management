import { create } from "zustand";

interface useNestSprintTimeProps {
  times: { key: string; parent: string; time: number }[];
  setTime: (record: { key: string; parent: string; time: number }) => void;
  removeTime: (key: string) => void;
  reset: () => void;
}

export const useNextSprintTime = create<useNestSprintTimeProps>((set, get) => ({
  times: [],
  setTime: (record: { key: string; parent: string; time: number }) =>
    set((state) => {
      const filteredItems = state.times.filter(
        (item) => item.key !== record.key
      );
      return { times: [...filteredItems, record] };
    }),
  removeTime: (key: string) =>
    set((state) => {
      const newItems = state.times.filter((item) => item.key !== key);
      return { times: newItems };
    }),
  reset: () => set({ times: [] }),
}));
