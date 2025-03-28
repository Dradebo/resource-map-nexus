
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Users, Info } from "lucide-react";
import Layout from "@/components/Layout";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-light to-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
              Connect with Community Resources
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Find local community centers, programs, and expert consultants to support your needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue/90">
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How ResourceHub Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="bg-brand-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-brand-blue w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Search Resources</h3>
              <p className="text-gray-600">
                Easily search for community centers, programs, and experts based on your specific needs.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="bg-brand-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-brand-teal w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Nearby Locations</h3>
              <p className="text-gray-600">
                Use our interactive map to discover resources in your area and get directions.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-brand-green w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect with Experts</h3>
              <p className="text-gray-600">
                Reach out to qualified professionals and consultants with expertise in your area of need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Preview Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Resources</h2>
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
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{resource.title}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {resource.type}
                  </span>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Services:</h4>
                  <div className="flex flex-wrap gap-2">
                    {resource.services.map((service, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 mr-1" /> {resource.address}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Resources?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore our interactive map to discover community centers and experts near you.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/map">View Resource Map</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
