import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { DollarSign, Home, MapPin, Search } from 'lucide-react';
import { useEffect } from 'react';
import { Label } from '../ui/label';

const SearchBar = ({ initialValues = {} }) => {
    const { data, setData, get, processing } = useForm({
        location: '',
        type: '',
        price_range: '',
        bedrooms: '',
        bathrooms: '',
        sqft: '',
        ...initialValues,
    });

    useEffect(() => {
        setData({ ...data, ...initialValues });
    }, [initialValues]);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        get(route('search'), {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <form onSubmit={submit}>
            <div className="relative z-30 mx-auto -mt-20 max-w-6xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-black">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    {/* Location */}
                    <div className="relative">
                        <Label className="mb-2 block text-sm font-medium text-foreground">Location</Label>
                        <div className="relative">
                            <MapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Enter city or neighborhood"
                                className="pl-10"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Property Type */}
                    <div>
                        <Label className="mb-2 block text-sm font-medium text-foreground">Property Type</Label>
                        <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                            <SelectTrigger>
                                <Home className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="house">House</SelectItem>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="condo">Condo</SelectItem>
                                <SelectItem value="villa">Villa</SelectItem>
                                <SelectItem value="townhouse">Townhouse</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Price Range */}
                    <div>
                        <Label className="mb-2 block text-sm font-medium text-foreground">Price Range</Label>
                        <Select value={data.price_range} onValueChange={(value) => setData('price_range', value)}>
                            <SelectTrigger>
                                <DollarSign className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0-500000">$0 - $500K</SelectItem>
                                <SelectItem value="500000-1000000">$500K - $1M</SelectItem>
                                <SelectItem value="1000000-2000000">$1M - $2M</SelectItem>
                                <SelectItem value="2000000-5000000">$2M - $5M</SelectItem>
                                <SelectItem value="5000000-1000000000">$5M+</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Search Button */}
                    <div className="flex items-end">
                        <Button type="submit" className="h-11 w-full bg-primary hover:bg-primary/90" disabled={processing}>
                            <Search className="mr-2 h-4 w-4" />
                            Search Properties
                        </Button>
                    </div>
                </div>

                {/* Advanced Filters */}
                <div className="mt-4 border-t border-border pt-4">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <Select value={data.bedrooms} onValueChange={(value) => setData('bedrooms', value)}>
                            <SelectTrigger className="h-9">
                                <SelectValue placeholder="Bedrooms" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1+ Bed</SelectItem>
                                <SelectItem value="2">2+ Beds</SelectItem>
                                <SelectItem value="3">3+ Beds</SelectItem>
                                <SelectItem value="4">4+ Beds</SelectItem>
                                <SelectItem value="5">5+ Beds</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={data.bathrooms} onValueChange={(value) => setData('bathrooms', value)}>
                            <SelectTrigger className="h-9">
                                <SelectValue placeholder="Bathrooms" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1+ Bath</SelectItem>
                                <SelectItem value="2">2+ Baths</SelectItem>
                                <SelectItem value="3">3+ Baths</SelectItem>
                                <SelectItem value="4">4+ Baths</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={data.sqft} onValueChange={(value) => setData('sqft', value)}>
                            <SelectTrigger className="h-9">
                                <SelectValue placeholder="Square Feet" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1000">1,000+ sqft</SelectItem>
                                <SelectItem value="2000">2,000+ sqft</SelectItem>
                                <SelectItem value="3000">3,000+ sqft</SelectItem>
                                <SelectItem value="5000">5,000+ sqft</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button variant="outline" className="h-9" type="button">
                            More Filters
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default SearchBar;
