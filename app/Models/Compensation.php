<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str; // Import Str for UUID generation

class Compensation extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    public $incrementing = false; // Disable auto-incrementing for UUID
    protected $keyType = 'string'; // Set key type to string for UUID

    protected $table = 'compensations'; // Explicitly set table name

    protected $fillable = [
        'notes',
        'total_value',
        'status',
        'name',
        'phone',
        'email',
        'code',
    ];

    protected $casts = [
        'total_value' => 'decimal:2', // Cast to decimal with 2 precision
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
     * Get the valuations for the compensation.
     */
    public function valuations()
    {
        return $this->hasMany(Valuation::class);
    }
}
