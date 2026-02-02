<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\RentAgreement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RentAgreementController extends Controller
{
    public function index()
    {
        $rentAgreements = RentAgreement::all();
        return Inertia::render('Admin/RentAgreements/Index', [
            'rentAgreements' => $rentAgreements,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/RentAgreements/Create');
    }

    public function edit(RentAgreement $rentAgreement)
    {
        return Inertia::render('Admin/RentAgreements/Edit', [
            'rentAgreement' => $rentAgreement,
        ]);
    }
}
