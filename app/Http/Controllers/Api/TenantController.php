<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TenantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Gate::allows('is_admin')) {
            return Tenant::all();
        } elseif (Gate::allows('is_agency_owner')) {
            return Tenant::whereHas('property.user', function ($query) {
                $query->where('agency_id', auth()->user()->agency_id);
            })->get();
        } elseif (Gate::allows('is_agent')) {
            return Tenant::whereHas('property', function ($query) {
                $query->where('user_id', auth()->user()->id);
            })->get();
        } elseif (auth()->user()->isTenant()) {
            return Tenant::where('user_id', auth()->user()->id)->get();
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'property_id' => 'required|exists:properties,id',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $property = \App\Models\Property::find($validatedData['property_id']);

        if (Gate::allows('is_admin')) {
            // Admin can create for any user/property
        } elseif (Gate::allows('is_agency_owner')) {
            if ($property->user->agency_id !== auth()->user()->agency_id) {
                return response()->json(['message' => 'Unauthorized: Cannot create tenant for property outside your agency.'], 403);
            }
        } elseif (Gate::allows('is_agent')) {
            if ($property->user_id !== auth()->user()->id) {
                return response()->json(["message" => "Unauthorized: Cannot create tenant for another user's property."], 403);
            }
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $tenant = Tenant::create($validatedData);

        return response()->json($tenant, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tenant $tenant)
    {
        if (Gate::allows('is_admin')) {
            return $tenant;
        } elseif (Gate::allows('is_agency_owner')) {
            if ($tenant->property->user->agency_id === auth()->user()->agency_id) {
                return $tenant;
            }
        } elseif (Gate::allows('is_agent')) {
            if ($tenant->property->user_id === auth()->user()->id) {
                return $tenant;
            }
        } elseif (auth()->user()->isTenant() && $tenant->user_id === auth()->user()->id) {
            // Tenant can delete their own complaint
            return $tenant;
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tenant $tenant)
    {
        $property = $tenant->property;

        if (Gate::allows('is_admin')) {
            // Admin can update any tenant
        } elseif (Gate::allows('is_agency_owner')) {
            if ($property->user->agency_id !== auth()->user()->agency_id) {
                return response()->json(['message' => 'Unauthorized: Cannot update tenant for property outside your agency.'], 403);
            }
        } elseif (Gate::allows('is_agent')) {
            if ($property->user_id !== auth()->user()->id) {
                return response()->json(["message" => "Unauthorized: Cannot update tenant for another user's property."], 403);
            }
        } elseif (auth()->user()->isTenant() && $tenant->user_id === auth()->user()->id) {
            // Tenant can update their own record (e.g., end_date if moving out)
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validatedData = $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'property_id' => 'sometimes|required|exists:properties,id',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'sometimes|nullable|date|after_or_equal:start_date',
        ]);

        $tenant->update($validatedData);

        return response()->json($tenant);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tenant $tenant)
    {
        $property = $tenant->property;

        if (Gate::allows('is_admin')) {
            // Admin can delete any tenant
        } elseif (Gate::allows('is_agency_owner')) {
            if ($property->user->agency_id !== auth()->user()->agency_id) {
                return response()->json(['message' => 'Unauthorized: Cannot delete tenant for property outside your agency.'], 403);
            }
        } elseif (Gate::allows('is_agent')) {
            if ($property->user_id !== auth()->user()->id) {
                return response()->json(['message' => "Unauthorized: Cannot delete tenant for another user's property."], 403);
            }
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $tenant->delete();

        return response()->json(null, 204);
    }
}
