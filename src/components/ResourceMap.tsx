import React, { useState, useEffect } from 'react';
import { Resource } from '@/types';
import { useResources } from '@/hooks/useResources';
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
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon
const resourceIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

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

const ResourceMap: React.FC = () => {
  const { resources, loading, error } = useResources();
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [availableServices, setAvailableServices] = useState<string[]>([]);
  const [filtersChanged, setFiltersChanged] = useState(false);

  useEffect(() => {
    if (resources) {
      setFilteredResources(resources);
    }
  }, [resources]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-card">
        <div className="text-muted-foreground">Loading map...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-card">
        <div className="text-destructive">Error loading map: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      {/* Map container */}
      <MapContainer 
        defaultCenter={[40, -74.5]} 
        zoom={9} 
        className="h-full w-full bg-card" 
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
              <Popup className="map-popup">
                <div className="p-2">
                  <h3 className="font-bold text-foreground">{resource.name}</h3>
                  <p className="text-muted-foreground">{resource.description}</p>
                  {resource.website && (
                    <a
                      href={resource.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                    >
                      Visit Website
                    </a>
                  )}
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
    </div>
  );
};

export default ResourceMap;
