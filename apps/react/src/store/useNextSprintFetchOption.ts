import { create } from "zustand";

interface Props {
  open: boolean;
  toggleOpen: () => void;
}

export const useNextSprintFetchOption = create<Props>((set) => ({
  open: true,
  toggleOpen: () => set((state) => ({ open: !state.open })),
}));
