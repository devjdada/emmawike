<?php

namespace App\Http\Controllers;

use App\Models\ManagedProperty;
use App\Models\Owner;
use App\Models\Property;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManagedPropertyController extends Controller
{
    public function index()
    {
        $managedProperties = ManagedProperty::with(['property', 'owner', 'tenant', 'rentAgreement'])->latest()->paginate(10);

        return Inertia::render('Admin/ManagedProperties/Index', [
            'managedProperties' => $managedProperties,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/ManagedProperties/Create', [
            'properties' => Property::all(['id', 'title']),
            'owners' => Owner::with('user')->get()->map(fn ($owner) => ['id' => $owner->id, 'name' => $owner->user->name]),
            'tenants' => Tenant::with('user')->get()->map(fn ($tenant) => ['id' => $tenant->id, 'name' => $tenant->user->name]),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'property_id' => 'required|exists:properties,id',
            'owner_id' => 'required|exists:owners,id',
            'tenant_id' => 'required|exists:tenants,id',
            'rent_agreement_id' => 'nullable|exists:rent_agreements,id',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'rent_due_date' => 'required|date',
        ]);

        ManagedProperty::create($request->all());

        return redirect()->route('admin.managed-properties.index')->with('success', 'Record created successfully.');
    }

    public function edit(ManagedProperty $managedProperty)
    {
        return Inertia::render('Admin/ManagedProperties/Edit', [
            'managedProperty' => $managedProperty,
            'properties' => Property::all(['id', 'title']),
            'owners' => Owner::with('user')->get()->map(fn ($owner) => ['id' => $owner->id, 'name' => $owner->user->name]),
            'tenants' => Tenant::with('user')->get()->map(fn ($tenant) => ['id' => $tenant->id, 'name' => $tenant->user->name]),
        ]);
    }

    public function update(Request $request, ManagedProperty $managedProperty)
    {
        $request->validate([
            'property_id' => 'required|exists:properties,id',
            'owner_id' => 'required|exists:owners,id',
            'tenant_id' => 'required|exists:tenants,id',
            'rent_agreement_id' => 'nullable|exists:rent_agreements,id',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'rent_due_date' => 'required|date',
        ]);

        $managedProperty->update($request->all());

        return redirect()->route('admin.managed-properties.index')->with('success', 'Record updated successfully.');
    }

    public function destroy(ManagedProperty $managedProperty)
    {
        $managedProperty->delete();

        return redirect()->route('admin.managed-properties.index')->with('success', 'Record deleted successfully.');
    }
}
