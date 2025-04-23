import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Partner } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Globe, Mail, Phone, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function PartnerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPartner() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('partners')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        setPartner(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch partner'));
      } finally {
        setLoading(false);
      }
    }

    fetchPartner();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading partner details...</div>
      </div>
    );
  }

  if (error || !partner) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          {error ? error.message : 'Partner not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate('/partners')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Partners
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{partner.name}</CardTitle>
          <div className="flex flex-wrap gap-2 mt-4">
            {partner.resource_type.map((type) => (
              <Badge key={type} variant="secondary">
                {type}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-muted-foreground">{partner.description}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">{partner.address}</p>
                    <p className="text-muted-foreground">{partner.location}</p>
                  </div>
                </div>

                {partner.website && (
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Website</p>
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {partner.website}
                      </a>
                    </div>
                  </div>
                )}

                {partner.email && (
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href={`mailto:${partner.email}`}
                        className="text-primary hover:underline"
                      >
                        {partner.email}
                      </a>
                    </div>
                  </div>
                )}

                {partner.phone && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a
                        href={`tel:${partner.phone}`}
                        className="text-primary hover:underline"
                      >
                        {partner.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 