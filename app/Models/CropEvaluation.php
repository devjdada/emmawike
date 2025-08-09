<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CropEvaluation extends Model
{
    use SoftDeletes;

    public $incrementing = false;
    public $keyType = 'string';

    protected $fillable = [
        'crop_type',
        'area_acres',
        'yield_per_acre',
        'market_price_per_unit',
        'damage_percentage',
        'notes',
    ];

    public function compensationEvaluation()
    {
        return $this->morphOne(CompensationEvaluation::class, 'evaluatable');
    }
}
