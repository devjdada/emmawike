<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Agency;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class AgencyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('is_admin');
        return Agency::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Gate::authorize('is_admin'); // Only admin can create agencies for now

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'logo_url' => 'nullable|url',
            'user_id' => 'required|exists:users,id', // Owner of the agency
        ]);

        $agency = Agency::create($validatedData);

        return response()->json($agency, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Agency $agency)
    {
        Gate::authorize('is_admin') || Gate::authorize('is_agency_owner', $agency);
        return $agency;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Agency $agency)
    {
        Gate::authorize('is_admin') || Gate::authorize('is_agency_owner', $agency);

        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'logo_url' => 'sometimes|nullable|url',
        ]);

        $agency->update($validatedData);

        return response()->json($agency);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Agency $agency)
    {
        Gate::authorize('is_admin') || Gate::authorize('is_agency_owner', $agency);

        $agency->delete();

        return response()->json(null, 204);
    }
}
