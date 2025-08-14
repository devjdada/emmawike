import MediaUploadModal from '@/components/media-upload-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import type { PageProps } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import type { CheckedState } from '@radix-ui/react-checkbox';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
    Bath,
    Bed,
    DollarSign,
    Download,
    Edit,
    ImagePlus,
    MapPin,
    MoreHorizontal,
    Plus,
    Search,
    Square,
    Star,
    Trash2,
    Upload,
    View,
    Home,
    Eye,
    TrendingUp,
} from 'lucide-react';
import { useState } from 'react';

interface Property {
    id: string;
    owner_id: number;
    title: string;
    description: string;
    type: string;
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
    media: Media[];
    views: number | null;
    inquiries: number | null;
}

interface PropertiesIndexProps extends PageProps {
    properties: Property[];
}

export default function PropertiesIndex({ auth, properties: initialProperties }: PropertiesIndexProps) {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
    const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
    const [currentPropertyId, setCurrentPropertyId] = useState<string | null>(null);

    const { delete: inertiaDelete } = useForm();

    const truncateAddress = (address: string, maxLength = 30) => {
        if (address.length <= maxLength) {
            return address;
        }
        return address.substring(0, maxLength) + '...';
    };

    const filteredProperties = initialProperties.filter((property) => {
        const matchesSearch =
            property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.address_line1.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.country.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || property.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const handleSelectAll = (checked: CheckedState) => {
        if (checked === true) {
            setSelectedProperties(filteredProperties.map((p) => p.id));
        } else {
            setSelectedProperties([]);
        }
    };

    const handleSelect = (id: string, checked: boolean) => {
        if (checked) {
            setSelectedProperties([...selectedProperties, id]);
        } else {
            setSelectedProperties(selectedProperties.filter((pId) => pId !== id));
        }
    };

    const handleExport = () => {
        const doc = new jsPDF();
        const tableData = selectedProperties.map((id) => {
            const property = initialProperties.find((p) => p.id === id);
            return [
                property?.title,
                `${property?.address_line1}, ${property?.city}`,
                `${property?.currency} ${property?.price.toLocaleString()}`,
                property?.status,
            ];
        });

        (doc as any).autoTable({
            head: [['Title', 'Address', 'Price', 'Status']],
            body: tableData,
        });

        doc.save('properties.pdf');
    };

    const handleAddMediaClick = (propertyId: string) => {
        console.log('Add Media button clicked for property: ', propertyId);
        setCurrentPropertyId(propertyId);
        setIsMediaModalOpen(true);
    };

    const handleMediaUpload = (propertyId: string, files: File[], label: string) => {
        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`media[${index}][file]`, file);
            formData.append(`media[${index}][label]`, label);
        });

        router.post(route('properties.addMedia', propertyId), formData, {
            onSuccess: () => {
                toast({
                    title: 'Media Uploaded',
                    description: 'Media files have been successfully uploaded.',
                });
                // No need to close modal or clear currentPropertyId here, as each modal is self-contained
            },
            onError: (e) => {
                console.error(e);
                toast({
                    title: 'Error',
                    description: 'Failed to upload media.',
                    variant: 'destructive',
                });
            },
        });
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this property?')) {
            inertiaDelete(route('properties.destroy', id), {
                onSuccess: () => {
                    toast({
                        title: 'Property Deleted',
                        description: 'The property has been removed from the listings.',
                    });
                },
                onError: () => {
                    toast({
                        title: 'Error',
                        description: 'Failed to delete property.',
                        variant: 'destructive',
                    });
                },
            });
        }
    };

    const handleStatusChange = (id: string, newStatus: string) => {
        router.put(
            route('properties.updateStatus', id),
            { status: newStatus },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    toast({
                        title: 'Status Updated',
                        description: `Property status changed to ${newStatus}.`,
                    });
                },
                onError: () => {
                    toast({
                        title: 'Error',
                        description: 'Failed to update status.',
                        variant: 'destructive',
                    });
                },
            },
        );
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'published':
                return 'default';
            case 'available':
                return 'default';
            case 'draft':
                return 'secondary';
            case 'archived':
                return 'destructive';
            default:
                return 'secondary';
        }
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Properties" />

            <div className="pt-24 pb-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">Property Management</h1>
                                <p className="text-muted-foreground">Manage all your property listings in one place</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" onClick={handleExport} disabled={selectedProperties.length === 0}>
                                <Download className="mr-2 h-4 w-4" />
                                Export
                            </Button>
                            <Button variant="outline">
                                <Upload className="mr-2 h-4 w-4" />
                                Import
                            </Button>
                            <Button asChild>
                                <Link href={route('properties.create')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Property
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Total Properties</p>
                                        <p className="text-3xl font-bold text-foreground">{filteredProperties.length}</p>
                                    </div>
                                    <Home className="h-8 w-8 text-primary" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">All property listings</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Published</p>
                                        <p className="text-3xl font-bold text-foreground">
                                            {filteredProperties.filter(p => p.status === "published").length}
                                        </p>
                                    </div>
                                    <Eye className="h-8 w-8 text-green-500" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">Live on the market</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                                        <p className="text-3xl font-bold text-foreground">
                                            {filteredProperties.reduce((sum, p) => sum + (p.views || 0), 0).toLocaleString()}
                                        </p>
                                    </div>
                                    <TrendingUp className="h-8 w-8 text-blue-500" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">Across all properties</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Inquiries</p>
                                        <p className="text-3xl font-bold text-foreground">
                                            {filteredProperties.reduce((sum, p) => sum + (p.inquiries || 0), 0)}
                                        </p>
                                    </div>
                                    <DollarSign className="h-8 w-8 text-yellow-500" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">Total customer interest</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Filters */}
                    <div className="mb-6">
                        <div className="p-4">
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <div className="relative flex-1">
                                    <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search properties..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="available">Available</SelectItem>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Properties Table */}
                    <div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">Properties ({filteredProperties.length})</h2>
                            <p className="text-muted-foreground">Manage your property listings, track performance, and update details</p>
                        </div>
                        <div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[40px]">
                                            <Checkbox
                                                checked={
                                                    selectedProperties.length === filteredProperties.length && filteredProperties.length > 0
                                                        ? true
                                                        : selectedProperties.length > 0
                                                          ? 'indeterminate'
                                                          : false
                                                }
                                                onCheckedChange={handleSelectAll}
                                            />
                                        </TableHead>
                                        <TableHead>Property</TableHead>
                                        <TableHead>Address</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Details</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredProperties.map((property) => (
                                        <TableRow key={property.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedProperties.includes(property.id)}
                                                    onCheckedChange={(checked) => handleSelect(property.id, checked as boolean)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div>
                                                        <div className="font-medium">{property.title}</div>
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            {property.type}
                                                            {property.is_featured && (
                                                                <Badge variant="secondary" className="text-xs">
                                                                    <Star className="mr-1 h-3 w-3" />
                                                                    Featured
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                                    {truncateAddress(`${property.address_line1}, ${property.city}`)}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                                    {property.currency} {property.price.toLocaleString()}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <Bed className="h-4 w-4" />
                                                        {property.bedrooms}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Bath className="h-4 w-4" />
                                                        {property.bathrooms}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Square className="h-4 w-4" />
                                                        {property.area_sq_ft}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Select value={property.status} onValueChange={(value) => handleStatusChange(property.id, value)}>
                                                    <SelectTrigger className="w-[120px]">
                                                        <SelectValue>
                                                            <Badge variant={getStatusVariant(property.status)}>{property.status}</Badge>
                                                        </SelectValue>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="published">Published</SelectItem>
                                                        <SelectItem value="available">Available</SelectItem>
                                                        <SelectItem value="draft">Draft</SelectItem>
                                                        <SelectItem value="archived">Archived</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('properties.show', property.id)}>
                                                                <View className="mr-2 h-4 w-4" />
                                                                View Details
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <MediaUploadModal onUpload={(files, label) => handleMediaUpload(property.id, files, label)}>
                                                            <DropdownMenuItem>
                                                                <ImagePlus className="mr-2 h-4 w-4" />
                                                                Add Media
                                                            </DropdownMenuItem>
                                                        </MediaUploadModal>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('properties.edit', property.id)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() => handleDelete(property.id)}
                                                            className="text-destructive focus:text-destructive"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
