<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LandEvaluation extends Model
{
    use SoftDeletes;

    public $incrementing = false;
    public $keyType = 'string';

    protected $fillable = [
        'land_use_type',
        'area_sqft',
        'location_description',
        'zoning_regulations',
        'soil_quality',
        'notes',
    ];

    public function compensationEvaluation()
    {
        return $this->morphOne(CompensationEvaluation::class, 'evaluatable');
    }
}
