import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { useResources } from '@/hooks/useResources';
import { usePartners } from '@/hooks/usePartners';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map: React.FC = () => {
  const { resources, loading: resourcesLoading, error: resourcesError } = useResources();
  const { partners, loading: partnersLoading, error: partnersError } = usePartners();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showPartners, setShowPartners] = useState<boolean>(true);
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);

  // Get unique resource types and locations for filters, with null checks
  const resourceTypes = useMemo(() => {
    const types = new Set<string>();
    resources.forEach(r => {
      if (r?.type) types.add(r.type);
      if (r?.resource_type) {
        if (Array.isArray(r.resource_type)) {
          r.resource_type.forEach(t => types.add(t));
        } else {
          types.add(r.resource_type);
        }
      }
    });
    partners.forEach(p => {
      if (p?.resource_type) {
        if (Array.isArray(p.resource_type)) {
          p.resource_type.forEach(t => types.add(t));
        } else {
          types.add(p.resource_type);
        }
      }
    });
    return ['all', ...Array.from(types)].sort();
  }, [resources, partners]);
  
  const locations = useMemo(() => {
    const locs = new Set<string>();
    resources.forEach(r => {
      if (r?.location) locs.add(r.location);
      if (r?.address) locs.add(r.address);
    });
    partners.forEach(p => {
      if (p?.location) locs.add(p.location);
      if (p?.address) locs.add(p.address);
    });
    return ['all', ...Array.from(locs)].sort();
  }, [resources, partners]);

  // Filter resources based on selection, search term, and ensure they have valid coordinates
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      if (!resource) return false;
      
      // Check if resource has valid coordinates
      if (typeof resource.latitude !== 'number' || typeof resource.longitude !== 'number') {
        return false;
      }
      
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const nameMatch = resource.name?.toLowerCase().includes(searchLower);
        const descriptionMatch = resource.description?.toLowerCase().includes(searchLower);
        const typeMatch = (resource.type?.toLowerCase().includes(searchLower) || 
          (Array.isArray(resource.resource_type) && 
            resource.resource_type.some(t => t.toLowerCase().includes(searchLower))));
        const locationMatch = (resource.location?.toLowerCase().includes(searchLower) || 
          resource.address?.toLowerCase().includes(searchLower));
        
        if (!nameMatch && !descriptionMatch && !typeMatch && !locationMatch) {
          return false;
        }
      }
      
      // Apply type filter
      if (selectedType !== 'all') {
        const resourceTypes = [
          resource.type,
          ...(Array.isArray(resource.resource_type) ? resource.resource_type : [resource.resource_type])
        ].filter(Boolean);
        if (!resourceTypes.includes(selectedType)) return false;
      }
      
      // Apply location filter
      if (selectedLocation !== 'all') {
        const resourceLocations = [resource.location, resource.address].filter(Boolean);
        if (!resourceLocations.includes(selectedLocation)) return false;
      }
      
      return true;
    });
  }, [resources, selectedType, selectedLocation, searchTerm]);

  // Filter partners with valid coordinates
  const filteredPartners = useMemo(() => {
    if (!showPartners) return [];
    
    return partners.filter(partner => {
      if (!partner) return false;
      
      // Check if partner has valid coordinates
      if (typeof partner.latitude !== 'number' || typeof partner.longitude !== 'number') {
        return false;
      }
      
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const nameMatch = partner.name?.toLowerCase().includes(searchLower);
        const descriptionMatch = partner.description?.toLowerCase().includes(searchLower);
        const typeMatch = Array.isArray(partner.resource_type) && 
          partner.resource_type.some(t => t.toLowerCase().includes(searchLower));
        const locationMatch = (partner.location?.toLowerCase().includes(searchLower) || 
          partner.address?.toLowerCase().includes(searchLower));
        
        if (!nameMatch && !descriptionMatch && !typeMatch && !locationMatch) {
          return false;
        }
      }
      
      // Apply type filter
      if (selectedType !== 'all') {
        if (!Array.isArray(partner.resource_type) || !partner.resource_type.includes(selectedType)) {
          return false;
        }
      }
      
      // Apply location filter
      if (selectedLocation !== 'all') {
        const partnerLocations = [partner.location, partner.address].filter(Boolean);
        if (!partnerLocations.includes(selectedLocation)) {
          return false;
        }
      }
      
      return true;
    });
  }, [partners, showPartners, selectedType, selectedLocation, searchTerm]);

  // Calculate map center based on available resources and partners
  const mapCenter = useMemo(() => {
    const allPoints = [...filteredResources, ...filteredPartners];
    
    if (allPoints.length === 0) {
      return [0, 0]; // Default center if no points
    }
    
    const validPoints = allPoints.filter(p => 
      typeof p.latitude === 'number' && typeof p.longitude === 'number'
    );
    
    if (validPoints.length === 0) {
      return [0, 0]; // Default center if no valid coordinates
    }
    
    const sumLat = validPoints.reduce((sum, p) => sum + p.latitude, 0);
    const sumLng = validPoints.reduce((sum, p) => sum + p.longitude, 0);
    
    return [sumLat / validPoints.length, sumLng / validPoints.length];
  }, [filteredResources, filteredPartners]);

  // Create a list of all points for the dropdown
  const allPoints = useMemo(() => {
    const points = [
      ...filteredResources.map(r => ({
        ...r,
        type: 'resource',
        displayType: Array.isArray(r.resource_type) ? r.resource_type.join(', ') : r.type || 'Unknown'
      })),
      ...filteredPartners.map(p => ({
        ...p,
        type: 'partner',
        displayType: Array.isArray(p.resource_type) ? p.resource_type.join(', ') : 'Partner'
      }))
    ];
    return points.sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredResources, filteredPartners]);

  // Handle map initialization
  useEffect(() => {
    if (!resourcesLoading && !partnersLoading && !resourcesError && !partnersError) {
      setMapReady(true);
    }
  }, [resourcesLoading, partnersLoading, resourcesError, partnersError]);

  // Reset filters when resources change
  useEffect(() => {
    setSelectedType('all');
    setSelectedLocation('all');
    setSearchTerm('');
  }, []);

  if (resourcesLoading || partnersLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Loading map data...</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (resourcesError || partnersError) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <p className="text-destructive">Error loading map data. Please try again later.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Resource Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <div className="relative">
                  <Input
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="relative z-50">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="w-full max-h-[300px] overflow-y-auto">
                      {resourceTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative z-50">
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by location" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="w-full max-h-[300px] overflow-y-auto">
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>
                          {location === 'all' ? 'All Locations' : location.charAt(0).toUpperCase() + location.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative z-50">
                  <Select value={selectedPoint || ''} onValueChange={setSelectedPoint}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select resource or partner" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="w-full">
                      <ScrollArea className="h-[300px]">
                        {allPoints.map(point => (
                          <SelectItem key={point.id} value={point.id}>
                            <div className="flex items-center gap-2">
                              <span>{point.name}</span>
                              <Badge variant={point.type === 'partner' ? 'secondary' : 'outline'} className="ml-auto">
                                {point.type === 'partner' ? 'Partner' : 'Resource'}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setSelectedType('all');
                      setSelectedLocation('all');
                      setSearchTerm('');
                      setSelectedPoint(null);
                    }}
                  >
                    Clear Filters
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowPartners(!showPartners)}
                  >
                    {showPartners ? 'Hide Partners' : 'Show Partners'}
                  </Button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Showing {filteredResources.length} resources and {filteredPartners.length} partners
              </div>
            </div>
            <div className="relative z-0 h-[600px] rounded-lg overflow-hidden">
              {mapReady && (
                <MapContainer
                  center={mapCenter as [number, number]}
                  zoom={filteredResources.length > 0 ? 4 : 2}
                  style={{ height: '100%', width: '100%' }}
                  zoomControl={false}
                >
                  <ZoomControl position="bottomright" />
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {filteredResources.map(resource => (
                    <Marker
                      key={resource.id}
                      position={[resource.latitude, resource.longitude]}
                    >
                      <Popup>
                        <div className="map-popup">
                          <h3 className="font-semibold mb-2">{resource.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                          <p className="text-sm mb-2">
                            <span className="font-medium">Type:</span> {resource.type}
                          </p>
                          <p className="text-sm mb-2">
                            <span className="font-medium">Location:</span> {resource.location || resource.address}
                          </p>
                          {resource.website && (
                            <a
                              href={resource.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline text-sm"
                            >
                              Visit Website
                            </a>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Map;
