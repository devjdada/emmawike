<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CompensationEvaluation extends Model
{
    use SoftDeletes;

    public $incrementing = false;
    public $keyType = 'string';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->{$model->getKeyName()} = (string) \Illuminate\Support\Str::uuid();
        });
    }

    protected $fillable = [
        'user_id',
        'evaluation_type',
        'evaluatable_id',
        'evaluatable_type',
        'status',
        'notes',
        'total_value',
    ];

    public function evaluatable()
    {
        return $this->morphTo();
    }
}
