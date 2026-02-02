<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TenantController extends Controller
{
    public function index()
    {
        $tenants = Tenant::with(['user', 'property'])->get();
        $users = User::all();
        $properties = Property::all();

        return Inertia::render('Admin/Tenants/Index', [
            'tenants' => $tenants,
            'users' => $users,
            'properties' => $properties,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Tenants/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'property_id' => 'required|exists:properties,id',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        Tenant::create($validated);

        return redirect()->route('admin.tenants.index')->with('success', 'Tenant created successfully.');
    }


    public function edit(Tenant $tenant)
    {
        return Inertia::render('Admin/Tenants/Edit', [
            'tenant' => $tenant,
        ]);
    }
}
