<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class AgentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Gate::allows('is_admin')) {
            return User::where('role', 'agent')->orWhere('role', 'agency_owner')->get();
        } elseif (Gate::allows('is_agency_owner')) {
            return User::where('agency_id', auth()->user()->agency_id)->get();
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (!Gate::allows('is_admin') && !Gate::allows('is_agency_owner')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:agent,agency_owner',
            'agency_id' => 'nullable|exists:agencies,id',
        ]);

        if (Gate::allows('is_agency_owner') && $validatedData['agency_id'] !== auth()->user()->agency_id) {
            return response()->json(['message' => 'Unauthorized: You can only create agents for your own agency.'], 403);
        }

        $user = User::create($validatedData);

        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $agent)
    {
        if (Gate::allows('is_admin')) {
            return $agent;
        } elseif (Gate::allows('is_agency_owner') && $agent->agency_id === auth()->user()->agency_id) {
            return $agent;
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $agent)
    {
        if (!Gate::allows('is_admin') && !(Gate::allows('is_agency_owner') && $agent->agency_id === auth()->user()->agency_id)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $agent->id,
            'password' => 'sometimes|required|string|min:8',
            'role' => 'sometimes|required|in:agent,agency_owner',
            'agency_id' => 'sometimes|nullable|exists:agencies,id',
        ]);

        if (isset($validatedData['agency_id']) && Gate::allows('is_agency_owner') && $validatedData['agency_id'] !== auth()->user()->agency_id) {
            return response()->json(['message' => 'Unauthorized: You can only update agents for your own agency.'], 403);
        }

        $agent->update($validatedData);

        return response()->json($agent);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $agent)
    {
        if (!Gate::allows('is_admin') && !(Gate::allows('is_agency_owner') && $agent->agency_id === auth()->user()->agency_id)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $agent->delete();

        return response()->json(null, 204);
    }
}
