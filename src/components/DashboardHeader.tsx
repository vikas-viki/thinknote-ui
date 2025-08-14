import { Plus, User } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const DashboardHeader = ({ setShowModal }: { setShowModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { user, logout } = useAuthStore();

    return (
        <header className="border-b z-100 border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-black">ThinkNote</h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
                    >
                        <Plus size={20} />
                    </button>
                    <div className="relative group">
                        <button
                            className="bg-gray-200 p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                        >
                            <User size={20} />
                        </button>
                        <div
                            className="absolute opacity-0 z-50 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none right-0 top-7 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg py-2 w-32"
                        >
                            <div className="px-4 py-2 text-sm text-gray-600 border-b border-gray-100">
                                {user?.username}
                            </div>
                            <button
                                onClick={logout}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default DashboardHeader