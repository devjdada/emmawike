import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Phone, Mail, Star, Building, Users, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAgencies } from "@/services/agencies";

// Mock data for agencies
export interface Agency {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  specialization: string;
  established: string;
  rating: number;
  totalAgents: number;
  totalSales: number;
  logo: string;
  description: string;
  services: string[];
  certifications: string[];
  awards: string[];
}


const AgencyDetailModal = ({ agency }: { agency: Agency }) => {
  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={agency.logo} alt={agency.name} />
            <AvatarFallback>{agency.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{agency.name}</h2>
            <p className="text-muted-foreground">{agency.specialization}</p>
          </div>
        </DialogTitle>
      </DialogHeader>
      
      <div className="grid gap-6">
        <div>
          <h3 className="font-semibold mb-2">About</h3>
          <p className="text-muted-foreground">{agency.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{agency.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{agency.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span className="text-sm">{agency.address}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Agency Statistics</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span className="text-sm">Established: {agency.established}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="text-sm">{agency.totalAgents} agents</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span className="text-sm">{agency.totalSales} properties sold</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{agency.rating}/5.0 rating</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-3">Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {agency.services.map((service, index) => (
              <Badge key={index} variant="secondary" className="justify-start">
                {service}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-3">Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {agency.certifications.map((cert, index) => (
              <Badge key={index} variant="outline">{cert}</Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-3">Awards & Recognition</h3>
          <div className="flex flex-wrap gap-2">
            {agency.awards.map((award, index) => (
              <Badge key={index} variant="default" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                {award}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

const Agencies = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const data = await getAgencies();
        setAgencies(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgencies();
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Real Estate Agencies</h1>
          <p className="text-xl text-muted-foreground">
            Discover our network of premier real estate agencies, each specializing in different property types and markets.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && <p>Loading...</p>}
          {error && <p>Error fetching agencies: {error.message}</p>}
          {agencies.map((agency) => (
            <Card key={agency.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarImage src={agency.logo} alt={agency.name} />
                  <AvatarFallback>{agency.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{agency.name}</CardTitle>
                <p className="text-muted-foreground">{agency.specialization}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{agency.rating}</span>
                  </div>
                  <Badge variant="secondary">Est. {agency.established}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{agency.totalAgents} agents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{agency.address.split(',')[1]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span className="text-sm">{agency.totalSales} sales completed</span>
                  </div>
                </div>
                
                <div className="text-center pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">View Agency Details</Button>
                    </DialogTrigger>
                    <AgencyDetailModal agency={agency} />
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Agencies;