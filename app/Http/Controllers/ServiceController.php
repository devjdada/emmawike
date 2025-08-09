<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::all();
        return Inertia::render('Services/Index', [
            'services' => $services,
        ]);
    }

    public function create()
    {
        return Inertia::render('Services/Create');
    }

    public function edit(Service $service)
    {
        return Inertia::render('Services/Edit', [
            'service' => $service,
        ]);
    }
}
