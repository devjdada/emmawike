import CreateEditValuationModal from '@/components/CreateEditValuationModal'; // Import the valuation modal
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { ArrowLeft, Edit, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Valuation {
    id: string;
    compensation_id: string;
    description: string;
    evaluation_type: string;
    value: number;
    created_at: string;
    updated_at: string;
    // ... all other fields from the Valuation model
    crop_type?: string;
    area_acres?: number;
    yield_per_acre?: number;
    market_price_per_unit?: number;
    damage_percentage?: number;
    machine_type?: string;
    model?: string;
    manufacture_year?: number;
    current_value?: number;
    depreciation_rate?: number;
    land_use_type?: string;
    area_sqft?: number;
    location_description?: string;
    zoning_regulations?: string;
    soil_quality?: string;
    number_of_units?: number;
    construction_year?: number;
    condition?: string;
    renovation_cost?: number;
    rate?: number;
    complete_level?: string;
    complete_amount?: number;
}

interface Compensation {
    id: string;
    notes: string;
    total_value: number;
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    name: string;
    phone: string;
    email: string;
    code: string;
    created_at: string;
    updated_at: string;
    valuations?: Valuation[]; // Eager loaded valuations
}

interface CompensationShowProps {
    auth: { user: { id: string; name: string; email: string } };
    compensation: Compensation;
}

export default function CompensationShow({ auth, compensation: initialCompensation }: CompensationShowProps) {
    const [compensation, setCompensation] = useState<Compensation>(initialCompensation);
    const { toast } = useToast();
    const { delete: inertiaDelete } = useForm();

    const [isValuationModalOpen, setIsValuationModalOpen] = useState(false);
    const [editingValuation, setEditingValuation] = useState<Valuation | null>(null);

    useEffect(() => {
        setCompensation(initialCompensation);
    }, [initialCompensation]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-NG', {
            // 'en-NG' for English (Nigeria) locale
            style: 'currency',
            currency: 'NGN', // Nigerian Naira
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    const handleDeleteValuation = (valuationId: string) => {
        if (confirm('Are you sure you want to delete this valuation record?')) {
            inertiaDelete(
                route('admin.compensations.valuations.destroy', {
                    compensation: compensation.id,
                    valuation: valuationId,
                }),
                {
                    onSuccess: () => {
                        toast({
                            title: 'Success',
                            description: 'Valuation deleted successfully.',
                        });
                        // Refresh compensation data to reflect deleted valuation
                        // This can be done by re-visiting the page or updating state if valuations are passed as props
                        // For now, we'll rely on Inertia's default behavior (full page refresh on redirect)
                    },
                    onError: (err) => {
                        console.error(err);
                        toast({
                            title: 'Error',
                            description: 'Failed to delete valuation.',
                            variant: 'destructive',
                        });
                    },
                },
            );
        }
    };

    const handleEditValuation = (valuation: Valuation) => {
        setEditingValuation(valuation);
        setIsValuationModalOpen(true);
    };

    const handleAddValuation = () => {
        setEditingValuation(null); // Clear for new creation
        setIsValuationModalOpen(true);
    };

    return (
        <AppLayout user={auth.user}>
            <Head title={`Compensation: ${compensation.code}`} />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Compensation Details: {compensation.code}</h1>
                        <p className="text-muted-foreground">Detailed view of compensation record and its associated valuations.</p>
                    </div>
                    <Link href={route('admin.compensations.index')}>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Compensations
                        </Button>
                    </Link>
                </div>

                <Card className="mb-8">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Compensation Information</CardTitle>
                        <Button onClick={handleAddValuation}>
                            <Plus className="mr-2 h-4 w-4" /> Add Valuation
                        </Button>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <p className="text-sm font-medium">Name:</p>
                            <p className="text-lg">{compensation.name}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Email:</p>
                            <p className="text-lg">{compensation.email}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Phone:</p>
                            <p className="text-lg">{compensation.phone}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Code:</p>
                            <p className="text-lg">{compensation.code}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Total Value:</p>
                            <p className="text-lg">{formatCurrency(Number(compensation.total_value))}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Status:</p>
                            <p className="text-lg">{compensation.status}</p>
                        </div>
                        {compensation.notes && (
                            <div className="md:col-span-2">
                                <p className="text-sm font-medium">Notes:</p>
                                <p className="text-lg">{compensation.notes || 'N/A'}</p>
                            </div>
                        )}

                        <div>
                            <p className="text-sm font-medium">Created At:</p>
                            <p className="text-lg">{format(new Date(compensation.created_at), 'MMM dd, yyyy HH:mm')}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Last Updated:</p>
                            <p className="text-lg">{format(new Date(compensation.updated_at), 'MMM dd, yyyy HH:mm')}</p>
                        </div>
                    </CardContent>
                </Card>

                <div className="max-sm:col-cols-1 mt-8 grid grid-cols-3 gap-4">
                    {compensation.valuations && compensation.valuations.length > 0 ? (
                        compensation.valuations.map((valuation) => {
                            return (
                                <div key={valuation.id}>
                                    {valuation.evaluation_type === 'crop' ? (
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Crop Valuation Details</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-300">Crop Type:</p>
                                                        <p className="text-lg">{valuation.crop_type || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-300">Area (Acres):</p>
                                                        <p className="text-lg">{valuation.area_acres || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-300">Yield per Acre:</p>
                                                        <p className="text-lg">{valuation.yield_per_acre || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-300">Market Price per Unit:</p>
                                                        <p className="text-lg">{valuation.market_price_per_unit || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-300">Damage Percentage:</p>
                                                        <p className="text-lg">
                                                            {valuation.damage_percentage ? `${valuation.damage_percentage}%` : 'N/A'}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-300">Calculated Value:</p>
                                                        <p className="text-lg">{formatCurrency(Number(valuation.value))}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="flex justify-end gap-2">
                                                <Button variant="outline" size="sm" onClick={() => handleEditValuation(valuation)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => handleDeleteValuation(valuation.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ) : valuation.evaluation_type === 'machine' ? (
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Machine Valuation Details</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                                    <div>
                                                        <p className="text-sm font-medium">Machine Type:</p>
                                                        <p className="text-lg">{valuation.machine_type || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">Model:</p>
                                                        <p className="text-lg">{valuation.model || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">Manufacture Year:</p>
                                                        <p className="text-lg">{valuation.manufacture_year || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">Current Value:</p>
                                                        <p className="text-lg">{formatCurrency(Number(valuation.current_value)) || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">Depreciation Rate (%):</p>
                                                        <p className="text-lg">
                                                            {valuation.depreciation_rate ? `${valuation.depreciation_rate}%` : 'N/A'}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">Calculated Value:</p>
                                                        <p className="text-lg">{formatCurrency(Number(valuation.value))}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="flex justify-end gap-2">
                                                <Button variant="outline" size="sm" onClick={() => handleEditValuation(valuation)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => handleDeleteValuation(valuation.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ) : valuation.evaluation_type === 'land' ? (
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Land Valuation Details</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                                    <div>
                                                        <p className="text-sm font-medium">Land Use Type:</p>
                                                        <p className="text-lg">{valuation.land_use_type || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">Area (sqft):</p>
                                                        <p className="text-lg">{valuation.area_sqft || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">Location Description:</p>
                                                        <p className="text-lg"></p>
                                                        {valuation.location_description || 'N/A'}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">Zoning Regulations:</p>
                                                        <p className="text-lg">{valuation.zoning_regulations || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">Soil Quality:</p>
                                                        <p className="text-lg">{valuation.soil_quality || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">Calculated Value:</p>
                                                        <p className="text-lg">{formatCurrency(Number(valuation.value))}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="flex justify-end gap-2">
                                                <Button variant="outline" size="sm" onClick={() => handleEditValuation(valuation)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => handleDeleteValuation(valuation.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ) : valuation.evaluation_type === 'property' ? (
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Property Valuation Details</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                                    <div>
                                                        <p className="text-sm font-medium">Number of Units:</p>
                                                        <p className="text-lg">{valuation.number_of_units || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">Construction Year:</p>
                                                        <p className="text-lg">{valuation.construction_year || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">Condition:</p>
                                                        <p className="text-lg">{valuation.condition || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">Renovation Cost:</p>
                                                        <p className="text-lg">{formatCurrency(Number(valuation.renovation_cost)) || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">Rate:</p>
                                                        <p className="text-lg">{valuation.rate || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">Complete Level:</p>
                                                        <p className="text-lg">{valuation.complete_level || 'N/A'}</p>
                                                    </div>
                                                    <div></div>
                                                    <div>
                                                        <p className="text-sm font-medium">Complete Amount:</p>
                                                        <p className="text-lg">{formatCurrency(Number(valuation.complete_amount)) || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="flex justify-end gap-2">
                                                <Button variant="outline" size="sm" onClick={() => handleEditValuation(valuation)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => handleDeleteValuation(valuation.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ) : null}
                                </div>
                            );
                        })
                    ) : (
                        <Card className="mt-4">
                            <CardContent>
                                <p className="text-center text-muted-foreground">No valuations found for this compensation.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
                {/* Create/Edit Valuation Modal */}
            </div>

            {/* Create/Edit Valuation Modal */}
            {compensation && (
                <CreateEditValuationModal
                    open={isValuationModalOpen}
                    onOpenChange={setIsValuationModalOpen}
                    editingValuation={editingValuation}
                    compensationId={compensation.id}
                />
            )}
        </AppLayout>
    );
}
