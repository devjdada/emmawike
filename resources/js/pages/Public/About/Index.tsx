import PublicLayout from "@/layouts/PublicLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Award, 
  Home, 
  Star,
  Quote,
  Target,
  Eye,
  Heart
} from "lucide-react";
import { motion } from "framer-motion";
import type { PageProps, TeamMember, Testimonial, Client } from "@/types";

interface AboutIndexProps extends PageProps {
    teamMembers: TeamMember[];
    testimonials: Testimonial[];
    clients: Client[];
}

export default function AboutIndex({ teamMembers, testimonials, clients }: AboutIndexProps) {
  const stats = [
    { icon: Home, label: "Properties Sold", value: "500+" },
    { icon: Users, label: "Happy Clients", value: "1,200+" },
    { icon: Award, label: "Awards Won", value: "15" },
    { icon: Star, label: "Average Rating", value: "4.9" }
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service, from initial consultation to closing day."
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "Honest communication and clear processes ensure our clients are always informed and confident."
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "We build lasting relationships through trust, reliability, and ethical business practices."
    }
  ];

  return (
    <PublicLayout>
      <Head title="About Us" />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              About Emma Wike
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              We are a registered firm of Estate Surveyors and Valuers, committed to providing exceptional real estate services with integrity and professionalism.
            </p>
            <Button size="lg">Get to Know Us</Button>
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

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                Our craving cardinal focus is on client's/customers satisfaction as well as meeting corporate social responsibilities to stakeholders in general.
              </p>
              <p className="text-muted-foreground">
                We have earned an enviable stature in the provision of Facility Management Services to clients/customers over its time of existence.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div 
                className="aspect-video rounded-2xl bg-cover bg-center shadow-2xl"
                style={{ backgroundImage: "url(https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop)" }}
              />
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">Est. 2008</Badge>
                  <span className="text-sm font-medium">15+ Years Experience</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and shape every interaction we have.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate professionals who make it all happen.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="text-center overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div 
                    className="h-64 bg-cover bg-center"
                    style={{ backgroundImage: `url(${member.photo_url})` }}
                  />
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.title}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-primary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Quote className="h-12 w-12 text-primary mx-auto mb-6" />
              <blockquote className="text-2xl font-medium text-foreground mb-6">
                {testimonials[0].content}
              </blockquote>
              <cite className="text-muted-foreground">
                — {testimonials[0].author_name}, {testimonials[0].author_title}
              </cite>
            </motion.div>
          </div>
        </section>
      )}

      {/* Clients Section */}
      {clients.length > 0 && (
          <section className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-center mb-12"
                  >
                      <h2 className="text-3xl font-bold text-foreground mb-4">Our Clients</h2>
                      <p className="text-muted-foreground max-w-2xl mx-auto">
                          We are proud to have worked with a diverse range of clients.
                      </p>
                  </motion.div>
                  <div className="flex flex-wrap justify-center items-center gap-8">
                      {clients.map((client) => (
                          <motion.div key={client.id} whileHover={{ scale: 1.1 }}>
                              <a href={client.website_url} target="_blank" rel="noopener noreferrer">
                                  <img src={client.logo_url} alt={client.name} className="h-12" />
                              </a>
                          </motion.div>
                      ))}
                  </div>
              </div>
          </section>
      )}

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-muted-foreground mb-8">
              Whether you're buying, selling, or investing, we're here to guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Contact Us Today</Button>
              <Button size="lg" variant="outline">View Properties</Button>
            </div>
          </motion.div>
        </div>
      </section>

    </PublicLayout>
  );
}