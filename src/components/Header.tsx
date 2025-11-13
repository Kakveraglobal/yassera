import { Search, ShoppingBag, Menu, User, Heart, LogOut, Package, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './auth/LoginModal';
import SignUpModal from './auth/SignUpModal';

interface HeaderProps {
  isScrolled: boolean;
}

interface SubsectionItem {
  name: string;
  subItems?: string[];
}

export default function Header({ isScrolled }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNewDropdown, setShowNewDropdown] = useState(false);
  const [showNewMobile, setShowNewMobile] = useState(false);
  const [hoveredSubsection, setHoveredSubsection] = useState<string | null>(null);
  const [expandedMobileSubsections, setExpandedMobileSubsections] = useState<Set<string>>(new Set());
  const { user, signOut } = useAuth();

  const menuItems = [
    'Men',
    'Women',
    'Bags'
  ];

  const newSubsections: SubsectionItem[] = [
    { name: '2026 Men' },
    { name: '2026 Women' },
    { 
      name: 'Bags',
      subItems: ["Women's bag", "Men's bag"]
    },
    { 
      name: 'Perfume',
      subItems: ['Male', 'Female']
    },
    { name: 'Skin Care' }
  ];

  const toggleMobileSubsection = (subsectionName: string) => {
    setExpandedMobileSubsections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(subsectionName)) {
        newSet.delete(subsectionName);
      } else {
        newSet.add(subsectionName);
      }
      return newSet;
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-bordeaux-50 shadow-sm border-b border-bordeaux-200' : 'bg-bordeaux-50'
      }`}
    >
      <div className="border-b border-bordeaux-300">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-bordeaux-50 transition-colors"
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
              {/* New Section with Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowNewDropdown(true)}
                onMouseLeave={() => setShowNewDropdown(false)}
              >
                <button
                  className="text-sm font-light tracking-wide hover:text-bordeaux-950 transition-colors relative group flex items-center"
                  onClick={() => setShowNewDropdown(!showNewDropdown)}
                >
                  New
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showNewDropdown ? 'rotate-180' : ''}`} />
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-bordeaux-950 transition-all duration-300 group-hover:w-full"></span>
                </button>
                
                {/* Dropdown Menu */}
                {showNewDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-bordeaux-50 rounded-lg shadow-lg border border-bordeaux-300 py-2 z-50">
                    {newSubsections.map((subsection) => (
                      <div
                        key={subsection.name}
                        className="relative"
                        onMouseEnter={() => subsection.subItems && setHoveredSubsection(subsection.name)}
                        onMouseLeave={() => setHoveredSubsection(null)}
                      >
                        <a
                          href="#"
                          className="flex items-center justify-between px-4 py-2 text-sm font-light tracking-wide hover:bg-bordeaux-100 transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            if (!subsection.subItems) {
                              // Handle navigation to subsection (to be implemented)
                              setShowNewDropdown(false);
                            }
                          }}
                        >
                          <span>{subsection.name}</span>
                          {subsection.subItems && (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </a>
                        
                        {/* Nested Submenu */}
                        {subsection.subItems && hoveredSubsection === subsection.name && (
                          <div className="absolute left-full top-0 ml-1 w-48 bg-bordeaux-50 rounded-lg shadow-lg border border-bordeaux-300 py-2 z-50">
                            {subsection.subItems.map((subItem) => (
                              <a
                                key={subItem}
                                href="#"
                                className="block px-4 py-2 text-sm font-light tracking-wide hover:bg-bordeaux-100 transition-colors"
                                onClick={(e) => {
                                  e.preventDefault();
                                  // Handle navigation to sub-item (to be implemented)
                                  setShowNewDropdown(false);
                                }}
                              >
                                {subItem}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Other Menu Items */}
              {menuItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm font-light tracking-wide hover:text-bordeaux-950 transition-colors relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-bordeaux-950 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-bordeaux-50 transition-colors rounded-full" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>
              <button className="hidden sm:block p-2 hover:bg-bordeaux-50 transition-colors rounded-full" aria-label="Wishlist">
                <Heart className="w-5 h-5" />
              </button>
              
              {/* User Account Button */}
              {user ? (
                <div className="hidden sm:block relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="p-2 hover:bg-bordeaux-50 transition-colors rounded-full"
                    aria-label="Account"
                  >
                    <User className="w-5 h-5" />
                  </button>
                  
                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-bordeaux-50 rounded-lg shadow-lg border border-bordeaux-300 py-2 z-50">
                      <div className="px-4 py-2 border-b border-bordeaux-200">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.user_metadata?.full_name || user.email}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          // Navigate to orders page (to be implemented)
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-bordeaux-100 transition-colors"
                      >
                        <Package className="w-4 h-4 mr-2" />
                        My Orders
                      </button>
                      <button
                        onClick={async () => {
                          await signOut();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-bordeaux-950 hover:bg-bordeaux-100 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="hidden sm:block p-2 hover:bg-bordeaux-50 transition-colors rounded-full"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </button>
              )}
              
              <button className="p-2 hover:bg-bordeaux-50 transition-colors rounded-full" aria-label="Shopping bag">
                <ShoppingBag className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-bordeaux-50 border-b border-bordeaux-300 shadow-lg">
          <nav className="max-w-screen-2xl mx-auto px-6 py-4">
            {/* New Section with Mobile Dropdown */}
            <div>
              <button
                onClick={() => setShowNewMobile(!showNewMobile)}
                className="flex items-center justify-between w-full py-3 text-sm font-light tracking-wide hover:text-bordeaux-950 transition-colors border-b border-bordeaux-100"
              >
                <span>New</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showNewMobile ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Mobile Submenu */}
              {showNewMobile && (
                <div className="pl-4 py-2 space-y-1 border-b border-bordeaux-100">
                  {newSubsections.map((subsection) => (
                    <div key={subsection.name}>
                      {subsection.subItems ? (
                        <>
                          <button
                            onClick={() => toggleMobileSubsection(subsection.name)}
                            className="flex items-center justify-between w-full py-2 text-sm font-light text-bordeaux-800 hover:text-bordeaux-950 transition-colors"
                          >
                            <span>{subsection.name}</span>
                            <ChevronDown 
                              className={`w-4 h-4 transition-transform ${
                                expandedMobileSubsections.has(subsection.name) ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                          {expandedMobileSubsections.has(subsection.name) && (
                            <div className="pl-4 py-1 space-y-1">
                              {subsection.subItems.map((subItem) => (
                                <a
                                  key={subItem}
                                  href="#"
                                  className="block py-2 text-sm font-light text-bordeaux-700 hover:text-bordeaux-950 transition-colors"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    // Handle navigation to sub-item (to be implemented)
                                    setShowNewMobile(false);
                                    setIsMenuOpen(false);
                                  }}
                                >
                                  {subItem}
                                </a>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <a
                          href="#"
                          className="block py-2 text-sm font-light text-bordeaux-800 hover:text-bordeaux-950 transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            // Handle navigation to subsection (to be implemented)
                            setShowNewMobile(false);
                            setIsMenuOpen(false);
                          }}
                        >
                          {subsection.name}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Other Menu Items */}
            {menuItems.map((item) => (
              <a
                key={item}
                href="#"
                className="block py-3 text-sm font-light tracking-wide hover:text-bordeaux-950 transition-colors border-b border-bordeaux-100 last:border-0"
              >
                {item}
              </a>
            ))}
            {/* Mobile Auth Links */}
            <div className="mt-4 pt-4 border-t border-bordeaux-200">
              {user ? (
                <>
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    {user.user_metadata?.full_name || user.email}
                  </p>
                  <button
                    onClick={async () => {
                      await signOut();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-sm text-bordeaux-950"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm font-medium"
                >
                  Sign In / Create Account
                </button>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Auth Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignUp={() => {
          setShowLoginModal(false);
          setShowSignUpModal(true);
        }}
      />
      <SignUpModal
        isOpen={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
        onSwitchToLogin={() => {
          setShowSignUpModal(false);
          setShowLoginModal(true);
        }}
      />
    </header>
  );
}
