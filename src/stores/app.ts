import create from "zustand";

type AppStore = {
  error: boolean;
  setState: (data: any) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  error: false,
  setState: (data) => {
    set(data);
  },
}));
