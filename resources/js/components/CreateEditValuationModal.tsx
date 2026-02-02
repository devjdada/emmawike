import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface ValuationData {
    id?: string;
    compensation_id: string;
    description: string;
    evaluation_type: string;
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
    value?: number;
    complete_level?: string;
    complete_amount?: number;
}

interface CreateEditValuationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editingValuation?: ValuationData | null;
    compensationId: string; // The ID of the parent compensation
}

export default function CreateEditValuationModal({ open, onOpenChange, editingValuation, compensationId }: CreateEditValuationModalProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm<ValuationData>({
        compensation_id: compensationId,
        description: '',
        evaluation_type: '',
        crop_type: '',
        area_acres: 0,
        yield_per_acre: 1,
        market_price_per_unit: 0,
        damage_percentage: 0,
        machine_type: '',
        model: '',
        manufacture_year: 0,
        current_value: 0,
        depreciation_rate: 0,
        land_use_type: '',
        area_sqft: 0,
        location_description: '',
        zoning_regulations: '',
        soil_quality: '',
        number_of_units: 1,
        construction_year: 0,
        condition: '',
        renovation_cost: 0,
        rate: 1,
        value: 0,
        complete_level: '',
        complete_amount: 0,
    });

    const [length, setLength] = useState(0);
    const [width, setWidth] = useState(0);

    const { toast } = useToast();

    useEffect(() => {
        if (editingValuation) {
            setData(editingValuation);
        } else {
            reset();
            setData('compensation_id', compensationId); // Ensure compensation_id is set for new valuations
        }
    }, [editingValuation, open, compensationId]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingValuation) {
            put(
                route('admin.compensations.valuations.update', {
                    compensation: compensationId,
                    valuation: editingValuation.id,
                }),
                {
                    onSuccess: () => {
                        toast({
                            title: 'Success',
                            description: 'Valuation updated successfully.',
                        });
                        onOpenChange(false);
                        reset();
                    },
                    onError: (err) => {
                        console.error(err);
                        toast({
                            title: 'Error',
                            description: 'Failed to update valuation.',
                            variant: 'destructive',
                        });
                    },
                },
            );
        } else {
            post(
                route('admin.compensations.valuations.store', {
                    compensation: compensationId,
                }),
                {
                    onSuccess: () => {
                        toast({
                            title: 'Success',
                            description: 'Valuation created successfully.',
                        });
                        onOpenChange(false);
                        reset();
                    },
                    onError: (err) => {
                        console.error(err);
                        toast({
                            title: 'Error',
                            description: 'Failed to create valuation.',
                            variant: 'destructive',
                        });
                    },
                },
            );
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>{editingValuation ? 'Edit Valuation' : 'Add New Valuation'}</DialogTitle>
                    <DialogDescription>
                        {editingValuation ? 'Make changes to the valuation record here.' : 'Fill in the details to create a new valuation record.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="evaluation_type" className="col-span-4 text-right">
                            Evaluation Type
                        </Label>
                        <Select onValueChange={(value) => setData('evaluation_type', value)} value={data.evaluation_type}>
                            <SelectTrigger className="col-span-4">
                                <SelectValue placeholder="Select evaluation type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="crop">Crop Evaluation</SelectItem>
                                <SelectItem value="machine">Machine Evaluation</SelectItem>
                                <SelectItem value="land">Land Evaluation</SelectItem>
                                <SelectItem value="property">Property Evaluation</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.evaluation_type && <p className="col-span-4 text-right text-xs text-red-500">{errors.evaluation_type}</p>}
                    </div>

                    {/* Dynamic fields based on evaluation_type */}
                    {data.evaluation_type === 'crop' && (
                        <>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="col-span-4 text-right">
                                    Description (Community)
                                </Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="col-span-4"
                                />
                                {errors.description && <p className="col-span-4 text-right text-xs text-red-500">{errors.description}</p>}
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="crop_type" className="col-span-4 text-right">
                                    Crop Type
                                </Label>
                                <Input
                                    id="crop_type"
                                    value={data.crop_type}
                                    onChange={(e) => setData('crop_type', e.target.value)}
                                    className="col-span-4"
                                />
                                {errors.crop_type && <p className="col-span-4 text-right text-xs text-red-500">{errors.crop_type}</p>}
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {/* Rate */}
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="rate" className="col-span-4 text-right">
                                        Rate
                                    </Label>
                                    <Input
                                        id="rate"
                                        type="number"
                                        value={data.rate}
                                        onChange={(e) => {
                                            const newRate = parseFloat(e.target.value);
                                            setData('rate', isNaN(newRate) ? 0 : newRate);
                                            setData(
                                                'value',
                                                (isNaN(parseFloat(data.yield_per_acre)) ? 0 : parseFloat(data.yield_per_acre)) *
                                                    (isNaN(newRate) ? 0 : newRate),
                                            );
                                        }}
                                        className="col-span-4"
                                    />
                                    {errors.rate && <p className="col-span-4 text-right text-xs text-red-500">{errors.rate}</p>}
                                </div>
                                {/* <div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="area_acres" className="text-right col-span-4">
									Area (Acres)
								</Label>
								<Input
									id="area_acres"
									type="number"
									value={data.area_acres}
									onChange={(e) =>
										setData("area_acres", parseFloat(e.target.value))
									}
									className="col-span-4"
								/>
								{errors.area_acres && (
									<p className="col-span-4 text-right text-red-500 text-xs">
										{errors.area_acres}
									</p>
								)}
							</div> */}
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="yield_per_acre" className="col-span-4 text-right">
                                        Quantity
                                    </Label>
                                    <Input
                                        id="yield_per_acre"
                                        type="number"
                                        min={1}
                                        value={data.yield_per_acre}
                                        onChange={(e) => {
                                            const newYield = parseFloat(e.target.value);
                                            setData('yield_per_acre', isNaN(newYield) ? 0 : newYield);
                                            setData(
                                                'value',
                                                (isNaN(parseFloat(data.rate)) ? 0 : parseFloat(data.rate)) * (isNaN(newYield) ? 0 : newYield),
                                            );
                                        }}
                                        className="col-span-4"
                                    />
                                    {errors.yield_per_acre && <p className="col-span-4 text-right text-xs text-red-500">{errors.yield_per_acre}</p>}
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="market_price_per_unit" className="col-span-4 text-right">
                                        Value (NGN)
                                    </Label>
                                    <Input
                                        id="market_price_per_unit"
                                        type="number"
                                        value={data.market_price_per_unit}
                                        onChange={(e) => {
                                            const newValue = parseFloat(e.target.value);
                                            setData('market_price_per_unit', isNaN(newValue) ? 0 : newValue);
                                        }}
                                        className="col-span-4"
                                    />{' '}
                                    {errors.value && <p className="col-span-4 text-right text-xs text-red-500">{errors.value}</p>}
                                </div>
                                {/* <div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="damage_percentage" className="text-right col-span-4">
									Damage Percentage
								</Label>
																	<Input
																		id="damage_percentage"
																		type="number"
																		value={data.damage_percentage}
																		onChange={(e) => {
																			const newValue = parseFloat(e.target.value);
																			setData("damage_percentage", isNaN(newValue) ? 0 : newValue);
																		}}
																		className="col-span-4"
																	/>								{errors.damage_percentage && (
									<p className="col-span-4 text-right text-red-500 text-xs">
										{errors.damage_percentage}
									</p>
								)}
							</div> */}
                            </div>
                        </>
                    )}

                    {data.evaluation_type === 'machine' && (
                        <>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="col-span-4 text-right">
                                    Description
                                </Label>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="rate" className="col-span-4 text-right">
                                        Rate
                                    </Label>
                                    <Input
                                        id="rate"
                                        type="number"
                                        value={data.rate}
                                        onChange={(e) => setData('rate', parseFloat(e.target.value))}
                                        className="col-span-4"
                                    />
                                    {errors.rate && <p className="col-span-4 text-right text-xs text-red-500">{errors.rate}</p>}
                                </div>

                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="col-span-4"
                                />
                                {errors.description && <p className="col-span-4 text-right text-xs text-red-500">{errors.description}</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="machine_type" className="col-span-4 text-right">
                                    Machine Type
                                </Label>
                                <Input
                                    id="machine_type"
                                    value={data.machine_type}
                                    onChange={(e) => setData('machine_type', e.target.value)}
                                    className="col-span-4"
                                />
                                {errors.machine_type && <p className="col-span-4 text-right text-xs text-red-500">{errors.machine_type}</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="model" className="col-span-4 text-right">
                                    Model
                                </Label>
                                <Input id="model" value={data.model} onChange={(e) => setData('model', e.target.value)} className="col-span-4" />
                                {errors.model && <p className="col-span-4 text-right text-xs text-red-500">{errors.model}</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="manufacture_year" className="col-span-4 text-right">
                                    Manufacture Year
                                </Label>
                                <Input
                                    id="manufacture_year"
                                    type="number"
                                    value={data.manufacture_year}
                                    onChange={(e) => setData('manufacture_year', parseInt(e.target.value))}
                                    className="col-span-4"
                                />
                                {errors.manufacture_year && <p className="col-span-4 text-right text-xs text-red-500">{errors.manufacture_year}</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="current_value" className="col-span-4 text-right">
                                    Current Value
                                </Label>
                                <Input
                                    id="current_value"
                                    type="number"
                                    value={data.current_value}
                                    onChange={(e) => {
                                        const newValue = parseFloat(e.target.value);
                                        setData('current_value', isNaN(newValue) ? 0 : newValue);
                                    }}
                                    className="col-span-4"
                                />{' '}
                                {errors.current_value && <p className="col-span-4 text-right text-xs text-red-500">{errors.current_value}</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="depreciation_rate" className="col-span-4 text-right">
                                    Depreciation Rate
                                </Label>
                                <Input
                                    id="depreciation_rate"
                                    type="number"
                                    value={data.depreciation_rate}
                                    onChange={(e) => {
                                        const newValue = parseFloat(e.target.value);
                                        setData('depreciation_rate', isNaN(newValue) ? 0 : newValue);
                                    }}
                                    className="col-span-4"
                                />{' '}
                                {errors.depreciation_rate && <p className="col-span-4 text-right text-xs text-red-500">{errors.depreciation_rate}</p>}
                            </div>
                        </>
                    )}

                    {data.evaluation_type === 'land' && (
                        <>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="col-span-4 text-right">
                                    Description
                                </Label>

                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="col-span-4"
                                />
                                {errors.description && <p className="col-span-4 text-right text-xs text-red-500">{errors.description}</p>}
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="grid grid-cols-2 items-center gap-4">
                                    <Label htmlFor="length" className="col-span-4 text-right">
                                        length (M)
                                    </Label>
                                    <Input
                                        id="length"
                                        type="number"
                                        value={length}
                                        onChange={(e) => {
                                            setLength(parseFloat(e.target.value));
                                            const newYield = parseFloat(e.target.value) * width;
                                            setData('area_sqft', isNaN(newYield) ? 0 : newYield);
                                            const newValue = data.rate * data.area_sqft;
                                            setData('value', isNaN(newValue) ? 0 : newValue);
                                        }}
                                        className="col-span-4"
                                    />
                                </div>
                                <div className="grid grid-cols-2 items-center gap-4">
                                    <Label htmlFor="width" className="col-span-4 text-right">
                                        Width (M)
                                    </Label>
                                    <Input
                                        id="width"
                                        type="number"
                                        value={width}
                                        onChange={(e) => {
                                            setWidth(parseFloat(e.target.value));
                                            const newYield = parseFloat(e.target.value) * length;
                                            setData('area_sqft', isNaN(newYield) ? 0 : newYield);
                                            const newValue = data.rate * data.area_sqft;
                                            setData('value', isNaN(newValue) ? 0 : newValue);
                                        }}
                                        className="col-span-4"
                                    />
                                </div>
                                {/* <div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="land_use_type" className="text-right col-span-4">
									Land Use Type
								</Label>
								<Input
									id="land_use_type"
									value={data.land_use_type}
									onChange={(e) => setData("land_use_type", e.target.value)}
									className="col-span-4"
								/>
								{errors.land_use_type && (
									<p className="col-span-4 text-right text-red-500 text-xs">
										{errors.land_use_type}
									</p>
								)}
							</div> */}
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="area_sqft" className="col-span-4 text-right">
                                        Area (SqFt)
                                    </Label>
                                    <Input
                                        id="area_sqft"
                                        type="number"
                                        value={data.area_sqft}
                                        onChange={(e) => {
                                            setData('area_sqft', parseFloat(e.target.value));
                                            const newArea = parseFloat(e.target.value);
                                            const newValue = newArea * data.rate;
                                            setData('value', isNaN(newValue) ? 0 : newValue);
                                        }}
                                        className="col-span-4"
                                    />{' '}
                                    {errors.area_sqft && <p className="col-span-4 text-right text-xs text-red-500">{errors.area_sqft}</p>}
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="rate" className="col-span-4 text-right">
                                        Rate
                                    </Label>
                                    <Input
                                        id="rate"
                                        type="number"
                                        value={data.rate}
                                        onChange={(e) => {
                                            setData('rate', parseFloat(e.target.value));
                                            const newRate = parseFloat(e.target.value);
                                            const newValue = newRate * data.area_sqft;
                                            setData('value', isNaN(newValue) ? 0 : newValue);
                                        }}
                                        className="col-span-4"
                                    />
                                    {errors.rate && <p className="col-span-4 text-right text-xs text-red-500">{errors.rate}</p>}
                                </div>

                                <div className="col-span-2 grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="area_sqft" className="col-span-4 text-right">
                                        Value (NGN)
                                    </Label>
                                    <Input
                                        id="value"
                                        type="number"
                                        value={data.value}
                                        onChange={(e) => {
                                            const newValue = parseFloat(e.target.value);
                                            setData('value', isNaN(newValue) ? 0 : newValue);
                                        }}
                                        className="col-span-4"
                                    />{' '}
                                    {errors.area_sqft && <p className="col-span-4 text-right text-xs text-red-500">{errors.area_sqft}</p>}
                                </div>
                            </div>
                            {/* <div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="location_description" className="text-right col-span-4">
									Location Description
								</Label>
								<Textarea
									id="location_description"
									value={data.location_description}
									onChange={(e) =>
										setData("location_description", e.target.value)
									}
									className="col-span-4"
								/>
								{errors.location_description && (
									<p className="col-span-4 text-right text-red-500 text-xs">
										{errors.location_description}
									</p>
								)}
							</div> */}
                            {/* <div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="zoning_regulations" className="text-right col-span-4">
									Zoning Regulations
								</Label>
								<Input
									id="zoning_regulations"
									value={data.zoning_regulations}
									onChange={(e) =>
										setData("zoning_regulations", e.target.value)
									}
									className="col-span-4"
								/>
								{errors.zoning_regulations && (
									<p className="col-span-4 text-right text-red-500 text-xs">
										{errors.zoning_regulations}
									</p>
								)}
							</div> */}
                            {/* <div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="soil_quality" className="text-right col-span-4">
									Soil Quality
								</Label>
								<Input
									id="soil_quality"
									value={data.soil_quality}
									onChange={(e) => setData("soil_quality", e.target.value)}
									className="col-span-4"
								/>
								{errors.soil_quality && (
									<p className="col-span-4 text-right text-red-500 text-xs">
										{errors.soil_quality}
									</p>
								)}
							</div> */}
                        </>
                    )}

                    {data.evaluation_type === 'property' && (
                        <>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="col-span-4 text-right">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="col-span-4"
                                />
                                {errors.description && <p className="col-span-4 text-right text-xs text-red-500">{errors.description}</p>}
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="number_of_units" className="col-span-4 text-right">
                                        Number of Units
                                    </Label>
                                    <Input
                                        id="number_of_units"
                                        type="number"
                                        value={data.number_of_units}
                                        onChange={(e) => {
                                            const newValue = parseInt(e.target.value);
                                            setData('number_of_units', isNaN(newValue) ? 0 : newValue);
                                        }}
                                        className="col-span-4"
                                    />{' '}
                                    {errors.number_of_units && <p className="col-span-4 text-right text-xs text-red-500">{errors.number_of_units}</p>}
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="construction_year" className="col-span-4 text-right">
                                        Construction Year
                                    </Label>
                                    <Input
                                        id="construction_year"
                                        type="number"
                                        value={data.construction_year}
                                        onChange={(e) => {
                                            const newValue = parseInt(e.target.value);
                                            setData('construction_year', isNaN(newValue) ? 0 : newValue);
                                        }}
                                        className="col-span-4"
                                    />{' '}
                                    {errors.construction_year && (
                                        <p className="col-span-4 text-right text-xs text-red-500">{errors.construction_year}</p>
                                    )}
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="condition" className="col-span-4 text-right">
                                        Condition
                                    </Label>
                                    <Input
                                        id="condition"
                                        value={data.condition}
                                        onChange={(e) => setData('condition', e.target.value)}
                                        className="col-span-4"
                                    />
                                    {errors.condition && <p className="col-span-4 text-right text-xs text-red-500">{errors.condition}</p>}
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="renovation_cost" className="col-span-4 text-right">
                                        Renovation Cost
                                    </Label>
                                    <Input
                                        id="renovation_cost"
                                        type="number"
                                        value={data.renovation_cost}
                                        onChange={(e) => {
                                            const newValue = parseFloat(e.target.value);
                                            setData('renovation_cost', isNaN(newValue) ? 0 : newValue);
                                        }}
                                        className="col-span-4"
                                    />{' '}
                                    {errors.renovation_cost && <p className="col-span-4 text-right text-xs text-red-500">{errors.renovation_cost}</p>}
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="rate" className="col-span-4 text-right">
                                        Rate
                                    </Label>
                                    <Input
                                        id="rate"
                                        type="number"
                                        value={data.rate}
                                        onChange={(e) => {
                                            const newRate = parseFloat(e.target.value);
                                            setData('rate', isNaN(newRate) ? 0 : newRate);
                                        }}
                                        className="col-span-4"
                                    />{' '}
                                    {errors.rate && <p className="col-span-4 text-right text-xs text-red-500">{errors.rate}</p>}
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="complete_level" className="col-span-4 text-right">
                                        Complete Level
                                    </Label>
                                    <Input
                                        id="complete_level"
                                        value={data.complete_level}
                                        onChange={(e) => setData('complete_level', e.target.value)}
                                        className="col-span-4"
                                    />
                                    {errors.complete_level && <p className="col-span-4 text-right text-xs text-red-500">{errors.complete_level}</p>}
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="complete_amount" className="col-span-4 text-right">
                                        Complete Amount
                                    </Label>
                                    <Input
                                        id="complete_amount"
                                        type="number"
                                        value={data.complete_amount}
                                        onChange={(e) => {
                                            const newValue = parseFloat(e.target.value);
                                            setData('complete_amount', isNaN(newValue) ? 0 : newValue);
                                        }}
                                        className="col-span-4"
                                    />{' '}
                                    {errors.complete_amount && <p className="col-span-4 text-right text-xs text-red-500">{errors.complete_amount}</p>}
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="value" className="col-span-4 text-right">
                                        Depreciated Value
                                    </Label>
                                    <Input
                                        id="value"
                                        type="number"
                                        value={data.value}
                                        onChange={(e) => {
                                            const newValue = parseFloat(e.target.value);
                                            setData('value', isNaN(newValue) ? 0 : newValue);
                                        }}
                                        className="col-span-4"
                                    />{' '}
                                    {errors.value && <p className="col-span-4 text-right text-xs text-red-500">{errors.value}</p>}
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="value" className="col-span-4 text-right">
                                        Value
                                    </Label>
                                    <Input
                                        id="value"
                                        type="number"
                                        value={data.value}
                                        onChange={(e) => {
                                            const newValue = parseFloat(e.target.value);
                                            setData('value', isNaN(newValue) ? 0 : newValue);
                                        }}
                                        className="col-span-4"
                                    />{' '}
                                    {errors.value && <p className="col-span-4 text-right text-xs text-red-500">{errors.value}</p>}
                                </div>
                            </div>
                        </>
                    )}

                    <DialogFooter>
                        <Button type="submit" disabled={processing}>
                            {editingValuation ? 'Save Changes' : 'Create Valuation'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
