<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WcuFeature;
use Illuminate\Http\Request;

class WcuFeatureController extends Controller
{
    public function index()
    {
        return response()->json(WcuFeature::all());
    }
}