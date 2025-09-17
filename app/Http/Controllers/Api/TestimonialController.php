<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\TestimonialResource;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TestimonialResource::collection(Testimonial::all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Testimonial $testimonial)
    {
        return new TestimonialResource($testimonial);
    }
}
