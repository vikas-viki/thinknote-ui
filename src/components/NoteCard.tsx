import React, { useState } from 'react'
import { Note } from '../lib/types';
import { useNotesStore } from '../stores/notesStore';
import { Edit, Trash2 } from 'lucide-react';
import NoteViewModal from './NoteModal';

interface NoteCardI {
    i: number; note: Note, setEditingNote: React.Dispatch<React.SetStateAction<Note | null>>, setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export enum NoteCardStatus {
    NOT_OPEN,
    OPEN,
    LOADING,
    LOADED
}

const NoteCard = ({ note, setShowModal, setEditingNote, i }: NoteCardI) => {
    const { deleteNote, getColor, getNoteData, notesData } = useNotesStore();
    const [viewingNote, setViewingNote] = useState<Note & { color: string } | null>(null);
    const [state, setState] = useState<NoteCardStatus>(NoteCardStatus.NOT_OPEN);

    const handleEditNote = (note: Note) => {
        setEditingNote(note);
        setShowModal(true);
    };

    const handleDeleteNote = (id: string) => {
        deleteNote(id);
    };

    const handleViewNote = async (color: string) => {
        console.log(notesData);
        if (!notesData[note.id]) {
            setState(NoteCardStatus.LOADING);
        }
        const _note = await getNoteData(note.id);
        setViewingNote({ ..._note, color });
        setState(NoteCardStatus.LOADED);
    };
    return (
        <>
            <div
                className={`${getColor(i)} p-4 rounded-3xl cursor-pointer border-gray-500 border-[0.5px] group hover:shadow-lg transition-all duration-200 relative`}
                onClick={() => handleViewNote(getColor(i))}
            >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditNote(note)
                        }}
                        className="bg-white p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <Edit size={14} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNote(note.id)
                        }}
                        className="bg-white p-1.5 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>

                <h3 className="font-semibold text-justify text-black mb-2 text-lg line-clamp-1 leading-tight">
                    {note.title}
                </h3>
                <p className="text-gray-700 text-justify text-sm mb-4 line-clamp-4">
                    {note.note}
                </p>
                <p className="text-gray-500 text-xs">
                    {new Date(note.updatedAt).toLocaleDateString()}
                </p>
            </div>
            {
                state != NoteCardStatus.NOT_OPEN && (
                    <NoteViewModal
                        state={state}
                        note={viewingNote}
                        onClose={() => {
                            setState(NoteCardStatus.NOT_OPEN);
                            setViewingNote(null)
                        }}
                    />
                )
            }

        </>
    )
}

export default NoteCard