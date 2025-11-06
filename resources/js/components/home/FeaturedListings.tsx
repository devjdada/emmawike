import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react'; // Import Link from Inertia
import { motion } from 'framer-motion';
import { Bath, Bed, Camera, Heart, MapPin, Square } from 'lucide-react';

interface Property {
    id: string;
    image: string; // Assuming this is the URL for the property image
    title: string;
    price: string;
    location: string;
    beds: number;
    baths: number;
    sqft: string;
    status: string;
    featured: boolean;
    photos: number;
}

interface FeaturedListingsProps {
    properties: Property[];
}

const FeaturedListings = ({ properties }: FeaturedListingsProps) => {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="mb-4 text-4xl font-bold text-primary lg:text-5xl">Featured Properties</h2>
                        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                            Discover our handpicked selection of premium properties in the most desirable locations
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {properties.map((property, index) => (
                        <motion.div
                            key={property.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="group overflow-hidden border-0 transition-all duration-300 hover:shadow-2xl">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    {/* Status Badge */}
                                    <Badge className="absolute top-4 left-4 bg-accent font-semibold text-primary">{property.status}</Badge>

                                    {/* Featured Badge */}
                                    {property.featured && <Badge className="absolute top-4 right-4 bg-primary text-white">Featured</Badge>}

                                    {/* Photo Count */}
                                    <div className="absolute bottom-4 left-4 flex items-center text-sm text-white">
                                        <Camera className="mr-1 h-4 w-4" />
                                        {property.photos}
                                    </div>

                                    {/* Heart Icon */}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-4 bottom-4 text-white hover:bg-white/20 hover:text-accent"
                                    >
                                        <Heart className="h-5 w-5" />
                                    </Button>
                                </div>

                                <CardContent className="p-6">
                                    <div className="mb-2 flex items-start justify-between">
                                        <h3 className="text-xl font-semibold text-primary transition-colors group-hover:text-accent">
                                            {property.title}
                                        </h3>
                                        <span className="text-2xl font-bold text-accent">{property.price}</span>
                                    </div>

                                    <div className="mb-4 flex items-center text-muted-foreground">
                                        <MapPin className="mr-1 h-4 w-4" />
                                        <span className="text-sm">{property.location}</span>
                                    </div>

                                    <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
                                        <div className="flex items-center">
                                            <Bed className="mr-1 h-4 w-4" />
                                            <span>{property.beds} Beds</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Bath className="mr-1 h-4 w-4" />
                                            <span>{property.baths} Baths</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Square className="mr-1 h-4 w-4" />
                                            <span>{property.sqft} sqft</span>
                                        </div>
                                    </div>

                                    <div className="flex space-x-2">
                                        <Button asChild className="flex-1 bg-primary hover:bg-primary/90">
                                            <Link href={route('properties.show', property.id)}>View Details</Link>
                                        </Button>
                                        <Button variant="outline" className="flex-1">
                                            Schedule Tour
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                        <Link href={route('properties.index')}>View All Properties</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedListings;
