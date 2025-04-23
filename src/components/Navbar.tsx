import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-background shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl text-primary">ResourceHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/partners" className="font-medium hover:text-primary transition-colors">
            Partners
          </Link>
          <Link to="/map" className="font-medium hover:text-primary transition-colors">
            Resource Map
          </Link>
          <Button size="sm">Contact Us</Button>
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
        <div className="md:hidden bg-background border-t">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="font-medium hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/partners"
              className="font-medium hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Partners
            </Link>
            <Link
              to="/map"
              className="font-medium hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Resource Map
            </Link>
            <Button className="w-full">Contact Us</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
