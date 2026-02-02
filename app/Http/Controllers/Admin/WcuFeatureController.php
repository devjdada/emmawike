<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WcuFeature;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WcuFeatureController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/WcuFeatures/Index', [
            'features' => WcuFeature::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'required|string|in:Shield,Clock,Star,Handshake,Eye,Users',
        ]);

        WcuFeature::create($request->all());

        return redirect()->route('admin.wcu-features.index')->with('success', 'Feature created successfully.');
    }

    public function update(Request $request, WcuFeature $wcuFeature)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'required|string|in:Shield,Clock,Star,Handshake,Eye,Users',
        ]);

        $wcuFeature->update($request->all());

        return redirect()->route('admin.wcu-features.index')->with('success', 'Feature updated successfully.');
    }

    public function destroy(WcuFeature $wcuFeature)
    {
        $wcuFeature->delete();

        return redirect()->route('admin.wcu-features.index')->with('success', 'Feature deleted successfully.');
    }
}