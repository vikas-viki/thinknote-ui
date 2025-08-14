import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNotesStore, Note } from '../stores/notesStore';
import Modal from './Modal';
import ReactPaginate from 'react-paginate';
import DashboardHeader from './DashboardHeader';
import NoteCard from './NoteCard';
import { notesPerPage } from '../lib/constants';

const Dashboard: React.FC = () => {
  const { notes, addNote, editNote, pageCount, getNotes } = useNotesStore();
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddNote = (title: string, content: string) => {
    if (editingNote) {
      editNote(editingNote.id, title, content);
      setEditingNote(null);
    } else {
      addNote(title, content);
    }
    setShowModal(false);
  };

  useEffect(() => {
    getNotes(1);
  }, []);

  const handlePageChange = async (event: { selected: number; }) => {
    const page = event.selected;
    setCurrentPage(page + 1);
    await getNotes(page + 1);
  }

  const getCurrentPageNotes = useCallback(() => {
    const skip = (currentPage - 1) * notesPerPage;
    return notes.slice(skip, skip + notesPerPage);
  }, [currentPage, notes]);


  return (
    <div className="min-h-screen bg-white font-poppins flex flex-col">
      <DashboardHeader setShowModal={setShowModal} />
      <main className="p-6">
        {notes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">No notes yet</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors duration-200"
            >
              Create Your First Note
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {getCurrentPageNotes().map((note, i) => (
              <NoteCard key={i} note={note} i={i} setEditingNote={setEditingNote} setShowModal={setShowModal} />
            ))}
          </div>
        )}
      </main>
      <footer className='mt-auto mb-4'>
        <ReactPaginate
          className='flex w-full h-max justify-center gap-5 md:gap-10 pt-5 md:pt-10 text-gray-500 cursor-pointer items-center md:text-base text-sm'
          onPageChange={handlePageChange}
          forcePage={currentPage - 1}
          activeClassName='font-bold text-black'
          previousLabel={
            <ChevronLeft className='rounded-sm bg-gray-100 hover:bg-gray-200 text-black transition-all duration-300 cursor-pointer w-7 h-7 md:h-10 md:w-10 p-1 md:p-2 border-1' size={35} />
          }
          nextLabel={
            <ChevronRight className='rounded-sm bg-gray-100 text-black hover:bg-gray-200 transition-all duration-300 cursor-pointer w-7 h-7 md:h-10 md:w-10 p-1 md:p-2 border-1' size={35} />
          }
          renderOnZeroPageCount={null}
          pageCount={pageCount}
        />
      </footer>
      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
            setEditingNote(null);
          }}
          onSubmit={handleAddNote}
          initialTitle={editingNote?.title || ''}
          initialContent={editingNote?.note || ''}
          isEditing={!!editingNote}
        />
      )}

    </div>
  );
};

export default Dashboard;