import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  Building, 
  TrendingUp, 
  Star,
  CheckCircle,
  Phone,
  Mail,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";

const SingleProject = () => {
  const { id } = useParams();
  
  // Mock project data - in a real app, this would be fetched based on the ID
  const project = {
    id: 1,
    title: "Oceanview Luxury Residences",
    location: "Malibu, CA",
    type: "Residential",
    status: "Completed",
    year: "2024",
    value: "$450M",
    units: 120,
    area: "2.5 acres",
    completion: "December 2024",
    description: "Oceanview Luxury Residences represents the pinnacle of coastal living, featuring 120 premium units across 2.5 acres of pristine oceanfront property. This architectural masterpiece combines sustainable design principles with luxury amenities to create an unparalleled residential experience.",
    longDescription: "This exceptional development showcases our commitment to creating living spaces that harmonize with their natural environment while providing residents with world-class amenities and services. Each unit has been carefully designed to maximize ocean views while ensuring privacy and comfort.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop"
    ],
    features: [
      "Private Ocean Access",
      "Infinity Pool & Spa",
      "State-of-the-art Fitness Center",
      "Concierge Services",
      "Smart Home Technology",
      "Sustainable Design",
      "Rooftop Gardens",
      "Private Beach Club"
    ],
    amenities: [
      { name: "Beach Club", description: "Exclusive beach access with cabanas and water sports" },
      { name: "Wellness Center", description: "Full-service spa and fitness facilities" },
      { name: "Fine Dining", description: "On-site restaurant with oceanview terrace" },
      { name: "Business Center", description: "Modern co-working spaces and meeting rooms" }
    ],
    stats: [
      { label: "Total Investment", value: "$450M", icon: TrendingUp },
      { label: "Residential Units", value: "120", icon: Building },
      { label: "Project Duration", value: "36 months", icon: Calendar },
      { label: "Team Members", value: "200+", icon: Users }
    ],
    timeline: [
      { phase: "Planning & Design", status: "Completed", date: "Q1 2022" },
      { phase: "Site Preparation", status: "Completed", date: "Q2 2022" },
      { phase: "Construction Phase 1", status: "Completed", date: "Q3 2023" },
      { phase: "Construction Phase 2", status: "Completed", date: "Q2 2024" },
      { phase: "Final Completion", status: "Completed", date: "Q4 2024" }
    ],
    team: [
      { name: "Sarah Johnson", role: "Project Director", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
      { name: "Michael Chen", role: "Lead Architect", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
      { name: "Emily Rodriguez", role: "Construction Manager", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Planning":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTimelineStatus = (status: string) => {
    return status === "Completed" ? "text-green-600" : "text-blue-600";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Back Button */}
      <div className="pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/projects">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div 
              className="h-96 bg-cover bg-center rounded-xl mb-8"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                  <Badge variant="outline">{project.type}</Badge>
                  <Badge variant="secondary">{project.year}</Badge>
                </div>
                
                <h1 className="text-4xl font-bold text-foreground mb-4">{project.title}</h1>
                
                <div className="flex items-center text-muted-foreground mb-6">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{project.location}</span>
                </div>
                
                <p className="text-lg text-muted-foreground mb-8">{project.description}</p>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Project Overview</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="font-medium">{project.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Value:</span>
                        <span className="font-medium">{project.value}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Units:</span>
                        <span className="font-medium">{project.units}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Area:</span>
                        <span className="font-medium">{project.area}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Completion:</span>
                        <span className="font-medium">{project.completion}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Get In Touch</h3>
                    <div className="space-y-3">
                      <Button className="w-full">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Us
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {project.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Project Overview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
                <p className="text-muted-foreground mb-6">{project.longDescription}</p>
              </motion.div>

              {/* Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.gallery.map((image, index) => (
                    <div 
                      key={index}
                      className="h-64 bg-cover bg-center rounded-lg"
                      style={{ backgroundImage: `url(${image})` }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-6">Amenities</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {project.amenities.map((amenity, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-2">{amenity.name}</h3>
                        <p className="text-muted-foreground text-sm">{amenity.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>

              {/* Team */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6">Project Team</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {project.team.map((member, index) => (
                    <Card key={index} className="text-center">
                      <CardContent className="p-6">
                        <div 
                          className="w-20 h-20 bg-cover bg-center rounded-full mx-auto mb-4"
                          style={{ backgroundImage: `url(${member.image})` }}
                        />
                        <h3 className="font-semibold mb-1">{member.name}</h3>
                        <p className="text-muted-foreground text-sm">{member.role}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Timeline */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-6">Project Timeline</h3>
                    <div className="space-y-4">
                      {project.timeline.map((phase, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className={`h-5 w-5 mt-0.5 ${getTimelineStatus(phase.status)}`} />
                          <div className="flex-1">
                            <div className="font-medium">{phase.phase}</div>
                            <div className="text-sm text-muted-foreground">{phase.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-6">Key Features</h3>
                    <div className="space-y-2">
                      {project.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Interested in This Project?</h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Contact our team to learn more about investment opportunities or similar projects.
                    </p>
                    <div className="space-y-3">
                      <Button className="w-full">
                        Contact Our Team
                      </Button>
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View All Projects
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SingleProject;