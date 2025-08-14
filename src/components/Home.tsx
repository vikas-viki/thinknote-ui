import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white select-none flex flex-col items-center justify-center relative overflow-hidden">

      <div className="absolute top-10 left-12 w-40 h-40 bg-blue-100 rounded-2xl shadow-sm"></div>
      <div className="absolute bottom-20 right-12 w-44 h-44 bg-rose-100 rounded-2xl shadow-sm"></div>
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-green-100 rounded-2xl shadow-sm"></div>
      <div className="absolute bottom-1/3 left-1/4 w-28 h-28 bg-yellow-100 rounded-2xl shadow-sm"></div>
      <div className="absolute top-1/2 left-12 w-36 h-36 bg-purple-100 rounded-2xl shadow-sm"></div>


      <h1 className="text-6xl font-extrabold mb-6 text-black z-10">ThinkNote</h1>
      <p className="max-w-2xl text-lg text-gray-600 mb-8 text-center z-10">
        Your thoughts, organized beautifully. Simple, elegant note-taking for the modern mind.
      </p>
      <button
        onClick={() => {
          navigate('/auth')
        }}
        className="px-6 py-3 bg-black text-white rounded-lg text-lg hover:bg-gray-800 z-10">
        Get Started
      </button>

      <footer className="absolute bottom-6 text-gray-500 text-sm z-10">
        © {new Date().getFullYear()} ThinkNote. All rights reserved.
      </footer>
    </div>
  );
}
