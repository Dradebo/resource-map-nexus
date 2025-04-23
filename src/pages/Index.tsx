import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Users, Info } from "lucide-react";
import Layout from "@/components/Layout";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Connect with Community Resources
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Find local community centers, programs, and expert consultants to support your needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/map">Find Resources Near You</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/partners">View All Partners</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            How We Help Connect Communities
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-card">
              <Search className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Find Resources</h3>
              <p className="text-muted-foreground">
                Search and discover local community resources tailored to your needs.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Interactive Map</h3>
              <p className="text-muted-foreground">
                View resources on an interactive map to find what's closest to you.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Community Partners</h3>
              <p className="text-muted-foreground">
                Connect with trusted community organizations and service providers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Preview Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">Featured Resources</h2>
            <Button asChild variant="outline" className="mt-4 md:mt-0">
              <Link to="/partners">View All Resources</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "City Community Center",
                type: "Center",
                services: ["Youth Programs", "Senior Activities", "Counseling"],
                address: "123 Main St, City",
              },
              {
                title: "Dr. Sarah Johnson",
                type: "Expert",
                services: ["Mental Health", "Family Counseling", "Youth Services"],
                address: "456 Oak Ave, City",
              },
              {
                title: "Neighborhood Resource Center",
                type: "Center",
                services: ["Food Bank", "Job Training", "Housing Assistance"],
                address: "789 Pine Rd, City",
              },
            ].map((resource, index) => (
              <div key={index} className="bg-card rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-foreground">{resource.title}</h3>
                  <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded">
                    {resource.type}
                  </span>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Services:</h4>
                  <div className="flex flex-wrap gap-2">
                    {resource.services.map((service, idx) => (
                      <span key={idx} className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 mr-1" /> {resource.address}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join our community and discover the resources available to support your journey.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/map">Explore Resources</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
