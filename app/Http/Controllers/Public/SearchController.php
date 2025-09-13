<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $properties = Property::query()
            ->when($request->input('location'), function ($query, $location) {
                $query->where('city', 'like', "%{$location}%")
                    ->orWhere('address_line1', 'like', "%{$location}%");
            })
            ->when($request->input('type'), function ($query, $type) {
                $query->where('type', $type);
            })
            ->when($request->input('price_range'), function ($query, $priceRange) {
                $range = explode('-', $priceRange);
                $query->whereBetween('price', [$range[0], $range[1]]);
            })
            ->when($request->input('bedrooms'), function ($query, $bedrooms) {
                $query->where('bedrooms', '>=', $bedrooms);
            })
            ->when($request->input('bathrooms'), function ($query, $bathrooms) {
                $query->where('bathrooms', '>=', $bathrooms);
            })
            ->when($request->input('sqft'), function ($query, $sqft) {
                $query->where('area_sq_ft', '>=', $sqft);
            })
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Search/Index', [
            'properties' => $properties,
            'filters' => $request->all(),
        ]);
    }
}
