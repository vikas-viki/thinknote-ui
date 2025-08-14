import { create } from 'zustand';
import { noteColors, notesPerPage } from '../lib/constants';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { api } from '../lib/clients';

export interface Note {
  id: string;
  title: string;
  note: string;
  updatedAt: Date;
}

interface NotesState {
  notes: Note[];
  notesData: Record<string, Note>;
  pageCount: number;
  addNote: (title: string, note: string) => void;
  editNote: (id: string, title: string, note: string) => void;
  deleteNote: (id: string) => void;
  setNotes: (notes: Note[]) => void;
  getColor: (i: number) => string;
  getNotes: (page: number) => Promise<void>;
  getNoteData: (id: string) => Promise<Note>;
}


export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  notesData: {},
  pageCount: 0,
  setNotes: (notes) => {
    set({ notes: notes });
  },
  getColor: (i) => {
    const colors = Object.keys(noteColors);
    return noteColors[colors[i % colors.length] as keyof typeof noteColors];
  },
  getNoteData: async (id) => {
    const notesData = get().notesData;
    if (notesData[id]) return notesData[id];
    try {
      const response = await api.get(`/notes/${id}`);
      const note = response.data;

      set({
        notesData: {
          ...notesData,
          [id]: note
        }
      });
      return note;
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        toast.error(e.response?.data.message);
      } else {
        toast.error("Error getting note data!");
      }
    }
  },
  getNotes: async (page) => {
    try {
      let existingNotes = get().notes;
      console.log("getting notes for ", page, existingNotes.length);
      if (Math.ceil(existingNotes.length / notesPerPage) >= page) return;

      const response = await api.get(`/notes?page=${page}`);
      const notes = response.data.notes;
      const pageCount = response.data.pageCount;
      console.log("got ", notes.length)
      existingNotes.push(...notes);
      existingNotes = [
        ...new Map(existingNotes.map(note => [note.id, note])).values()
      ];

      set({
        notes: existingNotes,
        pageCount
      })
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        toast.error(e.response?.data.message);
      } else {
        toast.error("Error getting notes!");
      }
    }
  },
  addNote: async (title: string, note: string) => {
    try {
      const response = await api.post("/notes", { note, title });
      toast.success(response.data.message);
      const newNote: Note = {
        id: response.data.noteId,
        title,
        note,
        updatedAt: new Date(),
      };
      set((state) => ({ notes: [...state.notes, newNote] }));
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        toast.error(e.response?.data.message);
      } else {
        toast.error("Error adding note!");
      }
    }
  },

  editNote: async (id: string, title: string, _note: string) => {
    try {
      await api.patch(`/notes`, { note: _note, id, title });
      toast.success("Note updated successfully!");
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === id ? { ...note, title, note: _note, date: new Date() } : note
        ),
      }));
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        toast.error(e.response?.data.message);
      } else {
        toast.error("Error updating note!");
      }
    }
  },

  deleteNote: async (id: string) => {
    try {
      await api.delete(`/notes/${id}`);
      toast.success('Note deleted successfully!');
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== id),
      }));
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        toast.error(e.response?.data.message);
      } else {
        toast.error("Error updating note!");
      }
    }
  },
}));