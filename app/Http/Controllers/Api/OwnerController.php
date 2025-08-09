<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Owner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class OwnerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Gate::allows('is_admin')) {
            return Owner::all();
        } elseif (Gate::allows('is_agency_owner')) {
            return Owner::whereHas('properties.user', function ($query) {
                $query->where('agency_id', auth()->user()->agency_id);
            })->get();
        } elseif (Gate::allows('is_agent')) {
            return Owner::whereHas('properties', function ($query) {
                $query->where('user_id', auth()->user()->id);
            })->get();
        } elseif (auth()->user()->isOwner()) {
            return Owner::where('user_id', auth()->user()->id)->get();
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
        ]);

        if (Gate::allows('is_admin')) {
            // Admin can create for any user
        } elseif (Gate::allows('is_agency_owner')) {
            // Agency owner can create for users within their agency
            if (auth()->user()->agency_id !== \App\Models\User::find($validatedData['user_id'])->agency_id) {
                return response()->json(['message' => 'Unauthorized: Cannot create owner for user outside your agency.'], 403);
            }
        } elseif (Gate::allows('is_agent')) {
            // Agent can only create for themselves
            if ($validatedData['user_id'] !== auth()->user()->id) {
                return response()->json(["message" => "Unauthorized: Cannot create owner for another user."], 403);
            }
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $owner = Owner::create($validatedData);

        return response()->json($owner, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Owner $owner)
    {
        if (Gate::allows('is_admin')) {
            return $owner;
        } elseif (Gate::allows('is_agency_owner')) {
            if ($owner->user->agency_id === auth()->user()->agency_id) {
                return $owner;
            }
        } elseif (Gate::allows('is_agent')) {
            if ($owner->user_id === auth()->user()->id) {
                return $owner;
            }
        } elseif (auth()->user()->isOwner() && $owner->user_id === auth()->user()->id) {
            return $owner;
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Owner $owner)
    {
        if (Gate::allows('is_admin')) {
            // Admin can update any owner
        } elseif (Gate::allows('is_agency_owner')) {
            if ($owner->user->agency_id !== auth()->user()->agency_id) {
                return response()->json(['message' => 'Unauthorized: Cannot update owner for user outside your agency.'], 403);
            }
        } elseif (Gate::allows('is_agent')) {
            if ($owner->user_id !== auth()->user()->id) {
                return response()->json(["message" => "Unauthorized: Cannot update owner for another user."], 403);
            }
        } elseif (auth()->user()->isOwner() && $owner->user_id === auth()->user()->id) {
            // Tenant can delete their own complaint
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validatedData = $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
        ]);

        $owner->update($validatedData);

        return response()->json($owner);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Owner $owner)
    {
        if (Gate::allows('is_admin')) {
            // Admin can delete any owner
        } elseif (Gate::allows('is_agency_owner')) {
            if ($owner->user->agency_id !== auth()->user()->agency_id) {
                return response()->json(['message' => 'Unauthorized: Cannot delete owner for user outside your agency.'], 403);
            }
        } elseif (Gate::allows('is_agent')) {
            if ($owner->user_id !== auth()->user()->id) {
                return response()->json(["message" => "Unauthorized: Cannot delete owner for another user."], 403);
            }
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $owner->delete();

        return response()->json(null, 204);
    }
}
