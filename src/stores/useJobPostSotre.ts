import { create } from 'zustand';

export const useJobPostStore = create<any>((set) => ({
  jobPosts: [],
  setJobPosts: (data: any) => set({ post: data }),
}));
