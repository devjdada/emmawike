import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Building, 
  TrendingUp, 
  Award,
  ExternalLink,
  Home,
  Building2,
  Warehouse
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjects } from "@/services/projects";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const stats = [
    { label: "Total Project Value", value: "$1.8B+", icon: TrendingUp },
    { label: "Projects Completed", value: "50+", icon: Award },
    { label: "Units Delivered", value: "2,500+", icon: Building },
    { label: "Years Experience", value: "15+", icon: Calendar }
  ];

  const projectTypes = [
    { name: "Residential", icon: Home, count: 25 },
    { name: "Commercial", icon: Building2, count: 15 },
    { name: "Mixed-Use", icon: Building, count: 8 },
    { name: "Industrial", icon: Warehouse, count: 12 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Under Construction":
        return "bg-blue-100 text-blue-800";
      case "Planning":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Residential":
        return Home;
      case "Commercial":
        return Building2;
      case "Mixed-Use":
        return Building;
      case "Industrial":
        return Warehouse;
      case "Retail":
        return Building2;
      default:
        return Building;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=1920&h=800&fit=crop)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Our Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover our portfolio of exceptional real estate developments that shape communities 
              and create lasting value for investors and residents alike.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
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

      {/* Project Types */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Project Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We specialize in diverse real estate developments across multiple sectors.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectTypes.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                      <type.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{type.name}</h3>
                    <p className="text-2xl font-bold text-primary">{type.count}</p>
                    <p className="text-sm text-muted-foreground">Projects</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && <p>Loading...</p>}
          {error && <p>Error fetching projects: {error.message}</p>}
          {projects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-8">Featured Project</h2>
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div 
                    className="h-64 lg:h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${projects[0].image})` }}
                  />
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className={getStatusColor(projects[0].status)}>{projects[0].status}</Badge>
                      <Badge variant="outline">{projects[0].type}</Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{projects[0].title}</h3>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{projects[0].location}</span>
                    </div>
                    <p className="text-muted-foreground mb-6">{projects[0].description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">Value:</span>
                        <span className="font-semibold ml-2">{projects[0].value}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Units:</span>
                        <span className="font-semibold ml-2">{projects[0].units}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {projects[0].features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <Link to={`/project/${projects[0].id}`}>
                      <Button className="w-fit">
                        View Project Details
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">All Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(1).map((project, index) => {
              const TypeIcon = getTypeIcon(project.type);
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                    <div 
                      className="h-48 bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${project.image})` }}
                    >
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                          <TypeIcon className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center text-muted-foreground mb-3">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{project.location}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-muted-foreground">Value:</span>
                          <span className="font-semibold ml-1">{project.value}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Year:</span>
                          <span className="font-semibold ml-1">{project.year}</span>
                        </div>
                      </div>

                      <Link to={`/project/${project.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Partner with Us
            </h2>
            <p className="text-muted-foreground mb-8">
              Interested in investing in our upcoming projects or discussing a potential partnership? 
              We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Investment Opportunities
              </Button>
              <Button size="lg" variant="outline">
                Contact Our Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;