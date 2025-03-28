
import React from "react";
import Layout from "@/components/Layout";
import ResourceMap from "@/components/ResourceMap";

const Map = () => {
  return (
    <Layout>
      <div className="container mx-auto px-0 md:px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 px-4 md:px-0">Resource Map</h1>
        <p className="text-gray-600 mb-6 px-4 md:px-0">
          Explore community centers, services, and experts on our interactive OpenStreetMap. Use filters to find exactly what you need.
        </p>
        
        {/* Map Component */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <ResourceMap />
        </div>
      </div>
    </Layout>
  );
};

export default Map;
