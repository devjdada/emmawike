import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  Car,
  Wifi,
  Shield,
  Zap,
  Trees,
  Phone,
  Mail,
  Heart,
  Share2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SingleProperty = () => {
  const { id } = useParams();

  // Mock property data - in real app, fetch based on ID
  const property = {
    id: 1,
    title: "Luxury Penthouse in Downtown",
    price: "$2,500,000",
    location: "123 Park Avenue, New York, NY 10016",
    beds: 4,
    baths: 3,
    sqft: 3200,
    parking: 2,
    yearBuilt: 2019,
    type: "Penthouse",
    status: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "This stunning penthouse offers breathtaking city views and luxury living at its finest. Located in the heart of Manhattan, this property features floor-to-ceiling windows, premium finishes, and access to world-class amenities. The open-concept design creates a seamless flow between living spaces, perfect for both entertaining and everyday living.",
    features: [
      "Floor-to-ceiling windows",
      "Private terrace with city views",
      "High-end appliances",
      "Hardwood flooring",
      "Central air conditioning",
      "In-unit laundry",
      "Smart home technology",
      "24/7 concierge service"
    ],
    amenities: [
      { icon: Wifi, name: "High-Speed Internet" },
      { icon: Shield, name: "24/7 Security" },
      { icon: Car, name: "Parking Garage" },
      { icon: Zap, name: "Gym & Fitness" },
      { icon: Trees, name: "Rooftop Garden" }
    ],
    agent: {
      name: "Sarah Johnson",
      title: "Senior Real Estate Agent",
      phone: "(555) 123-4567",
      email: "sarah.johnson@emmowilke.com",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b632?auto=format&fit=crop&w=150&q=80"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Gallery */}
      <section className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            {/* Main Image */}
            <div className="lg:row-span-2">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-96 lg:h-full object-cover rounded-lg shadow-lg"
              />
            </div>
            
            {/* Secondary Images */}
            <div className="grid grid-cols-2 gap-4">
              {property.images.slice(1, 3).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${property.title} ${index + 2}`}
                  className="w-full h-44 object-cover rounded-lg shadow-lg"
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={property.images[3]}
                alt={`${property.title} 4`}
                className="w-full h-44 object-cover rounded-lg shadow-lg"
              />
              <div className="relative">
                <img
                  src={property.images[0]}
                  alt="View all photos"
                  className="w-full h-44 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold">+5 More Photos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Badge className="mb-2">{property.status}</Badge>
                    <h1 className="text-3xl font-bold text-foreground">{property.title}</h1>
                    <div className="flex items-center text-muted-foreground mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-primary mb-6">
                  {property.price}
                </div>

                {/* Property Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                  <div className="text-center p-4 border rounded-lg">
                    <Bed className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">{property.beds}</div>
                    <div className="text-sm text-muted-foreground">Bedrooms</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Bath className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">{property.baths}</div>
                    <div className="text-sm text-muted-foreground">Bathrooms</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Square className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">{property.sqft}</div>
                    <div className="text-sm text-muted-foreground">Square Feet</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Car className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">{property.parking}</div>
                    <div className="text-sm text-muted-foreground">Parking</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">{property.yearBuilt}</div>
                    <div className="text-sm text-muted-foreground">Year Built</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Property Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle>Building Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center p-3 border rounded-lg">
                        <amenity.icon className="h-5 w-5 text-primary mr-3" />
                        <span className="text-sm font-medium">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Agent */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Agent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <img
                      src={property.agent.image}
                      alt={property.agent.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{property.agent.name}</h3>
                      <p className="text-sm text-muted-foreground">{property.agent.title}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Phone className="h-4 w-4 mr-2" />
                      {property.agent.phone}
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Agent
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Schedule Tour */}
              <Card>
                <CardHeader>
                  <CardTitle>Schedule a Tour</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Book a private showing to see this property in person.
                  </p>
                  <Button className="w-full bg-accent hover:bg-accent/90">
                    Schedule Tour
                  </Button>
                </CardContent>
              </Card>

              {/* Mortgage Calculator */}
              <Card>
                <CardHeader>
                  <CardTitle>Mortgage Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Calculate your monthly payments for this property.
                  </p>
                  <Button variant="outline" className="w-full">
                    Calculate Payment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SingleProperty;