<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Complaint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ComplaintController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Gate::allows('is_admin')) {
            return Complaint::all();
        } elseif (Gate::allows('is_agency_owner')) {
            return Complaint::whereHas('property.user', function ($query) {
                $query->where('agency_id', auth()->user()->agency_id);
            })->get();
        } elseif (Gate::allows('is_agent')) {
            return Complaint::whereHas('property', function ($query) {
                $query->where('user_id', auth()->user()->id);
            })->get();
        } elseif (auth()->user()->isTenant()) {
            return Complaint::where('tenant_id', auth()->user()->tenants->first()->id)->get();
        } elseif (auth()->user()->isOwner()) {
            return Complaint::whereHas('property.user', function ($query) {
                $query->where('id', auth()->user()->id);
            })->get();
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'tenant_id' => 'required|exists:users,id',
            'property_id' => 'required|exists:properties,id',
            'subject' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'sometimes|in:pending,in_progress,resolved,closed',
            'priority' => 'sometimes|in:low,medium,high',
            'resolved_at' => 'nullable|date',
            'staff_notes' => 'nullable|string',
        ]);

        $tenant = \App\Models\User::find($validatedData['tenant_id']);
        $property = \App\Models\Property::find($validatedData['property_id']);

        if (Gate::allows('is_admin')) {
            // Admin can create for any tenant/property
        } elseif (Gate::allows('is_agency_owner')) {
            if ($property->owner->agency_id !== auth()->user()->agency_id) {
                return response()->json(['message' => 'Unauthorized: Cannot create complaint for property outside your agency.'], 403);
            }
        } elseif (Gate::allows('is_agent')) {
            if ($property->owner_id !== auth()->user()->id) {
                return response()->json(["message" => "Unauthorized: Cannot create complaint for another user's property."], 403);
            }
        } elseif (auth()->user()->isTenant()) {
            if ($tenant->id !== auth()->user()->id || $property->id !== $tenant->tenants->first()->property_id) {
                return response()->json(['message' => 'Unauthorized: Cannot create complaint for another tenant or property.'], 403);
            }
            // The submitted_at will be automatically set by the database
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $complaint = Complaint::create($validatedData);

        return response()->json($complaint, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Complaint $complaint)
    {
        if (Gate::allows('is_admin')) {
            return $complaint;
        } elseif (Gate::allows('is_agency_owner')) {
            if ($complaint->property->owner->agency_id === auth()->user()->agency_id) {
                return $complaint;
            }
        } elseif (Gate::allows('is_agent')) {
            if ($complaint->property->owner_id === auth()->user()->id) {
                return $complaint;
            }
        } elseif (auth()->user()->isTenant() && $complaint->tenant->id === auth()->user()->id) {
            return $complaint;
        } elseif (auth()->user()->isOwner() && $complaint->property->owner_id === auth()->user()->id) {
            return $complaint;
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Complaint $complaint)
    {
        $property = $complaint->property;

        if (Gate::allows('is_admin')) {
            // Admin can update any complaint
        } elseif (Gate::allows('is_agency_owner')) {
            if ($property->owner->agency_id !== auth()->user()->agency_id) {
                return response()->json(['message' => 'Unauthorized: Cannot update complaint for property outside your agency.'], 403);
            }
        } elseif (Gate::allows('is_agent')) {
            if ($property->owner_id !== auth()->user()->id) {
                return response()->json(['message' => 'Unauthorized: Cannot update complaint for another user\'s property.'], 403);
            }
        } elseif (auth()->user()->isTenant() && $complaint->tenant->id === auth()->user()->id) {
            // Tenant can update their own complaint (e.g., description, but not status)
            $validatedData = $request->validate([
                'subject' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|required|string',
            ]);
            $complaint->update($validatedData);
            return response()->json($complaint);
        } elseif (auth()->user()->isOwner() && $property->owner_id === auth()->user()->id) {
            // Owner can update status and assigned_to
            $validatedData = $request->validate([
                'status' => 'sometimes|in:pending,in_progress,resolved,closed',
                'priority' => 'sometimes|in:low,medium,high',
                'resolved_at' => 'nullable|date',
                'staff_notes' => 'nullable|string',
            ]);
            $complaint->update($validatedData);
            return response()->json($complaint);
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validatedData = $request->validate([
            'tenant_id' => 'sometimes|required|exists:users,id',
            'property_id' => 'sometimes|required|exists:properties,id',
            'subject' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'status' => 'sometimes|in:pending,in_progress,resolved,closed',
            'priority' => 'sometimes|in:low,medium,high',
            'resolved_at' => 'nullable|date',
            'staff_notes' => 'nullable|string',
        ]);

        $complaint->update($validatedData);

        return response()->json($complaint);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Complaint $complaint)
    {
        $property = $complaint->property;

        if (Gate::allows('is_admin')) {
            // Admin can delete any complaint
        } elseif (Gate::allows('is_agency_owner')) {
            if ($property->user->agency_id !== auth()->user()->agency_id) {
                return response()->json(['message' => 'Unauthorized: Cannot delete complaint for property outside your agency.'], 403);
            }
        } elseif (Gate::allows('is_agent')) {
            if ($property->owner_id !== auth()->user()->id) {
                return response()->json(['message' => 'Unauthorized: Cannot delete complaint for another user property.'], 403);
            }
        } elseif (auth()->user()->isTenant() && $complaint->tenant->user_id === auth()->user()->id) {
            // Tenant can delete their own complaint
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $complaint->delete();

        return response()->json(null, 204);
    }
}
