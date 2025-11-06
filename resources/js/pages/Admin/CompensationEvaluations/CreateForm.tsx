import InputError from '@/components/input-error';
import SimpleEditor from '@/components/SimpleEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import type { PageProps } from '@/types';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

interface CreateCompensationEvaluationFormProps extends PageProps {
    can: {
        publish: boolean;
    };
}

export default function CreateCompensationEvaluationForm({ auth, can }: CreateCompensationEvaluationFormProps) {
    const { toast } = useToast();
    const [evaluationType, setEvaluationType] = useState('');

    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: auth.user.id,
        evaluation_type: '',
        status: 'draft',
        notes: '<p></p>',
        total_value: '',
        // Specific evaluation fields
        crop_type: '',
        area_acres: '',
        yield_per_acre: '',
        market_price_per_unit: '',
        damage_percentage: '',

        machine_type: '',
        make: '',
        model: '',
        year: '',
        condition: '',
        depreciation_rate: '',

        land_use_type: '',
        area_sqft: '',
        location_description: '',
        zoning_regulations: '',
        soil_quality: '',

        property_id: '',
        building_type: '',
        number_of_units: '',
        construction_year: '',
        renovation_cost: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.compensation-evaluations.store'), {
            onSuccess: () => {
                toast({
                    title: 'Evaluation Created',
                    description: 'The compensation evaluation has been successfully created.',
                });
                reset();
                setEvaluationType('');
            },
            onError: () => {
                toast({
                    title: 'Error',
                    description: 'Failed to create evaluation.',
                    variant: 'destructive',
                });
            },
        });
    };

    const handleEvaluationTypeChange = (value: string) => {
        setEvaluationType(value);
        setData('evaluation_type', value);
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
                                onChange={(e) => setData('area_acres', e.target.value)}
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
                                onChange={(e) => setData('yield_per_acre', e.target.value)}
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
                                onChange={(e) => setData('market_price_per_unit', e.target.value)}
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
                                onChange={(e) => setData('damage_percentage', e.target.value)}
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
                            <Input id="year" type="number" value={data.year} onChange={(e) => setData('year', e.target.value)} required />
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
                                onChange={(e) => setData('depreciation_rate', e.target.value)}
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
                                onChange={(e) => setData('area_sqft', e.target.value)}
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
                            <Input id="property_id" type="number" value={data.property_id} onChange={(e) => setData('property_id', e.target.value)} />
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
                                onChange={(e) => setData('number_of_units', e.target.value)}
                            />
                            <InputError message={errors.number_of_units} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="construction_year">Construction Year</Label>
                            <Input
                                id="construction_year"
                                type="number"
                                value={data.construction_year}
                                onChange={(e) => setData('construction_year', e.target.value)}
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
                                onChange={(e) => setData('renovation_cost', e.target.value)}
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
        <form onSubmit={submit} className="space-y-6">
            <div>
                <Label htmlFor="evaluation_type">Evaluation Type</Label>
                <Select onValueChange={handleEvaluationTypeChange} value={evaluationType}>
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
                        <Input id="total_value" type="number" value={data.total_value} onChange={(e) => setData('total_value', e.target.value)} />
                        <InputError message={errors.total_value} className="mt-2" />
                    </div>
                    <div>
                        <Label htmlFor="notes">Notes</Label>
                        <SimpleEditor content={data.notes} onChange={(newContent) => setData('notes', newContent)} />
                        <InputError message={errors.notes} className="mt-2" />
                    </div>
                    {can.publish && (
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
                    )}
                    <Button type="submit" disabled={processing}>
                        Create Evaluation
                    </Button>
                </>
            )}
        </form>
    );
}
