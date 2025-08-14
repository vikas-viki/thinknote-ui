import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  onClose: () => void;
  onSubmit: (title: string, content: string) => void;
  initialTitle?: string;
  initialContent?: string;
  isEditing?: boolean;
}

const Modal: React.FC<ModalProps> = ({ 
  onClose, 
  onSubmit, 
  initialTitle = '', 
  initialContent = '', 
  isEditing = false 
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit(title.trim(), content.trim());
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-poppins">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md m-4 relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-black">
            {isEditing ? 'Edit Note' : 'Create New Note'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              required
            />
          </div>
          
          <div>
            <textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
              required
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
            >
              {isEditing ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;