
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Resource } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { getResources } from '@/lib/supabase';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Filter, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

// Placeholder for Mapbox token - to be replaced with environment variable
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN || '';

const ResourceMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [tokenInput, setTokenInput] = useState('');
  const [mapboxToken, setMapboxToken] = useState(MAPBOX_TOKEN);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [availableServices, setAvailableServices] = useState<string[]>([]);

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
    }
  }, [resources]);

  // Initialize map when component mounts or token changes
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;
    
    if (map.current) return; // Map already initialized
    
    mapboxgl.accessToken = mapboxToken;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-74.5, 40], // Default to US, will be adjusted based on markers
        zoom: 9
      });
      
      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Fire load event for marker placement
      map.current.on('load', () => {
        renderMarkers();
      });
    } catch (error) {
      console.error("Error initializing map:", error);
    }
    
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [mapboxToken]);
  
  // Render markers based on filtered resources
  const renderMarkers = () => {
    if (!map.current || !resources) return;
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    // Filter resources
    const filteredResources = resources.filter(resource => {
      const matchesSearch = searchTerm === '' || 
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.address.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesType = selectedTypes.length === 0 || 
        selectedTypes.includes(resource.type);
        
      const matchesService = selectedServices.length === 0 || 
        resource.services.some(service => selectedServices.includes(service));
        
      return matchesSearch && matchesType && matchesService;
    });
    
    if (filteredResources.length === 0) return;
    
    // Create markers for each resource
    const bounds = new mapboxgl.LngLatBounds();
    
    filteredResources.forEach(resource => {
      // Simulate geocoding by extracting mock coordinates from address
      // In a real implementation, you would use geocoding API or store coords in DB
      const coords = generateMockCoordinates(resource.address);
      
      // Create marker element
      const el = document.createElement('div');
      el.className = 'marker';
      el.innerHTML = `<div class="flex items-center justify-center w-8 h-8 bg-brand-blue text-white rounded-full shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>`;
      
      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="text-lg font-bold">${resource.name}</h3>
          <p class="text-sm text-gray-600">${resource.type}</p>
          <div class="mt-2">
            <p class="text-sm font-medium">Services:</p>
            <div class="flex flex-wrap gap-1 mt-1">
              ${resource.services.map(service => 
                `<span class="text-xs bg-gray-100 px-2 py-0.5 rounded">${service}</span>`
              ).join('')}
            </div>
          </div>
          <p class="mt-2 text-sm">${resource.address}</p>
        </div>
      `);
      
      // Add marker to map
      const marker = new mapboxgl.Marker(el)
        .setLngLat(coords)
        .setPopup(popup)
        .addTo(map.current!);
        
      // Add to reference array for later cleanup
      markersRef.current.push(marker);
      
      // Extend bounds to include this point
      bounds.extend(coords);
    });
    
    // Fit map to bounds
    map.current.fitBounds(bounds, {
      padding: 50,
      maxZoom: 15
    });
  };
  
  // Update markers when filters change
  useEffect(() => {
    renderMarkers();
  }, [resources, searchTerm, selectedTypes, selectedServices]);
  
  // Generate mock coordinates from address string
  // In a real implementation, you would use geocoding or store coords in database
  const generateMockCoordinates = (address: string): [number, number] => {
    // Simple hash function to generate consistent but random-looking coordinates
    let hash = 0;
    for (let i = 0; i < address.length; i++) {
      hash = address.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Generate latitude between 38 and 42 (rough US northeast area)
    const lat = 38 + (hash & 0xFFFF) / 0xFFFF * 4;
    
    // Generate longitude between -76 and -72 (rough US northeast area)
    const lng = -76 + (hash & 0xFFFF) / 0xFFFF * 4;
    
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
  
  // Handle token submission
  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMapboxToken(tokenInput);
    localStorage.setItem('mapbox_token', tokenInput);
  };
  
  // Show empty token input if no token is provided
  if (!mapboxToken) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Mapbox API Token Required</h2>
          <p className="mb-4 text-gray-600">
            To use the map feature, please enter your Mapbox public token. You can get one by creating an account at{' '}
            <a href="https://www.mapbox.com/" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
              mapbox.com
            </a>.
          </p>
          
          <form onSubmit={handleTokenSubmit}>
            <Input 
              type="text" 
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="Enter Mapbox public token"
              className="mb-4"
            />
            <Button type="submit" className="w-full">Set Token</Button>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      {/* Map container */}
      <div ref={mapContainer} className="absolute inset-0" />
      
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
            className="absolute top-4 right-4 z-10"
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
