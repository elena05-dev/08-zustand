import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NoteTag } from '@/types/note';

type Draft = {
  title: string;
  content: string;
  tag: NoteTag;
};

type NoteStore = {
  draft: Draft;
  setDraft: (note: Partial<Draft>) => void;
  clearDraft: () => void;
};

const initialDraft: Draft = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
    },
  ),
);
