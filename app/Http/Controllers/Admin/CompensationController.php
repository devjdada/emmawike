<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Compensation; // Import the Compensation model
use Illuminate\Http\Request;
use Inertia\Inertia; // Import Inertia

class CompensationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $compensations = Compensation::all();
        return Inertia::render('Admin/Compensation/Index', [
            'compensations' => $compensations,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'notes' => 'nullable|string',
            'total_value' => 'nullable|numeric',
            'status' => 'required|string|in:pending,approved,rejected,completed', // Assuming these statuses
            'name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'code' => 'nullable|string|unique:compensations,code|max:255',
        ]);

        Compensation::create($validated);

        return redirect()->route('admin.compensations.index')->with('success', 'Compensation created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Compensation $compensation) // Use route model binding
    {
        $compensation->load('valuations'); // Eager load valuations
        return Inertia::render('Admin/Compensation/Show', [
            'compensation' => $compensation,
        ]);
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
    public function update(Request $request, Compensation $compensation)
    {
        $validated = $request->validate([
            'notes' => 'nullable|string',
            'total_value' => 'nullable|numeric',
            'status' => 'required|string|in:pending,approved,rejected,completed',
            'name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'code' => 'nullable|string|unique:compensations,code,' . $compensation->id . '|max:255', // Exclude current ID for unique rule
        ]);

        $compensation->update($validated);

        return redirect()->route('admin.compensations.index')->with('success', 'Compensation updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Compensation $compensation)
    {
        $compensation->delete();

        return redirect()->route('admin.compensations.index')->with('success', 'Compensation deleted successfully.');
    }
}
