<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('is_admin');
        return Service::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Gate::authorize('is_admin');

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
        ]);

        $service = Service::create($validatedData);

        return response()->json($service, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        Gate::authorize('is_admin');
        return $service;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        Gate::authorize('is_admin');

        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric',
        ]);

        $service->update($validatedData);

        return response()->json($service);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        Gate::authorize('is_admin');

        $service->delete();

        return response()->json(null, 204);
    }
}
