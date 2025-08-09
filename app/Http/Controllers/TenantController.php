<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TenantController extends Controller
{
    public function index()
    {
        $tenants = Tenant::all();
        return Inertia::render('Tenants/Index', [
            'tenants' => $tenants,
        ]);
    }

    public function create()
    {
        return Inertia::render('Tenants/Create');
    }

    public function edit(Tenant $tenant)
    {
        return Inertia::render('Tenants/Edit', [
            'tenant' => $tenant,
        ]);
    }
}
