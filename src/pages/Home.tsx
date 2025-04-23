import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePartners } from '@/hooks/usePartners';
import { Badge } from '@/components/ui/badge';
import { MapPin, Globe, Mail, Phone } from 'lucide-react';
import Layout from '@/components/Layout';

const Home: React.FC = () => {
  const { partners, loading } = usePartners();
  
  // Get the 3 most recent partners to display on the home page
  const featuredPartners = [...partners]
    .sort((a, b) => {
      // If created_at exists, sort by it
      if (a.created_at && b.created_at) {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      return 0;
    })
    .slice(0, 3);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to KII-Impact</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connecting communities with resources and partners to create sustainable impact.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link to="/resources">Explore Resources</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/map">View Map</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Resource Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access a comprehensive directory of resources across education, healthcare, and community development.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Interactive Map</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Explore resources and partners in your area through our interactive map interface.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Community Connection</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect with local organizations and resources to make a difference in your community.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Featured Partners Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Partners</h2>
          {loading ? (
            <div className="text-center py-8">Loading partners...</div>
          ) : partners.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPartners.map((partner) => (
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
                        {partner.resource_type.slice(0, 3).map((type) => (
                          <Badge key={type} variant="secondary">
                            {type}
                          </Badge>
                        ))}
                        {partner.resource_type.length > 3 && (
                          <Badge variant="outline">+{partner.resource_type.length - 3} more</Badge>
                        )}
                      </div>
                      <div className="mt-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          asChild
                        >
                          <Link to={`/partners/${partner.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">No partners available at this time.</div>
          )}
          <div className="text-center mt-8">
            <Button asChild>
              <Link to="/partners">View All Partners</Link>
            </Button>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join us in creating positive change in communities across the region.
          </p>
          <Button size="lg" asChild>
            <Link to="/resources">Get Started</Link>
          </Button>
        </section>
      </div>
    </Layout>
  );
};

export default Home; 