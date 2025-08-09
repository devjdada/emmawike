<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Gate::allows('is_admin')) {
            return Property::all();
        } elseif (Gate::allows('is_agency_owner')) {
            return Property::whereHas('user', function ($query) {
                $query->where('agency_id', auth()->user()->agency_id);
            })->get();
        } elseif (auth()->user()->isAgent()) {
            return Property::where('user_id', auth()->user()->id)->get();
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'owner_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string|max:100',
            'price' => 'required|numeric',
            'currency' => 'required|string|max:10',
            'address_line1' => 'required|string|max:255',
            'address_line2' => 'nullable|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'country' => 'required|string|max:100',
            'zip_code' => 'nullable|string|max:20',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'bedrooms' => 'nullable|integer',
            'bathrooms' => 'nullable|integer',
            'area_sq_ft' => 'nullable|integer',
            'status' => 'required|string|max:50',
            'is_featured' => 'required|boolean',
            'image_url' => 'required|url',
        ]);

        if (Gate::allows('is_admin')) {
            // Admin can create for any user
        } elseif (Gate::allows('is_agency_owner')) {
            // Agency owner can create for agents within their agency
            if (auth()->user()->agency_id !== \App\Models\User::find($validatedData['owner_id'])->agency_id) {
                return response()->json(['message' => 'Unauthorized: Cannot create property for user outside your agency.'], 403);
            }
        } elseif (auth()->user()->isAgent()) {
            // Agent can only create for themselves
            if ($validatedData['owner_id'] !== auth()->user()->id) {
                return response()->json(['message' => 'Unauthorized: Cannot create property for another user.'], 403);
            }
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $property = Property::create($validatedData);

        return response()->json($property, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Property $property)
    {
        if (Gate::allows('is_admin')) {
            return $property;
        } elseif (Gate::allows('is_agency_owner')) {
            if ($property->user->agency_id === auth()->user()->agency_id) {
                return $property;
            }
        } elseif (auth()->user()->isAgent()) {
            if ($property->owner_id === auth()->user()->id) {
                return $property;
            }
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Property $property)
    {
        if (Gate::allows('is_admin')) {
            // Admin can update any property
        } elseif (Gate::allows('is_agency_owner')) {
            if ($property->user->agency_id !== auth()->user()->agency_id) {
                return response()->json(['message' => 'Unauthorized: Cannot update property outside your agency.'], 403);
            }
        } elseif (auth()->user()->isAgent()) {
            if ($property->owner_id !== auth()->user()->id) {
                return response()->json(['message' => 'Unauthorized: Cannot update another user\'s property.'], 403);
            }
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validatedData = $request->validate([
            'owner_id' => 'sometimes|required|exists:users,id',
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'type' => 'sometimes|required|string|max:100',
            'price' => 'sometimes|required|numeric',
            'currency' => 'sometimes|required|string|max:10',
            'address_line1' => 'sometimes|required|string|max:255',
            'address_line2' => 'nullable|string|max:255',
            'city' => 'sometimes|required|string|max:100',
            'state' => 'sometimes|required|string|max:100',
            'country' => 'sometimes|required|string|max:100',
            'zip_code' => 'nullable|string|max:20',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'bedrooms' => 'nullable|integer',
            'bathrooms' => 'nullable|integer',
            'area_sq_ft' => 'nullable|integer',
            'status' => 'sometimes|required|string|max:50',
            'is_featured' => 'sometimes|required|boolean',
            'image_url' => 'sometimes|required|url',
        ]);

        $property->update($validatedData);

        return response()->json($property);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property)
    {
        if (Gate::allows('is_admin')) {
            // Admin can delete any property
        } elseif (Gate::allows('is_agency_owner')) {
            if ($property->user->agency_id !== auth()->user()->agency_id) {
                return response()->json(['message' => 'Unauthorized: Cannot delete property outside your agency.'], 403);
            }
        } elseif (auth()->user()->isAgent()) {
            if ($property->owner_id !== auth()->user()->id) {
                return response()->json(['message' => 'Unauthorized: Cannot delete another user\'s property.'], 403);
            }
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $property->delete();

        return response()->json(null, 204);
    }
}
