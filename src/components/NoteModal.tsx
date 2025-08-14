import React from 'react';
import { Loader2, X } from 'lucide-react';
import { Note } from '../stores/notesStore';
import { NoteCardStatus } from './NoteCard';

interface NoteViewModalProps {
    note: Note & { color: string } | null;
    onClose: () => void;
    state: NoteCardStatus
}

const NoteViewModal: React.FC<NoteViewModalProps> = ({ note, onClose, state }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 scrollbar-none flex items-center justify-center z-50 font-poppins">
            <div className="bg-white rounded-[35px] p-6 w-full max-w-2xl m-4 relative max-h-[80vh]">
                {
                    state == NoteCardStatus.LOADING ? (
                        <div>
                            <Loader2 className='animate-spin' />
                        </div>
                    ) : (
                        <div
                            className={`${note!.color} rounded-3xl max-h-[70vh] overflow-y-auto thin-scrollbar`}
                        >
                            <div className="sticky top-0 z-10 p-6 bg-inherit rounded-t-3xl flex items-start justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-600 mb-2">Title</h3>
                                    <h1 className="text-2xl font-bold text-black">{note!.title}</h1>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-6 pt-0 space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-600 mb-2">Content</h3>
                                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                                        {note!.note}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-600 mb-2">Date</h3>
                                    <p className="text-gray-700 font-medium">{new Date(note!.updatedAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>

    );
};

export default NoteViewModal;