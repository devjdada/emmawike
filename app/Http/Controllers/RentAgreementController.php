<?php

namespace App\Http\Controllers;

use App\Models\RentAgreement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RentAgreementController extends Controller
{
    public function index()
    {
        $rentAgreements = RentAgreement::all();
        return Inertia::render('RentAgreements/Index', [
            'rentAgreements' => $rentAgreements,
        ]);
    }

    public function create()
    {
        return Inertia::render('RentAgreements/Create');
    }

    public function edit(RentAgreement $rentAgreement)
    {
        return Inertia::render('RentAgreements/Edit', [
            'rentAgreement' => $rentAgreement,
        ]);
    }
}
