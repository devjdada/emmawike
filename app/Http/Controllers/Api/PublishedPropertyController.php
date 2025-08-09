<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;

class PublishedPropertyController extends Controller
{
    /**
     * Display a listing of the published properties.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $properties = Property::where('status', 'published')
                                ->with('media')
                                ->get();

        return response()->json($properties);
    }
}