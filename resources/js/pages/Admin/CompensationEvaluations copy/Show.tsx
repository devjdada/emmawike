import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

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

interface ShowCompensationEvaluationProps extends PageProps {
    evaluation: CompensationEvaluation;
}

export default function ShowCompensationEvaluation({ auth, evaluation }: ShowCompensationEvaluationProps) {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('print')) {
            window.print();
        }
    }, []);

    const renderSpecificDetails = () => {
        if (!evaluation.evaluatable) {
            return <p>No specific details available.</p>;
        }

        switch (evaluation.evaluation_type) {
            case 'crop':
                return (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <h3 className="font-semibold">Crop Type</h3>
                            <p>{evaluation.evaluatable.crop_type}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Area (Acres)</h3>
                            <p>{evaluation.evaluatable.area_acres}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Yield Per Acre</h3>
                            <p>{evaluation.evaluatable.yield_per_acre}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Market Price Per Unit</h3>
                            <p>{evaluation.evaluatable.market_price_per_unit}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Damage Percentage (%)</h3>
                            <p>{evaluation.evaluatable.damage_percentage}</p>
                        </div>
                    </div>
                );
            case 'machine':
                return (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <h3 className="font-semibold">Machine Type</h3>
                            <p>{evaluation.evaluatable.machine_type}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Make</h3>
                            <p>{evaluation.evaluatable.make}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Model</h3>
                            <p>{evaluation.evaluatable.model}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Year</h3>
                            <p>{evaluation.evaluatable.year}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Condition</h3>
                            <p>{evaluation.evaluatable.condition}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Depreciation Rate (%)</h3>
                            <p>{evaluation.evaluatable.depreciation_rate}</p>
                        </div>
                    </div>
                );
            case 'land':
                return (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <h3 className="font-semibold">Land Use Type</h3>
                            <p>{evaluation.evaluatable.land_use_type}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Area (Sq. Ft.)</h3>
                            <p>{evaluation.evaluatable.area_sqft}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Location Description</h3>
                            <p>{evaluation.evaluatable.location_description}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Zoning Regulations</h3>
                            <p>{evaluation.evaluatable.zoning_regulations}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Soil Quality</h3>
                            <p>{evaluation.evaluatable.soil_quality}</p>
                        </div>
                    </div>
                );
            case 'property':
                return (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <h3 className="font-semibold">Property ID</h3>
                            <p>{evaluation.evaluatable.property_id || 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Building Type</h3>
                            <p>{evaluation.evaluatable.building_type}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Number of Units</h3>
                            <p>{evaluation.evaluatable.number_of_units}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Construction Year</h3>
                            <p>{evaluation.evaluatable.construction_year}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Condition</h3>
                            <p>{evaluation.evaluatable.condition}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Renovation Cost</h3>
                            <p>{evaluation.evaluatable.renovation_cost}</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AppLayout user={auth.user}>
            <Head title={`Evaluation - ${evaluation.id}`} />

            <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
                <h1 className="mb-6 text-2xl font-semibold">Compensation Evaluation Details</h1>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold">General Information</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <h3 className="font-semibold">Evaluation Type</h3>
                                <p>{evaluation.evaluation_type}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Status</h3>
                                <p>{evaluation.status}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Total Value</h3>
                                <p>${evaluation.total_value?.toLocaleString() || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">Evaluation Specifics</h2>
                        {renderSpecificDetails()}
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">Notes</h2>
                        <div dangerouslySetInnerHTML={{ __html: evaluation.notes || '' }} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
