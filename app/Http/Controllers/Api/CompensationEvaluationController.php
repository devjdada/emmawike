<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CompensationEvaluation;
use App\Models\CropEvaluation;
use App\Models\LandEvaluation;
use App\Models\MachineEvaluation;
use App\Models\PropertyEvaluation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CompensationEvaluationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Gate::allows('is_admin')) {
            return CompensationEvaluation::with('evaluatable')->get();
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Gate::authorize('is_admin'); // Only admin can create evaluations for now

        $validatedData = $request->validate([
            'evaluation_type' => 'required|in:crop,machine,land,property',
            'user_id' => 'required|exists:users,id',
            'status' => 'sometimes|in:draft,pending,approved,rejected',
            'notes' => 'nullable|string',
            'total_value' => 'nullable|numeric',
            // Specific evaluation fields will be validated dynamically
        ]);

        $evaluatable = null;
        switch ($validatedData['evaluation_type']) {
            case 'crop':
                $cropValidated = $request->validate([
                    'crop_type' => 'required|string',
                    'area_acres' => 'required|numeric',
                    'yield_per_acre' => 'required|numeric',
                    'market_price_per_unit' => 'required|numeric',
                    'damage_percentage' => 'nullable|numeric|min:0|max:100',
                    'notes' => 'nullable|string',
                ]);
                $evaluatable = CropEvaluation::create($cropValidated);
                break;
            case 'machine':
                $machineValidated = $request->validate([
                    'machine_type' => 'required|string',
                    'make' => 'required|string',
                    'model' => 'required|string',
                    'year' => 'required|integer',
                    'condition' => 'required|in:new,excellent,good,fair,poor',
                    'depreciation_rate' => 'required|numeric',
                    'notes' => 'nullable|string',
                ]);
                $evaluatable = MachineEvaluation::create($machineValidated);
                break;
            case 'land':
                $landValidated = $request->validate([
                    'land_use_type' => 'required|in:agricultural,residential,commercial,industrial',
                    'area_sqft' => 'required|numeric',
                    'location_description' => 'required|string',
                    'zoning_regulations' => 'nullable|string',
                    'soil_quality' => 'nullable|string',
                    'notes' => 'nullable|string',
                ]);
                $evaluatable = LandEvaluation::create($landValidated);
                break;
            case 'property':
                $propertyValidated = $request->validate([
                    'property_id' => 'nullable|exists:properties,id',
                    'building_type' => 'required|in:house,apartment,commercial',
                    'number_of_units' => 'nullable|integer',
                    'construction_year' => 'required|integer',
                    'condition' => 'required|in:new,excellent,good,fair,poor',
                    'renovation_cost' => 'nullable|numeric',
                    'notes' => 'nullable|string',
                ]);
                $evaluatable = PropertyEvaluation::create($propertyValidated);
                break;
        }

        $compensationEvaluation = new CompensationEvaluation($validatedData);
        $compensationEvaluation->evaluatable()->associate($evaluatable);
        $compensationEvaluation->save();

        return response()->json($compensationEvaluation->load('evaluatable'), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(CompensationEvaluation $compensationEvaluation)
    {
        Gate::authorize('is_admin'); // Only admin can view evaluations for now
        return $compensationEvaluation->load('evaluatable');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CompensationEvaluation $compensationEvaluation)
    {
        Gate::authorize('is_admin'); // Only admin can update evaluations for now

        $validatedData = $request->validate([
            'evaluation_type' => 'sometimes|required|in:crop,machine,land,property',
            'user_id' => 'sometimes|required|exists:users,id',
            'status' => 'sometimes|in:draft,pending,approved,rejected',
            'notes' => 'nullable|string',
            'total_value' => 'nullable|numeric',
        ]);

        $evaluatable = $compensationEvaluation->evaluatable;

        switch ($validatedData['evaluation_type'] ?? $evaluatable->getMorphClass()) {
            case 'crop':
                $cropValidated = $request->validate([
                    'crop_type' => 'sometimes|required|string',
                    'area_acres' => 'sometimes|required|numeric',
                    'yield_per_acre' => 'sometimes|required|numeric',
                    'market_price_per_unit' => 'sometimes|required|numeric',
                    'damage_percentage' => 'nullable|numeric|min:0|max:100',
                    'notes' => 'nullable|string',
                ]);
                $evaluatable->update($cropValidated);
                break;
            case 'machine':
                $machineValidated = $request->validate([
                    'machine_type' => 'sometimes|required|string',
                    'make' => 'sometimes|required|string',
                    'model' => 'sometimes|required|string',
                    'year' => 'sometimes|required|integer',
                    'condition' => 'sometimes|required|in:new,excellent,good,fair,poor',
                    'depreciation_rate' => 'sometimes|required|numeric',
                    'notes' => 'nullable|string',
                ]);
                $evaluatable->update($machineValidated);
                break;
            case 'land':
                $landValidated = $request->validate([
                    'land_use_type' => 'sometimes|required|in:agricultural,residential,commercial,industrial',
                    'area_sqft' => 'sometimes|required|numeric',
                    'location_description' => 'sometimes|required|string',
                    'zoning_regulations' => 'nullable|string',
                    'soil_quality' => 'nullable|string',
                    'notes' => 'nullable|string',
                ]);
                $evaluatable->update($landValidated);
                break;
            case 'property':
                $propertyValidated = $request->validate([
                    'property_id' => 'nullable|exists:properties,id',
                    'building_type' => 'sometimes|required|in:house,apartment,commercial',
                    'number_of_units' => 'nullable|integer',
                    'construction_year' => 'sometimes|required|integer',
                    'condition' => 'sometimes|required|in:new,excellent,good,fair,poor',
                    'renovation_cost' => 'nullable|numeric',
                    'notes' => 'nullable|string',
                ]);
                $evaluatable->update($propertyValidated);
                break;
        }

        $compensationEvaluation->update($validatedData);

        return response()->json($compensationEvaluation->load('evaluatable'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CompensationEvaluation $compensationEvaluation)
    {
        Gate::authorize('is_admin'); // Only admin can delete evaluations for now

        $compensationEvaluation->evaluatable->delete();
        $compensationEvaluation->delete();

        return response()->json(null, 204);
    }
}
