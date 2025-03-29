
import React from "react";
import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">About KII Impact</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            KII Impact is committed to serving communities through innovative resource mapping and
            partnerships that empower individuals and organizations. We believe in the power of
            connection, education, and collaboration to create lasting positive change.
          </p>
          <p className="text-gray-700">
            Our integrated approach combines technology with community engagement to identify needs,
            connect resources, and measure outcomes for greater community impact.
          </p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Team members would be populated here */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-medium mb-2">Jane Doe</h3>
              <p className="text-brand-blue font-medium mb-3">Executive Director</p>
              <p className="text-gray-600">
                With over 15 years of experience in community development, Jane leads our strategic initiatives.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-medium mb-2">John Smith</h3>
              <p className="text-brand-blue font-medium mb-3">Partnerships Coordinator</p>
              <p className="text-gray-600">
                John works directly with our partner organizations to ensure effective resource distribution.
              </p>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-brand-light p-6 rounded-lg text-center">
              <h3 className="text-4xl font-bold text-brand-blue mb-2">50+</h3>
              <p className="text-gray-700">Community Partners</p>
            </div>
            <div className="bg-brand-light p-6 rounded-lg text-center">
              <h3 className="text-4xl font-bold text-brand-blue mb-2">1,000+</h3>
              <p className="text-gray-700">Resources Mapped</p>
            </div>
            <div className="bg-brand-light p-6 rounded-lg text-center">
              <h3 className="text-4xl font-bold text-brand-blue mb-2">5,000+</h3>
              <p className="text-gray-700">Community Members Served</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
