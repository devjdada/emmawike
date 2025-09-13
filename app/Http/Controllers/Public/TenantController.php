<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;

use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TenantController extends Controller
{
    public function index()
    {
        $tenants = Tenant::all();
        return Inertia::render('Public/Tenants/Index', [
            'tenants' => $tenants,
        ]);
    }

    public function create()
    {
        return Inertia::render('Public/Tenants/Create');
    }

    public function edit(Tenant $tenant)
    {
        return Inertia::render('Public/Tenants/Edit', [
            'tenant' => $tenant,
        ]);
    }
}
