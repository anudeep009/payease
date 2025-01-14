import { Search, User, Wallet, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section with menu and logo */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full lg:hidden">
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
            <Link to={"/home"}>
            <div className="text-blue-600 font-bold text-2xl">PayEase</div>         
            </Link>
          </div>

          {/* Center section with search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search by username to make payment"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Right section with actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Wallet className="h-6 w-6 text-gray-700" />
            </button>
            <Link to={"/dashboard"}>
              <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-full">
              <User className="h-6 w-6 text-gray-700" />
              <span className="hidden lg:inline text-sm font-medium">Profile</span>
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>
    </header>
  );
}

export default Header;