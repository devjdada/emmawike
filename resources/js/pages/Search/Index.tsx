import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import { Property } from '@/types/property';
import FeaturedListings from '@/components/home/FeaturedListings';
import SearchBar from '@/components/home/SearchBar';
import { Button } from '@/components/ui/button';

interface SearchPageProps {
    properties: {
        data: Property[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
    filters: {
        [key: string]: string;
    };
}

export default function Index({ properties, filters }: SearchPageProps) {
    return (
        <PublicLayout>
            <Head title="Search Results" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold mb-8">
                        Search Results
                    </h1>
                    
                    <div className="mb-8">
                        <SearchBar initialValues={filters} />
                    </div>

                    {properties.data.length > 0 ? (
                        <FeaturedListings properties={properties.data} />
                    ) : (
                        <p>No properties found matching your criteria.</p>
                    )}

                    <div className="mt-8 flex justify-center">
                        <div className="flex space-x-2">
                            {properties.links.map((link, index) => (
                                <Link key={index} href={link.url || ''} disabled={!link.url}>
                                    <Button variant={link.active ? 'default' : 'outline'} dangerouslySetInnerHTML={{ __html: link.label }} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}