import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-card text-card-foreground border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About KII-Impact</h3>
            <p className="text-muted-foreground">
              Connecting communities with resources and partners to create sustainable impact.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
              <li><Link to="/resources" className="text-muted-foreground hover:text-primary">Resources</Link></li>
              <li><Link to="/partners" className="text-muted-foreground hover:text-primary">Partners</Link></li>
              <li><Link to="/map" className="text-muted-foreground hover:text-primary">Map</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/resources/education" className="text-muted-foreground hover:text-primary">Education</Link></li>
              <li><Link to="/resources/healthcare" className="text-muted-foreground hover:text-primary">Healthcare</Link></li>
              <li><Link to="/resources/community" className="text-muted-foreground hover:text-primary">Community Development</Link></li>
              <li><Link to="/resources/environment" className="text-muted-foreground hover:text-primary">Environment</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: info@kii-impact.org</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Impact Street</li>
              <li>City, State 12345</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} KII-Impact. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
