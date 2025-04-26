import { create } from 'zustand';

const usePromptStore = create((set) => ({
  idea: '',
  title: '',
  prompt: '',
  setData: ({ prompt }) => set({ prompt }),
  clearData: () => set({ prompt: '' }),
}));

export default usePromptStore;
