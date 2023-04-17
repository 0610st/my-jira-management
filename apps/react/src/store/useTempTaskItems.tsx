import { create } from "zustand";

export interface ItemProps {
  name: string;
  estimatedHour: number;
}

interface useTempTaskItemsStoreProps {
  items: ItemProps[];
  setItems: (items: ItemProps[]) => void;
  replaceItem: (item: ItemProps, index: number) => void;
  addItem: (item: ItemProps) => void;
  removeItem: (index: number) => void;
}

const INITIAL_ITEMS: ItemProps[] = [
  { name: "テストケース作成", estimatedHour: 2 },
  { name: "E2Eスクリプト作成", estimatedHour: 2 },
  { name: "テスト実施", estimatedHour: 1 },
  { name: "STG環境デプロイ", estimatedHour: 1 },
];

export const useTempTaskItems = create<useTempTaskItemsStoreProps>((set) => ({
  items: INITIAL_ITEMS,
  setItems: (items: ItemProps[]) => set({ items }),
  replaceItem: (item: ItemProps, index: number) => {
    set((state) => {
      const newItems = [...state.items];
      newItems[index] = item;
      return { items: newItems };
    });
  },
  addItem: (item: ItemProps) => {
    set((state) => ({
      items: [...state.items, item],
    }));
  },
  removeItem: (index: number) => {
    set((state) => ({
      items: state.items.filter((_, idx) => idx !== index),
    }));
  },
}));
