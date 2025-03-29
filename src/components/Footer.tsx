
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-brand-blue mb-4">KII Impact</h3>
            <p className="text-gray-600 text-sm">
              Connecting communities with the resources they need to thrive. Find local centers, programs, and experts in your area.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-brand-blue transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Resource Map
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/map" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Resource Map
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Partner Directory
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Become a Partner
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Contact</h3>
            <address className="text-sm text-gray-600 not-italic">
              <p>Email: info@kii-impact.org</p>
              <p>Phone: (123) 456-7890</p>
              <p>123 Community Street</p>
              <p>City, State 12345</p>
            </address>
            
            <div className="mt-4">
              <Link to="/contact" className="text-brand-blue hover:underline text-sm">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} KII Impact. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
