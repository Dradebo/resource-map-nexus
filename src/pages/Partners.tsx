import React, { useState, useEffect } from 'react';
import { usePartners } from '@/hooks/usePartners';
import { Partner } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PartnerForm } from '@/components/PartnerForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Globe, Mail, Phone, Map } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import Layout from '@/components/Layout';

const resourceTypes = [
  'Training',
  'Placement',
  'Internet Access',
  'Equipment',
  'Software',
  'Mentorship',
  'Funding',
  'Workspace',
  'Business Development',
  'Networking',
  'Other'
];

const locations = [
  'Kampala',
  'Wakiso',
  'Arua',
  'Entebbe',
  'Jinja',
  'Other'
];

export default function Partners() {
  const { partners, loading, error } = usePartners();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedResourceType, setSelectedResourceType] = useState<string>('all');
  const [connectionStatus, setConnectionStatus] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    async function checkConnection() {
      try {
        console.log('Checking Supabase connection...');
        const { data, error } = await supabase
          .from('partners')
          .select('count')
          .limit(1);
        
        if (error) {
          console.error('Supabase connection error:', error);
          setConnectionStatus('Error connecting to database');
          return;
        }
        
        console.log('Supabase connection successful');
        setConnectionStatus('Connected to database');
      } catch (err) {
        console.error('Connection check error:', err);
        setConnectionStatus('Failed to check connection');
      }
    }

    checkConnection();
  }, []);

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || partner.location === selectedLocation;
    const matchesResourceType = selectedResourceType === 'all' || 
      partner.resource_type.includes(selectedResourceType);
    
    return matchesSearch && matchesLocation && matchesResourceType;
  });

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading partners...</div>
          <div className="text-center text-sm text-muted-foreground mt-2">{connectionStatus}</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-500">Error loading partners: {error.message}</div>
          <div className="text-center text-sm text-muted-foreground mt-2">{connectionStatus}</div>
          <div className="text-center mt-4">
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Our Partners</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Partner</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add a New Partner</DialogTitle>
              </DialogHeader>
              <PartnerForm />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Input
            placeholder="Search partners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:col-span-2"
          />
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedResourceType} onValueChange={setSelectedResourceType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by resource type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Resource Types</SelectItem>
              {resourceTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <Card key={partner.id} className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{partner.name}</CardTitle>
                <CardDescription className="line-clamp-2">{partner.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {partner.location}
                    {partner.latitude && partner.longitude && (
                      <Link 
                        to={`/map?lat=${partner.latitude}&lng=${partner.longitude}`}
                        className="ml-2 text-primary hover:underline flex items-center"
                      >
                        <Map className="w-4 h-4 mr-1" />
                        View on map
                      </Link>
                    )}
                  </div>
                  {partner.website && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Globe className="w-4 h-4 mr-2" />
                      {partner.website}
                    </div>
                  )}
                  {partner.email && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="w-4 h-4 mr-2" />
                      {partner.email}
                    </div>
                  )}
                  {partner.phone && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="w-4 h-4 mr-2" />
                      {partner.phone}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {partner.resource_type.map((type) => (
                      <Badge key={type} variant="secondary">
                        {type}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate(`/partners/${partner.id}`)}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate(`/map?partner=${partner.id}`)}
                    >
                      <Map className="w-4 h-4 mr-1" />
                      Show on Map
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}