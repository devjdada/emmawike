import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PublicLayout from '@/layouts/PublicLayout';
import type { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Bath, Bed, Heart, Mail, MapPin, Phone, Share2, Square } from 'lucide-react';

interface Media {
    id: number;
    path: string;
    type: 'image' | 'video';
    label: string;
}

interface Property {
    id: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    address_line1: string;
    address_line2: string | null;
    city: string;
    state: string;
    country: string;
    zip_code: string | null;
    latitude: number | null;
    longitude: number | null;
    bedrooms: number | null;
    bathrooms: number | null;
    area_sq_ft: number | null;
    status: string;
    is_featured: boolean;
    media: Media[]; // Assuming media is an array of objects
    views: number | null;
    inquiries: number | null;
}

interface PropertyShowProps extends PageProps {
    property: Property;
}

export default function PropertyShow({ property }: PropertyShowProps) {
    // Mock agent data for contact section
    const agent = {
        name: 'Sarah Johnson',
        title: 'Senior Real Estate Agent',
        phone: '(555) 123-4567',
        email: 'sarah.johnson@emmowilke.com',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b632?auto=format&fit=crop&w=150&q=80',
    };

    return (
        <PublicLayout>
            <Head title={property.title} />

            {/* Hero Gallery */}
            <section className="pt-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {/* Main Image */}
                        <div className="lg:row-span-2">
                            <img
                                src={property.media[0] ? `/storage/${property.media[0].path}` : 'https://via.placeholder.com/1200x900'}
                                alt={property.title}
                                className="h-96 w-full rounded-lg object-cover shadow-lg lg:h-full"
                            />
                        </div>

                        {/* Secondary Images */}
                        <div className="grid grid-cols-2 gap-4">
                            {property.media.slice(1, 3).map((mediaItem, index) => (
                                <img
                                    key={index}
                                    src={`/storage/${mediaItem.path}`}
                                    alt={`${property.title} ${index + 2}`}
                                    className="h-44 w-full rounded-lg object-cover shadow-lg"
                                />
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {property.media.slice(3, 4).map((mediaItem, index) => (
                                <img
                                    key={index}
                                    src={`/storage/${mediaItem.path}`}
                                    alt={`${property.title} 4`}
                                    className="h-44 w-full rounded-lg object-cover shadow-lg"
                                />
                            ))}
                            <div className="relative">
                                <img
                                    src={property.media[0] ? `/storage/${property.media[0].path}` : 'https://via.placeholder.com/1200x900'}
                                    alt="View all photos"
                                    className="h-44 w-full rounded-lg object-cover shadow-lg"
                                />
                                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
                                    <span className="font-semibold text-white">
                                        +{property.media.length > 4 ? property.media.length - 4 : 0} More Photos
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Property Details */}
            <section className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="space-y-8 lg:col-span-2">
                            {/* Header */}
                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <div>
                                        <Badge className="mb-2">{property.status}</Badge>
                                        <h1 className="text-3xl font-bold text-foreground">{property.title}</h1>
                                        <div className="mt-2 flex items-center text-muted-foreground">
                                            <MapPin className="mr-1 h-4 w-4" />
                                            <span>
                                                {property.address_line1}, {property.city}, {property.state}, {property.country}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="sm">
                                            <Heart className="mr-2 h-4 w-4" />
                                            Save
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Share2 className="mr-2 h-4 w-4" />
                                            Share
                                        </Button>
                                    </div>
                                </div>

                                <div className="mb-6 text-3xl font-bold text-primary">
                                    {property.currency} {property.price.toLocaleString()}
                                </div>

                                {/* Property Stats */}
                                <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3">
                                    {property.bedrooms && (
                                        <div className="rounded-lg border p-4 text-center">
                                            <Bed className="mx-auto mb-2 h-6 w-6 text-primary" />
                                            <div className="font-semibold">{property.bedrooms}</div>
                                            <div className="text-sm text-muted-foreground">Bedrooms</div>
                                        </div>
                                    )}
                                    {property.bathrooms && (
                                        <div className="rounded-lg border p-4 text-center">
                                            <Bath className="mx-auto mb-2 h-6 w-6 text-primary" />
                                            <div className="font-semibold">{property.bathrooms}</div>
                                            <div className="text-sm text-muted-foreground">Bathrooms</div>
                                        </div>
                                    )}
                                    {property.area_sq_ft && (
                                        <div className="rounded-lg border p-4 text-center">
                                            <Square className="mx-auto mb-2 h-6 w-6 text-primary" />
                                            <div className="font-semibold">{property.area_sq_ft}</div>
                                            <div className="text-sm text-muted-foreground">Square Feet</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Property Description</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="prose dark:prose-invert tiptap mt-4" dangerouslySetInnerHTML={{ __html: property.description }} />
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
                                    <div className="mb-4 flex items-center">
                                        <img src={agent.image} alt={agent.name} className="mr-4 h-16 w-16 rounded-full object-cover" />
                                        <div>
                                            <h3 className="font-semibold">{agent.name}</h3>
                                            <p className="text-sm text-muted-foreground">{agent.title}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Button className="w-full bg-primary hover:bg-primary/90">
                                            <Phone className="mr-2 h-4 w-4" />
                                            {agent.phone}
                                        </Button>
                                        <Button variant="outline" className="w-full">
                                            <Mail className="mr-2 h-4 w-4" />
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
                                    <p className="mb-4 text-sm text-muted-foreground">Book a private showing to see this property in person.</p>
                                    <Button className="w-full bg-accent hover:bg-accent/90">Schedule Tour</Button>
                                </CardContent>
                            </Card>

                            {/* Mortgage Calculator */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Mortgage Calculator</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-4 text-sm text-muted-foreground">Calculate your monthly payments for this property.</p>
                                    <Button variant="outline" className="w-full">
                                        Calculate Payment
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
