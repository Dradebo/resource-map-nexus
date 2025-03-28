
import React, { useState, useEffect } from 'react';
import { Resource } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { getResources } from '@/lib/supabase';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Filter, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom marker icon
const resourceIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

// Component to adjust the map view
const MapBoundsHandler = ({ resources, filtered }: { resources: Resource[], filtered: boolean }) => {
  const map = useMap();
  
  useEffect(() => {
    if (!resources || resources.length === 0) return;
    
    if (filtered) {
      const bounds = L.latLngBounds([]);
      resources.forEach(resource => {
        const coords = generateMockCoordinates(resource.address);
        bounds.extend([coords[1], coords[0]]);
      });
      
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [map, resources, filtered]);
  
  return null;
};

const ResourceMap = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [availableServices, setAvailableServices] = useState<string[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [filtersChanged, setFiltersChanged] = useState(false);

  // Fetch resources
  const { data: resources, isLoading } = useQuery({
    queryKey: ['resources'],
    queryFn: getResources,
  });
  
  // Initialize types and services lists from resources
  useEffect(() => {
    if (resources) {
      const types = [...new Set(resources.map(r => r.type))];
      setAvailableTypes(types);
      
      const services = [...new Set(resources.flatMap(r => r.services))];
      setAvailableServices(services);
      
      setFilteredResources(resources);
    }
  }, [resources]);
  
  // Filter resources when search or filters change
  useEffect(() => {
    if (!resources) return;
    
    const filtered = resources.filter(resource => {
      const matchesSearch = searchTerm === '' || 
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.address.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesType = selectedTypes.length === 0 || 
        selectedTypes.includes(resource.type);
        
      const matchesService = selectedServices.length === 0 || 
        resource.services.some(service => selectedServices.includes(service));
        
      return matchesSearch && matchesType && matchesService;
    });
    
    setFilteredResources(filtered);
    setFiltersChanged(true);
  }, [resources, searchTerm, selectedTypes, selectedServices]);
  
  // Generate mock coordinates from address string
  // In a real implementation, you would use geocoding or store coords in database
  const generateMockCoordinates = (address: string): [number, number] => {
    // Simple hash function to generate consistent but random-looking coordinates
    let hash = 0;
    for (let i = 0; i < address.length; i++) {
      hash = address.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Generate longitude between -76 and -72 (rough US northeast area)
    const lng = -76 + (hash & 0xFFFF) / 0xFFFF * 4;
    
    // Generate latitude between 38 and 42 (rough US northeast area)
    const lat = 38 + (hash & 0xFFFF) / 0xFFFF * 4;
    
    return [lng, lat];
  };
  
  // Handle type selection
  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };
  
  // Handle service selection
  const handleServiceChange = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service) 
        : [...prev, service]
    );
  };
  
  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      {/* Map container */}
      <MapContainer 
        center={[40, -74.5]} 
        zoom={9} 
        className="h-full w-full" 
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {filteredResources.map(resource => {
          const coords = generateMockCoordinates(resource.address);
          return (
            <Marker 
              key={resource.id} 
              position={[coords[1], coords[0]]} 
              icon={resourceIcon}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="text-lg font-bold">{resource.name}</h3>
                  <p className="text-sm text-gray-600">{resource.type}</p>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Services:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {resource.services.map(service => (
                        <span key={service} className="text-xs bg-gray-100 px-2 py-0.5 rounded">{service}</span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-sm">{resource.address}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
        
        <MapBoundsHandler resources={filteredResources} filtered={filtersChanged} />
      </MapContainer>
      
      {/* Search input */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-lg px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-0 focus-visible:ring-0"
          />
        </div>
      </div>
      
      {/* Filters panel */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="secondary"
            className="absolute top-4 right-4 z-[1000]"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent>
          <div className="py-4">
            <h3 className="text-lg font-semibold mb-4">Filter Resources</h3>
            
            {/* Filter by type */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3">Resource Type</h4>
              <div className="space-y-2">
                {availableTypes.map(type => (
                  <div key={type} className="flex items-center">
                    <Checkbox 
                      id={`type-${type}`}
                      checked={selectedTypes.includes(type)}
                      onCheckedChange={() => handleTypeChange(type)}
                    />
                    <Label htmlFor={`type-${type}`} className="ml-2">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Filter by services */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3">Services Offered</h4>
              <div className="space-y-2">
                {availableServices.map(service => (
                  <div key={service} className="flex items-center">
                    <Checkbox 
                      id={`service-${service}`}
                      checked={selectedServices.includes(service)}
                      onCheckedChange={() => handleServiceChange(service)}
                    />
                    <Label htmlFor={`service-${service}`} className="ml-2">
                      {service}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Reset filters */}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setSelectedTypes([]);
                setSelectedServices([]);
                setSearchTerm('');
              }}
            >
              Reset Filters
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <div className="text-lg">Loading resources...</div>
        </div>
      )}
    </div>
  );
};

export default ResourceMap;
