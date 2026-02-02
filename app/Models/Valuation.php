<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str; // Import Str for UUID generation

class Valuation extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    public $incrementing = false; // Disable auto-incrementing for UUID
    protected $keyType = 'string'; // Set key type to string for UUID

    protected $fillable = [
        'compensation_id',
        'description',
        'evaluation_type',
        'crop_type',
        'area_acres',
        'yield_per_acre',
        'market_price_per_unit',
        'damage_percentage',
        'machine_type',
        'model',
        'manufacture_year',
        'current_value',
        'depreciation_rate',
        'land_use_type',
        'area_sqft',
        'location_description',
        'zoning_regulations',
        'soil_quality',
        'number_of_units',
        'construction_year',
        'condition',
        'renovation_cost',
        'rate',
        'value',
        'complete_level',
        'complete_amount',
    ];

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::creating(function ($model) {
            $model->id = (string) Str::uuid();
        });
    }

    /**
     * Get the compensation that owns the valuation.
     */
    public function compensation()
    {
        return $this->belongsTo(Compensation::class);
    }
}
