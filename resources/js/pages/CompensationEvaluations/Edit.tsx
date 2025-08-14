import InputError from '@/components/input-error';
import SimpleEditor from '@/components/SimpleEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface CompensationEvaluation {
    id: number;
    user_id: number;
    evaluation_type: string;
    evaluatable_id: number;
    evaluatable_type: string;
    status: string;
    notes: string | null;
    total_value: number | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    evaluatable: any; // This will be the specific evaluation object (CropEvaluation, etc.)
}

interface EditCompensationEvaluationProps extends PageProps {
    evaluation: CompensationEvaluation;
}

export default function EditCompensationEvaluation({ auth, evaluation: initialEvaluation }: EditCompensationEvaluationProps) {
    const { toast } = useToast();
    const [evaluationType, setEvaluationType] = useState(initialEvaluation.evaluation_type);

    const { data, setData, put, processing, errors, reset } = useForm({
        user_id: initialEvaluation.user_id,
        evaluation_type: initialEvaluation.evaluation_type,
        status: initialEvaluation.status,
        notes: initialEvaluation.notes || '<p></p>',
        total_value: initialEvaluation.total_value || '',
        // Specific evaluation fields
        crop_type: initialEvaluation.evaluatable.crop_type || '',
        area_acres: initialEvaluation.evaluatable.area_acres || '',
        yield_per_acre: initialEvaluation.evaluatable.yield_per_acre || '',
        market_price_per_unit: initialEvaluation.evaluatable.market_price_per_unit || '',
        damage_percentage: initialEvaluation.evaluatable.damage_percentage || '',

        machine_type: initialEvaluation.evaluatable.machine_type || '',
        make: initialEvaluation.evaluatable.make || '',
        model: initialEvaluation.evaluatable.model || '',
        year: initialEvaluation.evaluatable.year || '',
        condition: initialEvaluation.evaluatable.condition || '',
        depreciation_rate: initialEvaluation.evaluatable.depreciation_rate || '',

        land_use_type: initialEvaluation.evaluatable.land_use_type || '',
        area_sqft: initialEvaluation.evaluatable.area_sqft || '',
        location_description: initialEvaluation.evaluatable.location_description || '',
        zoning_regulations: initialEvaluation.evaluatable.zoning_regulations || '',
        soil_quality: initialEvaluation.evaluatable.soil_quality || '',

        property_id: initialEvaluation.evaluatable.property_id || '',
        building_type: initialEvaluation.evaluatable.building_type || '',
        number_of_units: initialEvaluation.evaluatable.number_of_units || '',
        construction_year: initialEvaluation.evaluatable.construction_year || '',
        renovation_cost: initialEvaluation.evaluatable.renovation_cost || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('compensation-evaluations.update', initialEvaluation.id), {
            onSuccess: () => {
                toast({ title: 'Evaluation Updated', description: 'The compensation evaluation has been successfully updated.' });
            },
            onError: () => {
                toast({ title: 'Error', description: 'Failed to update evaluation.', variant: 'destructive' });
            },
        });
    };

    const renderSpecificForm = () => {
        switch (evaluationType) {
            case 'crop':
                return (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="crop_type">Crop Type</Label>
                            <Input
                                id="crop_type"
                                type="text"
                                value={data.crop_type}
                                onChange={(e) => setData('crop_type', e.target.value)}
                                required
                            />
                            <InputError message={errors.crop_type} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="area_acres">Area (Acres)</Label>
                            <Input
                                id="area_acres"
                                type="number"
                                value={data.area_acres}
                                onChange={(e) => setData('area_acres', parseFloat(e.target.value))}
                                required
                            />
                            <InputError message={errors.area_acres} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="yield_per_acre">Yield Per Acre</Label>
                            <Input
                                id="yield_per_acre"
                                type="number"
                                value={data.yield_per_acre}
                                onChange={(e) => setData('yield_per_acre', parseFloat(e.target.value))}
                                required
                            />
                            <InputError message={errors.yield_per_acre} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="market_price_per_unit">Market Price Per Unit</Label>
                            <Input
                                id="market_price_per_unit"
                                type="number"
                                value={data.market_price_per_unit}
                                onChange={(e) => setData('market_price_per_unit', parseFloat(e.target.value))}
                                required
                            />
                            <InputError message={errors.market_price_per_unit} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="damage_percentage">Damage Percentage (%)</Label>
                            <Input
                                id="damage_percentage"
                                type="number"
                                value={data.damage_percentage}
                                onChange={(e) => setData('damage_percentage', parseFloat(e.target.value))}
                            />
                            <InputError message={errors.damage_percentage} className="mt-2" />
                        </div>
                    </div>
                );
            case 'machine':
                return (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="machine_type">Machine Type</Label>
                            <Input
                                id="machine_type"
                                type="text"
                                value={data.machine_type}
                                onChange={(e) => setData('machine_type', e.target.value)}
                                required
                            />
                            <InputError message={errors.machine_type} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="make">Make</Label>
                            <Input id="make" type="text" value={data.make} onChange={(e) => setData('make', e.target.value)} required />
                            <InputError message={errors.make} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="model">Model</Label>
                            <Input id="model" type="text" value={data.model} onChange={(e) => setData('model', e.target.value)} required />
                            <InputError message={errors.model} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="year">Year</Label>
                            <Input id="year" type="number" value={data.year} onChange={(e) => setData('year', parseInt(e.target.value))} required />
                            <InputError message={errors.year} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="condition">Condition</Label>
                            <Select onValueChange={(value) => setData('condition', value)} value={data.condition}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select condition" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="new">New</SelectItem>
                                    <SelectItem value="excellent">Excellent</SelectItem>
                                    <SelectItem value="good">Good</SelectItem>
                                    <SelectItem value="fair">Fair</SelectItem>
                                    <SelectItem value="poor">Poor</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.condition} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="depreciation_rate">Depreciation Rate (%)</Label>
                            <Input
                                id="depreciation_rate"
                                type="number"
                                value={data.depreciation_rate}
                                onChange={(e) => setData('depreciation_rate', parseFloat(e.target.value))}
                                required
                            />
                            <InputError message={errors.depreciation_rate} className="mt-2" />
                        </div>
                    </div>
                );
            case 'land':
                return (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="land_use_type">Land Use Type</Label>
                            <Select onValueChange={(value) => setData('land_use_type', value)} value={data.land_use_type}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select land use type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="agricultural">Agricultural</SelectItem>
                                    <SelectItem value="residential">Residential</SelectItem>
                                    <SelectItem value="commercial">Commercial</SelectItem>
                                    <SelectItem value="industrial">Industrial</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.land_use_type} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="area_sqft">Area (Sq. Ft.)</Label>
                            <Input
                                id="area_sqft"
                                type="number"
                                value={data.area_sqft}
                                onChange={(e) => setData('area_sqft', parseFloat(e.target.value))}
                                required
                            />
                            <InputError message={errors.area_sqft} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="location_description">Location Description</Label>
                            <Input
                                id="location_description"
                                type="text"
                                value={data.location_description}
                                onChange={(e) => setData('location_description', e.target.value)}
                                required
                            />
                            <InputError message={errors.location_description} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="zoning_regulations">Zoning Regulations</Label>
                            <Input
                                id="zoning_regulations"
                                type="text"
                                value={data.zoning_regulations}
                                onChange={(e) => setData('zoning_regulations', e.target.value)}
                            />
                            <InputError message={errors.zoning_regulations} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="soil_quality">Soil Quality</Label>
                            <Input
                                id="soil_quality"
                                type="text"
                                value={data.soil_quality}
                                onChange={(e) => setData('soil_quality', e.target.value)}
                            />
                            <InputError message={errors.soil_quality} className="mt-2" />
                        </div>
                    </div>
                );
            case 'property':
                return (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="property_id">Property ID (Optional)</Label>
                            <Input
                                id="property_id"
                                type="number"
                                value={data.property_id}
                                onChange={(e) => setData('property_id', parseInt(e.target.value))}
                            />
                            <InputError message={errors.property_id} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="building_type">Building Type</Label>
                            <Select onValueChange={(value) => setData('building_type', value)} value={data.building_type}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select building type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="house">House</SelectItem>
                                    <SelectItem value="apartment">Apartment</SelectItem>
                                    <SelectItem value="commercial">Commercial</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.building_type} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="number_of_units">Number of Units</Label>
                            <Input
                                id="number_of_units"
                                type="number"
                                value={data.number_of_units}
                                onChange={(e) => setData('number_of_units', parseInt(e.target.value))}
                            />
                            <InputError message={errors.number_of_units} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="construction_year">Construction Year</Label>
                            <Input
                                id="construction_year"
                                type="number"
                                value={data.construction_year}
                                onChange={(e) => setData('construction_year', parseInt(e.target.value))}
                                required
                            />
                            <InputError message={errors.construction_year} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="condition">Condition</Label>
                            <Select onValueChange={(value) => setData('condition', value)} value={data.condition}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select condition" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="new">New</SelectItem>
                                    <SelectItem value="excellent">Excellent</SelectItem>
                                    <SelectItem value="good">Good</SelectItem>
                                    <SelectItem value="fair">Fair</SelectItem>
                                    <SelectItem value="poor">Poor</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.condition} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="renovation_cost">Renovation Cost</Label>
                            <Input
                                id="renovation_cost"
                                type="number"
                                value={data.renovation_cost}
                                onChange={(e) => setData('renovation_cost', parseFloat(e.target.value))}
                            />
                            <InputError message={errors.renovation_cost} className="mt-2" />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Edit Compensation Evaluation" />

            <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
                <h1 className="mb-6 text-2xl font-semibold">Edit Compensation Evaluation</h1>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="evaluation_type">Evaluation Type</Label>
                        <Select onValueChange={(value) => setData('evaluation_type', value)} value={evaluationType} disabled>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select an evaluation type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="crop">Crop Evaluation</SelectItem>
                                <SelectItem value="machine">Machine Evaluation</SelectItem>
                                <SelectItem value="land">Land Evaluation</SelectItem>
                                <SelectItem value="property">Property Evaluation</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.evaluation_type} className="mt-2" />
                    </div>

                    {renderSpecificForm()}

                    {evaluationType && (
                        <>
                            <div>
                                <Label htmlFor="total_value">Total Value</Label>
                                <Input
                                    id="total_value"
                                    type="number"
                                    value={data.total_value}
                                    onChange={(e) => setData('total_value', parseFloat(e.target.value))}
                                />
                                <InputError message={errors.total_value} className="mt-2" />
                            </div>
                            <div>
                                <Label htmlFor="notes">Notes</Label>
                                <SimpleEditor content={data.notes} onChange={(newContent) => setData('notes', newContent)} />
                                <InputError message={errors.notes} className="mt-2" />
                            </div>
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select onValueChange={(value) => setData('status', value)} value={data.status}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="approved">Approved</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>
                            <Button type="submit" disabled={processing}>
                                Update Evaluation
                            </Button>
                        </>
                    )}
                </form>
            </div>
        </AppLayout>
    );
}
