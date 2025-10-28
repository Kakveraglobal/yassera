import { Search, ShoppingBag, Menu, User, Heart } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  isScrolled: boolean;
}

export default function Header({ isScrolled }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    'New',
    'Women',
    'Men',
    'Jewelry & Watches',
    'Leather Goods',
    'Accessories',
    'Shoes',
    'Ready-to-Wear',
    'Gifts',
    'Art of Living'
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-white'
      }`}
    >
      <div className="border-b border-gray-200">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-50 transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex-1 lg:flex-none">
              <h1 className="text-2xl font-light tracking-wider text-center lg:text-left">
                YASSÉRA
              </h1>
            </div>

            <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm font-light tracking-wide hover:text-gray-600 transition-colors relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-50 transition-colors rounded-full" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>
              <button className="hidden sm:block p-2 hover:bg-gray-50 transition-colors rounded-full" aria-label="Wishlist">
                <Heart className="w-5 h-5" />
              </button>
              <button className="hidden sm:block p-2 hover:bg-gray-50 transition-colors rounded-full" aria-label="Account">
                <User className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-50 transition-colors rounded-full" aria-label="Shopping bag">
                <ShoppingBag className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
          <nav className="max-w-screen-2xl mx-auto px-6 py-4">
            {menuItems.map((item) => (
              <a
                key={item}
                href="#"
                className="block py-3 text-sm font-light tracking-wide hover:text-gray-600 transition-colors border-b border-gray-100 last:border-0"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
