import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import PublicLayout from '@/layouts/PublicLayout';
import type { Agency, PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Award, Building, Mail, MapPin, Phone, Star, Users } from 'lucide-react';

interface AgenciesIndexProps extends PageProps {
    agencies: Agency[];
}

const AgencyDetailModal = ({ agency }: { agency: Agency }) => {
    // Placeholder values for data not available in Agency model
    const specialization = 'General Real Estate';
    const established = 'N/A'; // No 'established' field in Agency model
    const rating = 'N/A'; // No 'rating' field in Agency model
    const totalSales = 'N/A'; // No 'totalSales' field in Agency model
    const services = ['Sales', 'Rentals', 'Property Management']; // Placeholder
    const certifications = ['Licensed']; // Placeholder
    const awards = ['Top Agency']; // Placeholder

    const ownerEmail = agency.owner?.email || 'N/A';
    const ownerPhone = 'N/A'; // No phone for owner in User model
    const address = agency.description ? agency.description.substring(0, 50) + '...' : 'N/A'; // Using description as a placeholder for address

    return (
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={agency.logo_url || '/placeholder-logo.png'} alt={agency.name} />
                        <AvatarFallback>
                            {agency.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-2xl font-bold">{agency.name}</h2>
                        <p className="text-muted-foreground">{specialization}</p>
                    </div>
                </DialogTitle>
            </DialogHeader>

            <div className="grid gap-6">
                <div>
                    <h3 className="mb-2 font-semibold">About</h3>
                    <p className="text-muted-foreground">{agency.description}</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <h3 className="mb-3 font-semibold">Contact Information</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span className="text-sm">{ownerEmail}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span className="text-sm">{ownerPhone}</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="mt-0.5 h-4 w-4" />
                                <span className="text-sm">{address}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-3 font-semibold">Agency Statistics</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Building className="h-4 w-4" />
                                <span className="text-sm">Established: {established}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span className="text-sm">{agency.users ? agency.users.length : 0} agents</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award className="h-4 w-4" />
                                <span className="text-sm">{totalSales} properties sold</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm">{rating}/5.0 rating</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="mb-3 font-semibold">Services</h3>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        {services.map((service, index) => (
                            <Badge key={index} variant="secondary" className="justify-start">
                                {service}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="mb-3 font-semibold">Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                        {certifications.map((cert, index) => (
                            <Badge key={index} variant="outline">
                                {cert}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="mb-3 font-semibold">Awards & Recognition</h3>
                    <div className="flex flex-wrap gap-2">
                        {awards.map((award, index) => (
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

export default function AgenciesIndex({ agencies }: AgenciesIndexProps) {
    return (
        <PublicLayout>
            <Head title="Agencies" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="mb-4 text-4xl font-bold">Real Estate Agencies</h1>
                    <p className="text-xl text-muted-foreground">
                        Discover our network of premier real estate agencies, each specializing in different property types and markets.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {agencies.map((agency) => (
                        <Card key={agency.id} className="transition-shadow hover:shadow-lg">
                            <CardHeader className="text-center">
                                <Avatar className="mx-auto mb-4 h-20 w-20">
                                    <AvatarImage src={agency.logo_url || '/placeholder-logo.png'} alt={agency.name} />
                                    <AvatarFallback>
                                        {agency.name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <CardTitle className="text-xl">{agency.name}</CardTitle>
                                <p className="text-muted-foreground">{agency.description.substring(0, 50)}...</p>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-medium">{agency.owner?.name || 'N/A'}</span>
                                    </div>
                                    <Badge variant="secondary">{agency.users ? agency.users.length : 0} Agents</Badge>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        <span className="text-sm">{agency.description.substring(0, 50)}...</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        <span className="text-sm">N/A</span>
                                    </div>
                                </div>

                                <div className="pt-2 text-center">
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
        </PublicLayout>
    );
}
