<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PropertyEvaluation extends Model
{
    use SoftDeletes;

    public $incrementing = false;
    public $keyType = 'string';

    protected $fillable = [
        'property_id',
        'building_type',
        'number_of_units',
        'construction_year',
        'condition',
        'renovation_cost',
        'notes',
    ];

    public function compensationEvaluation()
    {
        return $this->morphOne(CompensationEvaluation::class, 'evaluatable');
    }

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
