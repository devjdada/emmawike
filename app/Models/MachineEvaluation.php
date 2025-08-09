<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MachineEvaluation extends Model
{
    use SoftDeletes;

    public $incrementing = false;
    public $keyType = 'string';

    protected $fillable = [
        'machine_type',
        'make',
        'model',
        'year',
        'condition',
        'depreciation_rate',
        'notes',
    ];

    public function compensationEvaluation()
    {
        return $this->morphOne(CompensationEvaluation::class, 'evaluatable');
    }
}
