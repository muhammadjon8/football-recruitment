import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/talent', label: 'Find Talent' },
  { to: '/jobs', label: 'Find Jobs' },
  { to: '/dashboard', label: 'Dashboard' },
];

const authLinks = [
  { to: '/login', label: 'Sign In' },
  { to: '/candidate/register', label: 'Sign Up' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container flex items-center justify-between h-16 max-w-5xl mx-auto px-4">
        <Link to="/" className="font-bold text-2xl text-blue-600 tracking-wide no-underline">FootballRecruitment</Link>
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-semibold no-underline px-1 pb-1 transition border-b-2 ${location.pathname.startsWith(link.to) ? 'text-blue-600 border-blue-600' : 'text-gray-900 border-transparent hover:text-blue-600'}`}
            >
              {link.label}
            </Link>
          ))}
          {authLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-semibold no-underline px-1 pb-1 transition border-b-2 ml-3 ${location.pathname.startsWith(link.to) ? 'text-blue-600 border-blue-600' : 'text-gray-900 border-transparent hover:text-blue-600'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* Mobile menu button */}
        <button className="md:hidden text-blue-600 text-3xl focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-sm px-4 py-3 flex flex-col gap-3">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`font-semibold no-underline text-lg ${location.pathname.startsWith(link.to) ? 'text-blue-600' : 'text-gray-900 hover:text-blue-600'}`}
            >
              {link.label}
            </Link>
          ))}
          {authLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`font-semibold no-underline text-lg ${location.pathname.startsWith(link.to) ? 'text-blue-600' : 'text-gray-900 hover:text-blue-600'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
