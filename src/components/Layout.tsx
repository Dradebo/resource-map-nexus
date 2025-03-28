
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
    // Check if Supabase is configured
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      toast({
        title: "Supabase not configured",
        description: "Please set your Supabase credentials in the .env file",
        variant: "destructive",
      });
    }
  }, [toast]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
