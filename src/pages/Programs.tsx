
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Programs = () => {
  const programs = [
    {
      id: 1,
      title: "Resource Mapping Initiative",
      description: "Our flagship program that identifies and maps community resources to improve accessibility and awareness.",
      impact: "Connected over 5,000 community members with essential services.",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Partner Development Network",
      description: "Building relationships between service providers to strengthen the community support ecosystem.",
      impact: "Facilitated 30+ partnerships between organizations to enhance service delivery.",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Community Education Workshops",
      description: "Free workshops teaching community members how to access and utilize available resources.",
      impact: "Educated 1,200+ individuals on navigating community support systems.",
      imageUrl: "/placeholder.svg"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Programs</h1>
        
        <p className="text-gray-700 mb-10 max-w-3xl">
          At KII Impact, we run several initiatives designed to strengthen communities through resource
          mapping, partnership development, and education. Explore our key programs below:
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <Card key={program.id} className="h-full flex flex-col">
              <div className="aspect-video w-full bg-gray-100">
                <img 
                  src={program.imageUrl} 
                  alt={program.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{program.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-700 mb-4">{program.description}</p>
                <div className="mt-auto">
                  <p className="font-medium text-sm text-brand-blue">Impact:</p>
                  <p className="text-gray-700">{program.impact}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Programs;
