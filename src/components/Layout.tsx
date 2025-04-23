import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { toast } = useToast();

  useEffect(() => {
    // Check if Supabase is configured - in GitHub Pages deployment, we might skip this
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey && (!supabaseUrl.includes('your_') && !supabaseKey.includes('your_'))) {
      // Only show toast if keys seem to be real but connection fails
      if (!supabase) {
        toast({
          title: "Supabase connection issue",
          description: "Could not connect to Supabase. Some features may be limited.",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
