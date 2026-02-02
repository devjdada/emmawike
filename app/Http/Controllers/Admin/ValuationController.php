<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Compensation;
use App\Models\Valuation; // Import the Valuation model
use Illuminate\Http\Request;
use Inertia\Inertia; // Import Inertia

class ValuationController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'compensation_id' => 'required|uuid|exists:compensations,id',
            'description' => 'nullable|string',
            'evaluation_type' => 'required|string',
            'crop_type' => 'nullable|string',
            'area_acres' => 'nullable|numeric',
            'yield_per_acre' => 'nullable|numeric',
            'market_price_per_unit' => 'nullable|numeric',
            'damage_percentage' => 'nullable|numeric',
            'machine_type' => 'nullable|string',
            'model' => 'nullable|string',
            'manufacture_year' => 'nullable|integer',
            'current_value' => 'nullable|numeric',
            'depreciation_rate' => 'nullable|numeric',
            'land_use_type' => 'nullable|string',
            'area_sqft' => 'nullable|numeric',
            'location_description' => 'nullable|string',
            'zoning_regulations' => 'nullable|string',
            'soil_quality' => 'nullable|string',
            'number_of_units' => 'nullable|integer',
            'construction_year' => 'nullable|integer',
            'condition' => 'nullable|string',
            'renovation_cost' => 'nullable|numeric',
            'rate' => 'nullable|numeric',
            'value' => 'nullable|numeric',
            'complete_level' => 'nullable|string',
            'complete_amount' => 'nullable|numeric',
        ]);

        $valuation = Valuation::create($validated);

        $amount = Valuation::where('compensation_id', $validated['compensation_id'])->sum('value');

        $compensation = Compensation::find($validated['compensation_id']);
        $compensation->total_value = $amount;
        $compensation->save();

        return redirect()->route('admin.compensations.show', $validated['compensation_id'])->with('success', 'Valuation created successfully.');
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Valuation $valuation)
    {
        $validated = $request->validate([
            'compensation_id' => 'required|uuid|exists:compensations,id',
            'description' => 'nullable|string',
            'evaluation_type' => 'required|string',
            'crop_type' => 'nullable|string',
            'area_acres' => 'nullable|numeric',
            'yield_per_acre' => 'nullable|numeric',
            'market_price_per_unit' => 'nullable|numeric',
            'damage_percentage' => 'nullable|numeric',
            'machine_type' => 'nullable|string',
            'model' => 'nullable|string',
            'manufacture_year' => 'nullable|integer',
            'current_value' => 'nullable|numeric',
            'depreciation_rate' => 'nullable|numeric',
            'land_use_type' => 'nullable|string',
            'area_sqft' => 'nullable|numeric',
            'location_description' => 'nullable|string',
            'zoning_regulations' => 'nullable|string',
            'soil_quality' => 'nullable|string',
            'number_of_units' => 'nullable|integer',
            'construction_year' => 'nullable|integer',
            'condition' => 'nullable|string',
            'renovation_cost' => 'nullable|numeric',
            'rate' => 'nullable|numeric',
            'value' => 'nullable|numeric',
            'complete_level' => 'nullable|string',
            'complete_amount' => 'nullable|numeric',
        ]);

        $valuation->update($validated);

        $amount = Valuation::where('compensation_id', $validated['compensation_id'])->sum('value');

        $compensation = Compensation::find($validated['compensation_id']);
        $compensation->total_value = $amount;
        $compensation->save();

        return redirect()->route('admin.compensations.show', $valuation->compensation_id)->with('success', 'Valuation updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Compensation $compensation, Valuation $valuation)
    {
        // Ensure the valuation belongs to the compensation (optional, but good practice)
        if ($valuation->compensation_id !== $compensation->id) {
            abort(404); // Or handle error appropriately
        }

        $valuation->delete();

        return redirect()->route('admin.compensations.show', $compensation->id)->with('success', 'Valuation deleted successfully.');
    }
}
