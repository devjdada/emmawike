import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Phone, Mail, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAgents } from "@/services/agents";

// Mock data for agents
export interface Agent {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  specialization: string;
  experience: string;
  rating: number;
  totalSales: number;
  avatar: string;
  bio: string;
  certifications: string[];
  languages: string[];
}


const AgentDetailModal = ({ agent }: { agent: Agent }) => {
  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={agent.avatar} alt={agent.name} />
            <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{agent.name}</h2>
            <p className="text-muted-foreground">{agent.specialization}</p>
          </div>
        </DialogTitle>
      </DialogHeader>
      
      <div className="grid gap-6">
        <div>
          <h3 className="font-semibold mb-2">About</h3>
          <p className="text-muted-foreground">{agent.bio}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{agent.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{agent.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{agent.location}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Professional Details</h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium">Experience: </span>
                <span className="text-sm">{agent.experience}</span>
              </div>
              <div>
                <span className="text-sm font-medium">Total Sales: </span>
                <span className="text-sm">{agent.totalSales} properties</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{agent.rating}/5.0</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {agent.certifications.map((cert, index) => (
              <Badge key={index} variant="secondary">{cert}</Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {agent.languages.map((lang, index) => (
              <Badge key={index} variant="outline">{lang}</Badge>
            ))}
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

const Agents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await getAgents();
        setAgents(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Our Agents</h1>
          <p className="text-xl text-muted-foreground">
            Meet our experienced real estate professionals ready to help you find your perfect property.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && <p>Loading...</p>}
          {error && <p>Error fetching agents: {error.message}</p>}
          {agents.map((agent) => (
            <Card key={agent.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarImage src={agent.avatar} alt={agent.name} />
                  <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{agent.name}</CardTitle>
                <p className="text-muted-foreground">{agent.specialization}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{agent.rating}</span>
                  </div>
                  <Badge variant="secondary">{agent.experience}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{agent.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{agent.phone}</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    {agent.totalSales} properties sold
                  </p>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">View Details</Button>
                    </DialogTrigger>
                    <AgentDetailModal agent={agent} />
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

export default Agents;