import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "text-brand-blue" : "";
  };

  return (
    <header className="w-full bg-background shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl text-brand-blue">KII Impact</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`font-medium hover:text-brand-blue transition-colors ${isActive('/')}`}>
            Home
          </Link>
          <Link to="/about" className={`font-medium hover:text-brand-blue transition-colors ${isActive('/about')}`}>
            About
          </Link>
          <Link to="/programs" className={`font-medium hover:text-brand-blue transition-colors ${isActive('/programs')}`}>
            Programs
          </Link>
          <Link to="/partners" className={`font-medium hover:text-brand-blue transition-colors ${isActive('/partners')}`}>
            Partners
          </Link>
          <Link to="/map" className={`font-medium hover:text-brand-blue transition-colors ${isActive('/map')}`}>
            Resource Map
          </Link>
          <Button asChild size="sm">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white p-4 border-t">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`font-medium px-2 py-1 hover:text-brand-blue transition-colors ${isActive('/')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`font-medium px-2 py-1 hover:text-brand-blue transition-colors ${isActive('/about')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/programs" 
              className={`font-medium px-2 py-1 hover:text-brand-blue transition-colors ${isActive('/programs')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Programs
            </Link>
            <Link 
              to="/partners" 
              className={`font-medium px-2 py-1 hover:text-brand-blue transition-colors ${isActive('/partners')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Partners
            </Link>
            <Link 
              to="/map" 
              className={`font-medium px-2 py-1 hover:text-brand-blue transition-colors ${isActive('/map')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Resource Map
            </Link>
            <Button asChild size="sm" className="w-full">
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
