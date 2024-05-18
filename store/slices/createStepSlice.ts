import { StateCreator } from "zustand";

type StepSlice = {
  step: number;
  increaseStep: (step: number) => void;
  decreaseStep: (step: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  
};

const createStepSlice: StateCreator<StepSlice> = (set) => ({
  step: 1,
  loading: false,
  setLoading: (loading) => set((state) => ({...state, loading: loading})),
  increaseStep: (step) => set((state) => ({ ...state, step: step + 1 })),
  decreaseStep: (step) => set((state) => ({ ...state, step: step - 1 })),
});

export default createStepSlice;
export type { StepSlice };