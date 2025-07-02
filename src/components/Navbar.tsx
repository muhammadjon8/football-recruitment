import { NavLink } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Players", path: "/player" },
  { name: "Clubs", path: "/clubs" },
  { name: "Pricing", path: "/pricing" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-gray-100 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {navLinks.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `text-black font-medium hover:text-yellow-300 transition ${
                  isActive ? "underline underline-offset-4" : ""
                }`
              }
            >
              {name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );

}
