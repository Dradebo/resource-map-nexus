
import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real implementation, this would send the form data to a server
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-700 mb-6">
              We'd love to hear from you. Please fill out the form and we'll get back to you as soon as possible.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={4} required />
              </div>
              
              <Button type="submit" className="w-full md:w-auto">Send Message</Button>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4 mb-8">
              <div>
                <p className="font-medium">Email</p>
                <a href="mailto:info@kii-impact.org" className="text-brand-blue hover:underline">
                  info@kii-impact.org
                </a>
              </div>
              
              <div>
                <p className="font-medium">Phone</p>
                <p>(123) 456-7890</p>
              </div>
              
              <div>
                <p className="font-medium">Address</p>
                <p>123 Community Drive</p>
                <p>City, State 12345</p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-3">Office Hours</h3>
            <p className="mb-1">Monday - Friday: 9:00 AM - 5:00 PM</p>
            <p>Saturday - Sunday: Closed</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
