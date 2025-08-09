<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('is_admin');
        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Gate::authorize('is_admin');

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,agency_owner,agent,tenant,owner',
            'agency_id' => 'nullable|exists:agencies,id',
        ]);

        $validatedData['password'] = Hash::make($validatedData['password']);

        $user = User::create($validatedData);

        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        Gate::authorize('is_admin');
        return $user;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        Gate::authorize('is_admin');

        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8',
            'role' => 'sometimes|required|in:admin,agency_owner,agent,tenant,owner',
            'agency_id' => 'nullable|exists:agencies,id',
        ]);

        if (isset($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }

        $user->update($validatedData);

        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        Gate::authorize('is_admin');

        $user->delete();

        return response()->json(null, 204);
    }
}
