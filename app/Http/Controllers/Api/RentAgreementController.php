<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RentAgreement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class RentAgreementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Gate::allows('is_admin')) {
            return RentAgreement::all();
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Gate::authorize('is_admin'); // Only admin can create rent agreements for now

        $validatedData = $request->validate([
            'tenant_id' => 'required|exists:users,id',
            'property_id' => 'required|exists:properties,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'monthly_rent' => 'required|numeric',
            'deposit' => 'required|numeric',
            'agreement_pdf_url' => 'nullable|url',
            'status' => 'sometimes|in:active,inactive,expired',
            'is_renewed' => 'sometimes|boolean',
        ]);

        $rentAgreement = RentAgreement::create($validatedData);

        return response()->json($rentAgreement, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(RentAgreement $rentAgreement)
    {
        Gate::authorize('is_admin'); // Only admin can view rent agreements for now
        return $rentAgreement;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RentAgreement $rentAgreement)
    {
        Gate::authorize('is_admin'); // Only admin can update rent agreements for now

        $validatedData = $request->validate([
            'tenant_id' => 'sometimes|required|exists:users,id',
            'property_id' => 'sometimes|required|exists:properties,id',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'sometimes|required|date|after_or_equal:start_date',
            'monthly_rent' => 'sometimes|required|numeric',
            'deposit' => 'sometimes|required|numeric',
            'agreement_pdf_url' => 'nullable|url',
            'status' => 'sometimes|in:active,inactive,expired',
            'is_renewed' => 'sometimes|boolean',
        ]);

        $rentAgreement->update($validatedData);

        return response()->json($rentAgreement);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RentAgreement $rentAgreement)
    {
        Gate::authorize('is_admin'); // Only admin can delete rent agreements for now

        $rentAgreement->delete();

        return response()->json(null, 204);
    }
}
