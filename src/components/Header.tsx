import { User } from 'lucide-react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to={"/home"}>
            <div className="text-blue-600 font-bold text-2xl">PayEase</div>         
            </Link>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Link to={"/dashboard"}>
              <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-full">
              <User className="h-6 w-6 text-gray-700" />
              <span className="hidden lg:inline text-sm font-medium">Profile</span>
            </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;