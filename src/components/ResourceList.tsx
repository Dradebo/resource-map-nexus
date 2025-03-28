
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getResources, Resource } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const ResourceList = () => {
  const { data: resources, isLoading, error } = useQuery({
    queryKey: ['resources'],
    queryFn: getResources,
  });

  if (isLoading) {
    return <div className="flex justify-center p-6">Loading resources...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-6">Error loading resources. Please try again later.</div>;
  }

  if (!resources || resources.length === 0) {
    return <div className="p-6">No resources found. Please connect to Supabase and add some data.</div>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource: Resource) => (
        <Card key={resource.id} className="h-full">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{resource.name}</CardTitle>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {resource.type}
              </span>
            </div>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResourceList;
