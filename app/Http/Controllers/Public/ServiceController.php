<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::all();
        return Inertia::render('Public/Services/Index', [
            'services' => $services,
        ]);
    }

    public function create()
    {
        return Inertia::render('Public/Services/Create');
    }

    public function edit(Service $service)
    {
        return Inertia::render('Public/Services/Edit', [
            'service' => $service,
        ]);
    }

    public function publicIndex()
    {
        $services = Service::all();
        return Inertia::render('Public/Services/Index', [
            'services' => $services,
        ]);
    }
}
